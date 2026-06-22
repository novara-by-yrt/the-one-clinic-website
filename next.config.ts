import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Remove the X-Powered-By header for security
  poweredByHeader: false,

  // Strict mode catches potential React issues early
  reactStrictMode: true,

  // Image delivery optimization — serves AVIF/WebP (smaller at identical
  // visual quality) and caches optimized variants for a year so repeat
  // visitors never re-download. No change to source files or visible quality.
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31_536_000, // 1 year
  },

  // Tree-shake heavy, site-wide animation/carousel libraries so each route
  // only ships the exports it actually uses.
  experimental: {
    optimizePackageImports: ['framer-motion', 'swiper'],
  },

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
      {
        // Static, content-hashed-by-name assets (raw images used by CSS
        // backgrounds, local fonts) are immutable — cache hard so repeat
        // views and cross-page navigation never re-fetch them.
        source: '/:path(images|fonts)/:file*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
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
        source: '/treatments/endolift-laser',
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
      {
        source: '/treatments/body-contouring',
        destination: '/treatments/body-contouring-leicester',
        permanent: true,
      },
      {
        source: '/treatments/chemical-peels',
        destination: '/treatments/chemical-peels-leicester',
        permanent: true,
      },
      {
        source: '/treatments/cool-bleph',
        destination: '/treatments/cool-bleph-leicester',
        permanent: true,
      },
      {
        source: '/treatments/cool-glow-full-face',
        destination: '/treatments/cool-glow-full-face-leicester',
        permanent: true,
      },
      {
        source: '/treatments/cool-scar-lift',
        destination: '/treatments/cool-scar-lift-leicester',
        permanent: true,
      },
      {
        source: '/treatments/dermatologist',
        destination: '/treatments/dermatologist-leicester',
        permanent: true,
      },
      {
        source: '/treatments/gp-home-visits',
        destination: '/treatments/gp-home-visits-leicester',
        permanent: true,
      },
      {
        source: '/treatments/health-screening',
        destination: '/treatments/health-screening-leicester',
        permanent: true,
      },
      {
        source: '/treatments/hydrafacial',
        destination: '/treatments/hydrafacial-leicester',
        permanent: true,
      },
      {
        source: '/treatments/hydrafacial-keravive',
        destination: '/treatments/hydrafacial-keravive-leicester',
        permanent: true,
      },
      {
        source: '/treatments/iv-drip-therapy',
        destination: '/treatments/iv-drip-therapy-leicester',
        permanent: true,
      },
      {
        source: '/treatments/joint-injections',
        destination: '/treatments/joint-injections-leicester',
        permanent: true,
      },
      {
        source: '/treatments/laser-mole-removal',
        destination: '/treatments/laser-mole-removal-leicester',
        permanent: true,
      },
      {
        source: '/treatments/laser-snoring-treatment',
        destination: '/treatments/laser-snoring-treatment-leicester',
        permanent: true,
      },
      {
        source: '/treatments/laser-vaginal',
        destination: '/treatments/laser-vaginal-leicester',
        permanent: true,
      },
      {
        source: '/treatments/medical-insurance',
        destination: '/treatments/medical-insurance-leicester',
        permanent: true,
      },
      {
        source: '/treatments/menopause-hrt',
        destination: '/treatments/menopause-hrt-leicester',
        permanent: true,
      },
      {
        source: '/treatments/mens-health',
        destination: '/treatments/mens-health-leicester',
        permanent: true,
      },
      {
        source: '/treatments/mental-health-consultation',
        destination: '/treatments/mental-health-consultation-leicester',
        permanent: true,
      },
      {
        source: '/treatments/morpheus8',
        destination: '/treatments/morpheus8-leicester',
        permanent: true,
      },
      {
        source: '/treatments/nctf-135-ha',
        destination: '/treatments/nctf-135-ha-leicester',
        permanent: true,
      },
      {
        source: '/treatments/private-gp',
        destination: '/treatments/private-gp-leicester',
        permanent: true,
      },
      {
        source: '/treatments/profhilo',
        destination: '/treatments/profhilo-leicester',
        permanent: true,
      },
      {
        source: '/treatments/regenerative-medicine-exosome-therapy',
        destination: '/treatments/regenerative-medicine-exosome-therapy-leicester',
        permanent: true,
      },
      {
        source: '/treatments/skin-analysis',
        destination: '/treatments/skin-analysis-leicester',
        permanent: true,
      },
      {
        source: '/treatments/skincare-alumier-md',
        destination: '/treatments/skincare-alumier-md-leicester',
        permanent: true,
      },
      {
        source: '/treatments/skincare-cellderma',
        destination: '/treatments/skincare-cellderma-leicester',
        permanent: true,
      },
      {
        source: '/treatments/travel-vaccine',
        destination: '/treatments/travel-vaccine-leicester',
        permanent: true,
      },
      {
        source: '/treatments/weight-management',
        destination: '/treatments/weight-management-leicester',
        permanent: true,
      },
      {
        source: '/treatments/womens-health',
        destination: '/treatments/womens-health-leicester',
        permanent: true,
      },
      {
        source: '/treatments/wrinkle-relaxing-injections',
        destination: '/treatments/wrinkle-relaxing-injections-leicester',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
