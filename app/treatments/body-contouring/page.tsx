import type { Metadata } from 'next';
import BodyContouringPage from './BodyContouringPage';

export const metadata: Metadata = {
  title: 'Body Contouring Leicester | Non-Surgical Fat Reduction | The One Clinic',
  description:
    'Body contouring in Leicester. Non-surgical fat reduction and body shaping treatments to sculpt and tone stubborn areas at The One Clinic.',
  keywords: [
    'body contouring Leicester',
    'non-surgical body contouring Leicester',
    'fat reduction Leicester',
    'body sculpting Leicester',
    'non-invasive body contouring Leicester',
    'body shaping Leicester',
  ],
  openGraph: {
    title: 'Body Contouring Leicester | The One Clinic',
    description:
      'Expert non-surgical body contouring in Leicester. Reduce stubborn fat and sculpt your shape without surgery at The One Clinic.',
  },
};

export default function Page() {
  return <BodyContouringPage />;
}
