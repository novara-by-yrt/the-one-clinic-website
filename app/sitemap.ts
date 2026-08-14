import type { MetadataRoute } from 'next';
import { readdirSync } from 'fs';
import { join } from 'path';
import { treatments } from '@/data/treatments';
import { TEAM_MEMBERS } from '@/data/team';
import { posts } from '@/lib/blogData';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://the-oneclinic.co.uk';

// Directories to exclude from the static page scan
const EXCLUDED_DIRS = new Set(['api']);

// Prefixes that indicate non-route directories in Next.js
const SKIP_PREFIXES = ['_', '.', '('];

/**
 * Walks the app/ directory and collects every route that has a page file.
 * Skips dynamic segments ([slug]) , those come from data sources below.
 */
function collectStaticRoutes(dir: string, routeSegment = ''): string[] {
  const routes: string[] = [];

  let hasPageFile = false;
  const subdirs: string[] = [];

  try {
    const entries = readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (SKIP_PREFIXES.some((p) => entry.name.startsWith(p))) continue;

      if (
        entry.isFile() &&
        /^page\.(tsx|ts|jsx|js)$/.test(entry.name)
      ) {
        hasPageFile = true;
      } else if (entry.isDirectory()) {
        subdirs.push(entry.name);
      }
    }
  } catch {
    return routes;
  }

  if (hasPageFile) {
    routes.push(routeSegment || '/');
  }

  for (const sub of subdirs) {
    if (EXCLUDED_DIRS.has(sub)) continue;
    if (sub.startsWith('[')) continue; // dynamic segments handled separately

    routes.push(
      ...collectStaticRoutes(join(dir, sub), `${routeSegment}/${sub}`)
    );
  }

  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const appDir = join(process.cwd(), 'app');

  // 1. All static file-system routes (auto-discovered)
  const staticRoutes = collectStaticRoutes(appDir);

  // 2. Dynamic treatment routes from data/treatments.ts
  const treatmentRoutes = treatments.map((t) => `/treatments/${t.slug}`);

  // 3. Dynamic team-member routes
  //    Use profileUrl if it's a local path, otherwise fall back to /our-team/[slug]
  const teamRoutes = TEAM_MEMBERS.filter((m) => !m.noProfilePage).map((m) => {
    if (m.profileUrl && m.profileUrl.startsWith('/')) return m.profileUrl;
    return `/our-team/${m.slug}`;
  });

  // 4. Dynamic blog post routes from lib/blogData.js
  const blogRoutes = (posts as Array<{ slug: string }>).map(
    (p) => `/blog/${p.slug}`
  );

  // Merge and deduplicate
  const allRoutes = [
    ...new Set([...staticRoutes, ...treatmentRoutes, ...teamRoutes, ...blogRoutes]),
  ];

  const now = new Date().toISOString();

  return allRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: changeFreqFor(route),
    priority: priorityFor(route),
  }));
}

function changeFreqFor(route: string): MetadataRoute.Sitemap[number]['changeFrequency'] {
  if (route === '/') return 'daily';
  if (route.startsWith('/blog')) return 'weekly';
  if (route.startsWith('/treatments')) return 'weekly';
  return 'monthly';
}

function priorityFor(route: string): number {
  if (route === '/') return 1.0;
  if (route === '/treatments') return 0.9;
  if (route === '/contact') return 0.9;
  if (route.startsWith('/treatments/')) return 0.8;
  if (route.startsWith('/conditions/')) return 0.7;
  if (route.startsWith('/blog/')) return 0.7;
  if (route.startsWith('/our-team/') || route.startsWith('/team/')) return 0.7;
  return 0.6;
}
