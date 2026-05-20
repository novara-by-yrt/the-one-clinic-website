import type { Metadata } from 'next';
import CellDermaPage from './CellDermaPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/skincare-cellderma' },
  title: 'CellDerma Skincare Leicester | Medical-Grade Skincare',
  description:
    'CellDerma medical-grade skincare in Leicester. Personalised skincare prescriptions and professional treatments to transform your skin at The One Clinic.',
  openGraph: {
    title: 'CellDerma Skincare Leicester',
    description:
      'Expert CellDerma medical-grade skincare in Leicester. Personalised prescriptions and professional treatments for visibly healthier skin at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CellDerma Skincare Leicester',
    description:
      'Expert CellDerma medical-grade skincare in Leicester. Personalised prescriptions and professional treatments for visibly healthier skin at The One Clinic.',
  },
};

export default function Page() {
  return <CellDermaPage />;
}
