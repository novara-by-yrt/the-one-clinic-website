import type { Metadata } from 'next';
import LumeccaIPLPage from './LumeccaIPLPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/ipl-leicester' },
  title: 'Lumecca IPL Leicester | Intense Pulsed Light Treatment',
  description:
    'Lumecca IPL intense pulsed light treatment in Leicester. Reduce pigmentation, sun damage, redness, and signs of ageing with expert care at The One Clinic.',
  openGraph: {
    title: 'Lumecca IPL Leicester',
    description:
      'Expert Lumecca IPL treatment in Leicester. Reduce pigmentation, sun damage, and redness for clearer, more radiant skin at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lumecca IPL Leicester',
    description:
      'Expert Lumecca IPL treatment in Leicester. Reduce pigmentation, sun damage, and redness for clearer, more radiant skin at The One Clinic.',
  },
};

export default function Page() {
  return <LumeccaIPLPage />;
}
