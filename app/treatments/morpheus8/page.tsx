import type { Metadata } from 'next';
import Morpheus8Page from './Morpheus8Page';

export const metadata: Metadata = {
  title: 'Morpheus8 Leicester | RF Microneedling Skin Tightening | The One Clinic',
  description:
    'Morpheus8 radiofrequency microneedling in Leicester. Tighten skin, reduce wrinkles, and remodel facial contours with expert care at The One Clinic.',
  keywords: [
    'Morpheus8 Leicester',
    'RF microneedling Leicester',
    'radiofrequency microneedling Leicester',
    'skin tightening Leicester',
    'facial contouring Leicester',
    'collagen induction therapy Leicester',
  ],
  openGraph: {
    title: 'Morpheus8 Leicester | The One Clinic',
    description:
      'Advanced Morpheus8 RF microneedling in Leicester. Expert skin tightening and rejuvenation at The One Clinic.',
  },
};

export default function Page() {
  return <Morpheus8Page />;
}
