import type { Metadata } from 'next';
import AlumierMDPage from './AlumierMDPage';

export const metadata: Metadata = {
  title: 'AlumierMD Skincare Leicester | Medical-Grade Skincare | The One Clinic',
  description:
    'AlumierMD medical-grade skincare in Leicester. Personalised skincare prescriptions and professional treatments to transform your skin at The One Clinic.',
  keywords: [
    'AlumierMD Leicester',
    'AlumierMD skincare Leicester',
    'medical grade skincare Leicester',
    'prescription skincare Leicester',
    'professional skincare Leicester',
    'skin health Leicester',
  ],
  openGraph: {
    title: 'AlumierMD Skincare Leicester | The One Clinic',
    description:
      'Expert AlumierMD medical-grade skincare in Leicester. Personalised prescriptions and professional treatments for visibly healthier skin at The One Clinic.',
  },
};

export default function Page() {
  return <AlumierMDPage />;
}
