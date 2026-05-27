import type { Metadata } from 'next';
import Morpheus8Page from './Morpheus8Page';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/morpheus8-leicester' },
  title: 'Morpheus8 Leicester | RF Microneedling Skin Tightening',
  description:
    'Morpheus8 radiofrequency microneedling in Leicester. Tighten skin, reduce wrinkles, and remodel facial contours with expert care at The One Clinic.',
  openGraph: {
    title: 'Morpheus8 Leicester',
    description:
      'Advanced Morpheus8 RF microneedling in Leicester. Expert skin tightening and rejuvenation at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Morpheus8 Leicester',
    description:
      'Advanced Morpheus8 RF microneedling in Leicester. Expert skin tightening and rejuvenation at The One Clinic.',
  },
};

export default function Page() {
  return <Morpheus8Page />;
}
