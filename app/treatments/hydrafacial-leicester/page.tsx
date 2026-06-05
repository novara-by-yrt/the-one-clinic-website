import type { Metadata } from 'next';
import HydrafacialPage from './HydrafacialPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/hydrafacial-leicester' },
  title: 'Best HydraFacial in Leicester | The One Clinic',
  description:
    'Discover expert HydraFacial treatments in Leicester. Rejuvenate your skin with our bespoke, deep-cleansing facial packages.',
  openGraph: {
    title: 'Best HydraFacial in Leicester | The One Clinic',
    description:
      'Discover expert HydraFacial treatments in Leicester. Rejuvenate your skin with our bespoke, deep-cleansing facial packages.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best HydraFacial in Leicester | The One Clinic',
    description:
      'Discover expert HydraFacial treatments in Leicester. Rejuvenate your skin with our bespoke, deep-cleansing facial packages.',
  },
};

export default function Page() {
  return <HydrafacialPage />;
}
