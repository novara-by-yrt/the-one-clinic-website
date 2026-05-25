import type { Metadata } from 'next';
import Script from 'next/script';
import localFont from 'next/font/local';
import Header from '@/components/layout/Header';
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
  fallback: ['system-ui', 'sans-serif'],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://the-oneclinic.net';
const isPreview = process.env.VERCEL_ENV === 'preview' || process.env.NEXT_PUBLIC_ENV === 'preview';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  title: {
    default: 'The One Clinic | Premium Aesthetic & Wellness Leicester',
    template: '%s | The One Clinic',
  },
  description:
    'Clinician-led aesthetic and wellness treatments in Leicester. Anti-wrinkle injections, dermal fillers, laser resurfacing, hair restoration, body contouring, and IV therapy.',
  authors: [{ name: 'The One Clinic' }],
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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The One Clinic | Premium Aesthetic & Wellness Leicester',
    description:
      'Expert-led aesthetic and wellness treatments tailored to you. Discover a new standard in cosmetic medicine.',
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
        <Script
          id="gtm-head"
          strategy="afterInteractive"
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

        <div className="site-wrapper">
          <Header />
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
      </body>
    </html>
  );
}
