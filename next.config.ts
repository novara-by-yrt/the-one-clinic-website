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
      {
        source: '/treatments/lumecca-ipl-leicester',
        destination: '/treatments/ipl-leicester',
        permanent: true,
      },
      {
        source: '/treatments/lumecca-ipl',
        destination: '/treatments/ipl-leicester',
        permanent: true,
      },
      {
        source: '/treatments/dermal-fillers',
        destination: '/treatments/dermal-filler-leicester',
        permanent: true,
      },
      {
        source: '/treatments/pigmentation-treatment-leicester',
        destination: '/treatments/hyperpigmentation-clinic-leicester',
        permanent: true,
      },
      {
        source: '/treatments/acne-scar-removal-leicester',
        destination: '/treatments/laser-acne-scar-treatment-leicester',
        permanent: true,
      },
      {
        source: '/treatments/skin-tags-removal-leicester',
        destination: '/treatments/skin-tag-removal-leicester',
        permanent: true,
      },
      {
        source: '/treatments/endolift',
        destination: '/treatments/endolift-laser-leicester',
        permanent: true,
      },
      {
        source: '/treatments/vampire-facial',
        destination: '/treatments/vampire-facial-leicester',
        permanent: true,
      },
      {
        source: '/treatments/minor-surgery',
        destination: '/treatments/minor-surgery-leicester',
        permanent: true,
      },
      {
        source: '/treatments/laser-resurfacing',
        destination: '/treatments/deep-laser-resurfacing-leicester',
        permanent: true,
      },
      {
        source: '/treatments/lipoma-removal',
        destination: '/treatments/lipoma-removal-leicester',
        permanent: true,
      },
      {
        source: '/treatments/skin-lesion',
        destination: '/treatments/skin-lesions-leicester',
        permanent: true,
      },
      {
        source: '/treatments/basal-cell-carcinoma-bcc-removal-leicester',
        destination: '/treatments/basal-cell-carcinoma-leicester',
        permanent: true,
      },
      {
        source: '/treatments/haemorrhoid-removal',
        destination: '/treatments/haemorrhoid-treatment-leicester',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
