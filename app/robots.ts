import type { MetadataRoute } from 'next';

// Only preview/staging deployments must be hidden from crawlers. We gate on
// the build-time environment (the same signal next.config.ts uses for the
// X-Robots-Tag header) rather than the per-request Host header.
//
// Host-gating was fragile: any request whose Host wasn't an exact match —
// a proxied/rewritten Host, an internal deployment alias, a revalidation
// fetch — caused production to serve "Disallow: /", which de-indexed pages
// ("Indexed, though blocked by robots.txt"). Environment gating is
// deterministic, so production can never accidentally block crawling.
const isPreview =
  process.env.VERCEL_ENV === 'preview' ||
  process.env.NEXT_PUBLIC_ENV === 'preview';

export default function robots(): MetadataRoute.Robots {
  if (isPreview) {
    return {
      rules: { userAgent: '*', disallow: '/' },
    };
  }

  return {
    rules: [
      // Block training-only crawlers — they harvest data without powering
      // any search or answer product visible to potential patients.
      { userAgent: 'CCBot',          disallow: '/' },
      { userAgent: 'anthropic-ai',   disallow: '/' },

      // Explicitly allow AI search / answer-engine crawlers.
      { userAgent: 'GPTBot',          allow: '/' },
      { userAgent: 'OAI-SearchBot',   allow: '/' },
      { userAgent: 'ClaudeBot',       allow: '/' },
      { userAgent: 'PerplexityBot',   allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },

      // Default: allow all other crawlers; protect internal routes
      { userAgent: '*', allow: '/', disallow: ['/admin', '/api'] },
    ],
    sitemap: 'https://www.the-oneclinic.co.uk/sitemap.xml',
  };
}
