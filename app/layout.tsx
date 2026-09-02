import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import localFont from 'next/font/local';
import MotionProvider from '@/components/providers/MotionProvider';
import Header from '@/components/layout/Header';
import V1Header from '@/components/v1/V1Header';
import Footer from '@/components/layout/Footer';
import LayoutShell from '@/components/layout/LayoutShell';
import StickyCallbackCTA from '@/components/ui/StickyCallbackCTA';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import BookConsultationModal from '@/components/ui/BookConsultationModal';
import CookieConsentBanner from '@/components/ui/CookieConsentBanner/CookieConsentBanner';
import '@/styles/globals.css';

const inter = localFont({
  src: [
    {
      path: '../public/fonts/InterVariable.woff2',
      style: 'normal',
    },
    {
      path: '../public/fonts/InterVariable-Italic.woff2',
      style: 'italic',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
  // Don't preload the fonts: with display:swap the metrics-matched fallback
  // paints text immediately, and freeing the high-priority request queue lets
  // the LCP hero image download first (fonts swap in once loaded, no CLS).
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://the-oneclinic.co.uk';
const isPreview = process.env.VERCEL_ENV === 'preview' || process.env.NEXT_PUBLIC_ENV === 'preview';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'The One Clinic | Premium Aesthetic & Wellness Leicester',
    template: '%s | The One Clinic',
  },
  description:
    'Clinician-led aesthetic and wellness treatments in Leicester. Anti-wrinkle injections, dermal fillers, laser resurfacing, hair restoration, body contouring, and IV therapy.',
  authors: [{ name: 'The One Clinic' }],
  verification: {
    google: 'm4CfiDMUpaLvCuTedkOsAQWn0RL7zUiNDLpCC-JnaHA',
  },
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png' }],
    apple: [{ url: '/icon.png', type: 'image/png' }],
    shortcut: '/icon.png',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'The One Clinic',
    title: 'The One Clinic | Premium Aesthetic & Wellness Leicester',
    description:
      'Expert-led aesthetic and wellness treatments tailored to you. Discover a new standard in cosmetic medicine.',
    url: '/',
    images: [
      {
        url: '/og-image.png',
        width: 512,
        height: 512,
        alt: 'The One Clinic logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'The One Clinic | Premium Aesthetic & Wellness Leicester',
    description:
      'Expert-led aesthetic and wellness treatments tailored to you. Discover a new standard in cosmetic medicine.',
    images: ['/og-image.png'],
  },
  robots: isPreview ? {
    index: false,
    follow: false,
    nocache: true,
  } : {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Speed up LeadPipeline form loading */}
        <link rel="preconnect" href="https://link.leadpipeline.ai" />
        <Script
          id="gtm-head"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MW23G8N7');`,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MW23G8N7"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <Script
          src="https://link.leadpipeline.ai/js/form_embed.js"
          strategy="afterInteractive"
        />

        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <MotionProvider>
          <div className="site-wrapper">
            <Header />
            {/* v1 routes swap the chrome: each header renders only on its own
                routes. Both sit outside LayoutShell, whose .content creates a
                stacking context that would trap them under the floating CTAs. */}
            <V1Header />
            <LayoutShell footer={<Footer />}>
              <main id="main-content" tabIndex={-1}>
                {children}
              </main>
            </LayoutShell>
            <StickyCallbackCTA />
            <WhatsAppButton />
            <BookConsultationModal />
          </div>

          <CookieConsentBanner />
        </MotionProvider>
      </body>
    </html>
  );
}
