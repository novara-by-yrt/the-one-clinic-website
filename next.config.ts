import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Remove the X-Powered-By header for security
  poweredByHeader: false,

  // Strict mode catches potential React issues early
  reactStrictMode: true,

  // Security and performance headers applied to all routes
  async headers() {
    const isPreview = process.env.VERCEL_ENV === 'preview' || process.env.NEXT_PUBLIC_ENV === 'preview';

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // Block indexing on preview subdomains
          ...(isPreview ? [
            {
              key: 'X-Robots-Tag',
              value: 'noindex, nofollow, nocache',
            },
          ] : []),
        ],
      },
    ];
  },

  // 301 redirects for moved or renamed pages
  async redirects() {
    return [
      {
        source: '/treatments/blepharoplasty',
        destination: '/treatments/non-surgical-blepharoplasty-leicester',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
