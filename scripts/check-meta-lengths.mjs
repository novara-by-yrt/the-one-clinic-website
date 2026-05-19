/**
 * Build-time metadata length validator.
 * Run via: node scripts/check-meta-lengths.mjs
 * Warns when title > 60 chars or description > 160 chars in static page.tsx files.
 */

import { readdirSync, readFileSync } from 'fs';
import { join, relative } from 'path';

const ROOT = process.cwd();
const APP_DIR = join(ROOT, 'app');
const TITLE_LIMIT = 60;
const DESC_LIMIT = 160;

let warnings = 0;

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (/^page\.(tsx|ts|jsx|js)$/.test(entry.name)) {
      checkFile(full);
    }
  }
}

function checkFile(filePath) {
  const src = readFileSync(filePath, 'utf8');
  const rel = relative(ROOT, filePath);

  // Extract static title strings (not template literals or generateMetadata)
  const titleMatches = src.matchAll(/title:\s*['"]([^'"]{20,})['"],?/g);
  for (const m of titleMatches) {
    const raw = m[1];
    // Skip the template string '%s | ...' pattern
    if (raw.includes('%s')) continue;
    if (raw.length > TITLE_LIMIT) {
      console.warn(`⚠  TITLE TOO LONG (${raw.length} chars) in ${rel}`);
      console.warn(`   "${raw}"`);
      warnings++;
    }
  }

  // Extract static description strings
  const descMatches = src.matchAll(/description:\s*\n?\s*['"]([^'"]{20,})['"]/g);
  for (const m of descMatches) {
    const raw = m[1];
    if (raw.length > DESC_LIMIT) {
      console.warn(`⚠  DESC TOO LONG (${raw.length} chars) in ${rel}`);
      console.warn(`   "${raw.slice(0, 80)}..."`);
      warnings++;
    }
  }
}

walk(APP_DIR);

if (warnings === 0) {
  console.log('✓ All static metadata titles and descriptions are within length limits.');
} else {
  console.log(`\n${warnings} metadata length warning(s) found. Titles should be ≤${TITLE_LIMIT} chars, descriptions ≤${DESC_LIMIT} chars.`);
}
