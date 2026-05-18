#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

// Match both quoted and JSX template strings: href="..." and href={`...`}
const INTERNAL_LINK_REGEX = [
  /href=["']([^"']+)["']/g, // Quoted: href="..."
  /href=\{`([^`]+)`\}/g,    // Template: href={`...`}
];
const EXTERNAL_DOMAIN_REGEX = /^(https?:\/\/|mailto:|tel:)/;

const PAGE_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];

// Normalize routes to pages
function normalizeRoute(href) {
  // Remove query strings and hash
  let normalized = href.split('?')[0].split('#')[0];

  // Handle external links
  if (EXTERNAL_DOMAIN_REGEX.test(normalized)) {
    return null;
  }

  // Skip anchor-only links
  if (normalized.startsWith('#')) {
    return null;
  }

  // Normalize trailing slashes for comparison
  normalized = normalized.replace(/\/$/, '') || '/';

  return normalized;
}

// Get all page files
function getAllPageFiles(dir) {
  const files = [];

  function walk(current) {
    const items = fs.readdirSync(current);

    for (const item of items) {
      if (item.startsWith('.') || item === 'node_modules') continue;

      const fullPath = path.join(current, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (PAGE_EXTENSIONS.includes(path.extname(item))) {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files;
}

// Convert file path to route (only for actual pages, not components)
function filePathToRoute(filePath) {
  // Only process app/ directory files
  if (!filePath.includes('/app/')) {
    return null;
  }

  // Make relative to project root
  let relativePath = path.relative(projectRoot, filePath);

  // Remove app/ prefix only
  relativePath = relativePath.replace(/^app\//, '');

  // Remove file extension
  relativePath = relativePath.replace(/\.(tsx|ts|jsx|js)$/, '');

  // Only count page.tsx files (actual routable pages)
  if (!relativePath.endsWith('/page')) {
    return null;
  }

  // Remove /page suffix
  relativePath = relativePath.replace(/\/page$/, '');

  // Convert to route
  const route = '/' + relativePath.replace(/\\/g, '/') || '/';

  return route;
}

// Extract all links from file
function extractLinks(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const links = [];

    for (const regex of INTERNAL_LINK_REGEX) {
      let match;
      while ((match = regex.exec(content)) !== null) {
        let href = match[1];

        // Handle template strings with variables (e.g., `/treatments/${t.slug}`)
        // For now, skip these as we can't resolve them statically
        if (href.includes('${') || href.includes('{')) {
          continue;
        }

        const normalized = normalizeRoute(href);
        if (normalized) {
          links.push(normalized);
        }
      }
    }

    return links;
  } catch (err) {
    console.error(`Error reading ${filePath}: ${err.message}`);
    return [];
  }
}

// Main audit function
async function auditLinks() {
  console.log('📊 Starting internal link audit...\n');

  const inboundLinks = {};
  const pageIndex = {};
  const fileToRoute = {};

  // Step 1: Get all pages from app directory
  const appDir = path.join(projectRoot, 'app');
  const allFiles = getAllPageFiles(appDir);

  console.log(`📄 Found ${allFiles.length} files to scan\n`);

  // Initialize inbound link tracking for all routable pages
  for (const file of allFiles) {
    const route = filePathToRoute(file);
    if (route) {
      fileToRoute[file] = route;
      if (!inboundLinks[route]) {
        inboundLinks[route] = {
          route,
          inboundCount: 0,
          inboundFrom: [],
        };
      }
    }
  }

  // Step 2: Extract links and count inbound
  for (const file of allFiles) {
    const fromRoute = filePathToRoute(file);
    if (!fromRoute) continue;

    const links = extractLinks(file);

    for (const toRoute of links) {
      // Only count links to actual pages
      if (inboundLinks[toRoute]) {
        inboundLinks[toRoute].inboundCount++;
        inboundLinks[toRoute].inboundFrom.push(fromRoute);
      }
    }
  }

  // Step 3: Deduplicate inbound sources and categorize
  const report = {
    generatedAt: new Date().toISOString(),
    totalPages: Object.keys(inboundLinks).length,
    pages: Object.values(inboundLinks)
      .map(page => ({
        route: page.route,
        inboundCount: page.inboundCount,
        inboundFrom: [...new Set(page.inboundFrom)],
        category: categorizeRoute(page.route),
        strength: page.inboundCount < 3 ? 'thin' : 'adequate',
      }))
      .sort((a, b) => a.inboundCount - b.inboundCount),
  };

  // Step 4: Identify thin pages
  const thinPages = report.pages.filter(p => p.strength === 'thin');

  console.log(`\n📈 Audit Results:`);
  console.log(`   Total pages: ${report.totalPages}`);
  console.log(`   Thin pages (<3 inbound links): ${thinPages.length}`);
  console.log(`\n   Top orphaned pages (0 inbound links):`);

  report.pages
    .filter(p => p.inboundCount === 0)
    .slice(0, 20)
    .forEach(p => {
      console.log(`   - ${p.route} [${p.category}]`);
    });

  // Step 5: Write JSON report
  const reportPath = path.join(projectRoot, 'pages-with-inbound-links.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log(`\n✅ Report saved to: ${reportPath}`);

  return report;
}

function categorizeRoute(route) {
  if (route === '/') return 'home';
  if (route.startsWith('/treatments')) return 'treatment';
  if (route.startsWith('/blog')) return 'blog';
  if (route.startsWith('/conditions')) return 'condition';
  if (route.startsWith('/team') || route.startsWith('/our-team')) return 'team';
  if (route.startsWith('/what-we-do')) return 'what-we-do';
  if (route.startsWith('/our-facilities')) return 'facilities';
  if (route.startsWith('/patient-experience')) return 'experience';
  if (route.startsWith('/results')) return 'results';
  if (route.startsWith('/contact')) return 'contact';
  if (route.startsWith('/privacy')) return 'privacy';
  if (route.startsWith('/terms')) return 'terms';
  return 'other';
}

// Run audit
try {
  await auditLinks();
} catch (err) {
  console.error('❌ Audit failed:', err.message);
  process.exit(1);
}
