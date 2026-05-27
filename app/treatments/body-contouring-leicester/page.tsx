import type { Metadata } from 'next';
import BodyContouringPage from './BodyContouringPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/body-contouring-leicester' },
  title: 'Body Contouring Leicester | Non-Surgical Fat Reduction',
  description:
    'Body contouring in Leicester. Non-surgical fat reduction and body shaping treatments to sculpt and tone stubborn areas at The One Clinic.',
  openGraph: {
    title: 'Body Contouring Leicester',
    description:
      'Expert non-surgical body contouring in Leicester. Reduce stubborn fat and sculpt your shape without surgery at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Body Contouring Leicester',
    description:
      'Expert non-surgical body contouring in Leicester. Reduce stubborn fat and sculpt your shape without surgery at The One Clinic.',
  },
};

export default function Page() {
  return <BodyContouringPage />;
}
