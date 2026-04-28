import type { Metadata } from 'next';
import NCTF135Page from './NCTF135Page';

export const metadata: Metadata = {
  title: 'NCTF 135 HA Skin Booster Leicester | The One Clinic',
  description:
    'Expert injection of NCTF 135 HA in Leicester. Our team offer safe skin boosters to reduce dark circles and stimulate collagen production.',
  keywords: [
    'NCTF 135 HA Leicester',
    'NCTF 135 HA skin booster',
    'skin booster Leicester',
    'collagen stimulation Leicester',
    'dark circles treatment Leicester',
    'skin rejuvenation Leicester',
    'injectable skin hydration Leicester',
  ],
  openGraph: {
    title: 'NCTF 135 HA Skin Booster Leicester | The One Clinic',
    description:
      'Expert injection of NCTF 135 HA in Leicester. Our team offer safe skin boosters to reduce dark circles and stimulate collagen production.',
  },
};

export default function Page() {
  return <NCTF135Page />;
}
