import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LayoutShell from '@/components/layout/LayoutShell';
import StickyCallbackCTA from '@/components/ui/StickyCallbackCTA';
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

// ── Global metadata ──────────────────────────────────────────────
const isPreview = process.env.VERCEL_ENV === 'preview' || process.env.NEXT_PUBLIC_ENV === 'preview';

export const metadata: Metadata = {
  metadataBase: new URL('https://the-oneclinic.net'),
  title: {
    default: 'The One Clinic, Premium Aesthetic & Wellness',
    template: '%s | The One Clinic',
  },
  description:
    'Clinician-led aesthetic and wellness treatments in a premium clinical environment. Anti-wrinkle, dermal fillers, laser resurfacing, hair restoration, body contouring, and IV therapy.',
  keywords: [
    'aesthetic clinic',
    'anti-wrinkle injections',
    'dermal fillers',
    'laser resurfacing',
    'hair restoration',
    'body contouring',
    'IV wellness',
    'cosmetic clinic',
  ],
  authors: [{ name: 'The One Clinic' }],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'The One Clinic',
    title: 'The One Clinic, Premium Aesthetic & Wellness',
    description:
      'Expert-led aesthetic and wellness treatments tailored to you. Discover a new standard in cosmetic medicine.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The One Clinic, Premium Aesthetic & Wellness',
    description:
      'Expert-led aesthetic and wellness treatments tailored to you.',
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
        <link rel="canonical" href="https://the-oneclinic.net" />
      </head>
      <body>
        {/* Skip-to-content for keyboard users */}
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
        </div>
      </body>
    </html>
  );
}
