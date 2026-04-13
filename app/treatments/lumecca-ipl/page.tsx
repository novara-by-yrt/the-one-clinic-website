import type { Metadata } from 'next';
import LumeccaIPLPage from './LumeccaIPLPage';

export const metadata: Metadata = {
  title: 'Lumecca IPL Treatment Leicester | Skin Rejuvenation | The One Clinic',
  description:
    'Lumecca IPL intense pulsed light treatment in Leicester. Reduce pigmentation, sun damage, redness, and signs of ageing with expert care at The One Clinic.',
  keywords: [
    'Lumecca IPL Leicester',
    'intense pulsed light Leicester',
    'IPL skin treatment Leicester',
    'pigmentation treatment Leicester',
    'sun damage treatment Leicester',
    'skin rejuvenation Leicester',
  ],
  openGraph: {
    title: 'Lumecca IPL Leicester | The One Clinic',
    description:
      'Advanced Lumecca IPL skin rejuvenation in Leicester. Expert treatment for pigmentation, redness, and sun damage at The One Clinic.',
  },
};

export default function Page() {
  return <LumeccaIPLPage />;
}
