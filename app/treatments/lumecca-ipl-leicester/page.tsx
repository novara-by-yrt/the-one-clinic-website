import type { Metadata } from 'next';
import LumeccaIPLPage from './LumeccaIPLPage';

export const metadata: Metadata = {
  title: 'Lumecca IPL Leicester | Intense Pulsed Light Treatment | The One Clinic',
  description:
    'Lumecca IPL in Leicester. Advanced intense pulsed light treatment for pigmentation, sun damage, redness, and skin rejuvenation at The One Clinic.',
  keywords: [
    'Lumecca IPL Leicester',
    'IPL treatment Leicester',
    'intense pulsed light Leicester',
    'pigmentation treatment Leicester',
    'sun damage treatment Leicester',
    'skin rejuvenation Leicester',
  ],
  openGraph: {
    title: 'Lumecca IPL Leicester | The One Clinic',
    description:
      'Expert Lumecca IPL treatment in Leicester. Reduce pigmentation, sun damage, and redness for clearer, more radiant skin at The One Clinic.',
  },
};

export default function Page() {
  return <LumeccaIPLPage />;
}
