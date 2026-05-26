import { headers } from 'next/headers';
import type { MetadataRoute } from 'next';

const PRODUCTION_HOSTS = new Set([
  'www.the-oneclinic.co.uk',
  'the-oneclinic.co.uk',
]);

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get('host') ?? '';

  if (!PRODUCTION_HOSTS.has(host)) {
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
