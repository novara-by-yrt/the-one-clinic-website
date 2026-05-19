import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const isPreview = process.env.VERCEL_URL?.includes('preview') ||
                   process.env.NEXT_PUBLIC_ENV === 'preview';

  if (isPreview) {
    return {
      rules: { userAgent: '*', disallow: '/' },
    };
  }

  return {
    rules: [
      // Block training-only crawlers , they harvest data without powering
      // any search or answer product visible to potential patients.
      { userAgent: 'CCBot',         disallow: '/' },
      { userAgent: 'anthropic-ai',  disallow: '/' },

      // Explicitly allow AI search / answer-engine crawlers.
      // Listing them individually makes the policy auditable and survives
      // future changes to the wildcard default.
      { userAgent: 'GPTBot',         allow: '/' },   // OpenAI ChatGPT search
      { userAgent: 'OAI-SearchBot',  allow: '/' },   // OpenAI search index
      { userAgent: 'ClaudeBot',      allow: '/' },   // Anthropic Claude.ai
      { userAgent: 'PerplexityBot',  allow: '/' },   // Perplexity answer engine
      { userAgent: 'Google-Extended', allow: '/' },  // Google AI Overviews / Gemini

      // Default: allow all other crawlers; protect internal routes
      { userAgent: '*', allow: '/', disallow: ['/admin', '/api'] },
    ],
    sitemap: 'https://the-oneclinic.net/sitemap.xml',
  };
}
