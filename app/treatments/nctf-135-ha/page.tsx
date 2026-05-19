import type { Metadata } from 'next';
import NCTF135Page from './NCTF135Page';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/nctf-135-ha' },
  title: 'NCTF 135 HA Skin Booster Leicester',
  description:
    'Expert injection of NCTF 135 HA in Leicester. Our team offer safe skin boosters to reduce dark circles and stimulate collagen production.',
  openGraph: {
    title: 'NCTF 135 HA Skin Booster Leicester',
    description:
      'Expert injection of NCTF 135 HA in Leicester. Our team offer safe skin boosters to reduce dark circles and stimulate collagen production.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NCTF 135 HA Skin Booster Leicester',
    description:
      'Expert injection of NCTF 135 HA in Leicester. Our team offer safe skin boosters to reduce dark circles and stimulate collagen production.',
  },
};

export default function Page() {
  return <NCTF135Page />;
}
