import type { Metadata } from 'next';
import EndoliftPage from './EndoliftPage';

export const metadata: Metadata = {
  title: 'Endolift Laser Leicester | Skin Lifting & Contouring | The One Clinic',
  description:
    'Endolift laser treatment in Leicester. Minimally invasive skin tightening and contouring for face, neck, jawline, and body. GMC-registered doctors at The One Clinic.',
  keywords: [
    'Endolift Leicester',
    'Endolift laser treatment',
    'skin tightening Leicester',
    'non-surgical facelift Leicester',
    'laser skin contouring Leicester',
    'minimally invasive skin lifting',
    'Endolift face neck jawline',
  ],
  openGraph: {
    title: 'Endolift Laser Leicester | The One Clinic',
    description:
      'Reveal firmer, smoother, contoured skin in just one Endolift session with minimal downtime at The One Clinic, Leicester.',
  },
};

export default function Page() {
  return <EndoliftPage />;
}
