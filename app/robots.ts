import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const isPreview = process.env.VERCEL_URL?.includes('preview') ||
                   process.env.NEXT_PUBLIC_ENV === 'preview';

  if (isPreview) {
    // Block all indexing on preview subdomain
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  // Allow indexing on production
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api'],
    },
    sitemap: 'https://the-oneclinic.net/sitemap.xml',
  };
}
