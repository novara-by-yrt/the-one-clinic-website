import type { Metadata } from 'next';
import LumeccaIPLPage from './LumeccaIPLPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/lumecca-ipl' },
  title: 'Lumecca IPL Treatment Leicester | Skin Rejuvenation',
  description:
    'Lumecca IPL intense pulsed light treatment in Leicester. Reduce pigmentation, sun damage, redness, and signs of ageing with expert care at The One Clinic.',
  openGraph: {
    title: 'Lumecca IPL Leicester',
    description:
      'Advanced Lumecca IPL skin rejuvenation in Leicester. Expert treatment for pigmentation, redness, and sun damage at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lumecca IPL Leicester',
    description:
      'Advanced Lumecca IPL skin rejuvenation in Leicester. Expert treatment for pigmentation, redness, and sun damage at The One Clinic.',
  },
};

export default function Page() {
  return <LumeccaIPLPage />;
}
