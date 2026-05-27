import type { Metadata } from 'next';
import AlumierMDPage from './AlumierMDPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/skincare-alumier-md-leicester' },
  title: 'AlumierMD Skincare Leicester | Medical-Grade Skincare',
  description:
    'AlumierMD medical-grade skincare in Leicester. Personalised skincare prescriptions and professional treatments to transform your skin at The One Clinic.',
  openGraph: {
    title: 'AlumierMD Skincare Leicester',
    description:
      'Expert AlumierMD medical-grade skincare in Leicester. Personalised prescriptions and professional treatments for visibly healthier skin at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlumierMD Skincare Leicester',
    description:
      'Expert AlumierMD medical-grade skincare in Leicester. Personalised prescriptions and professional treatments for visibly healthier skin at The One Clinic.',
  },
};

export default function Page() {
  return <AlumierMDPage />;
}
