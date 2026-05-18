import type { Metadata } from 'next';
import EndoliftPage from './EndoliftPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/endolift' },
  title: 'Endolift Laser Leicester | Skin Lifting & Contouring',
  description: 'Endolift laser treatment in Leicester. Minimally invasive skin tightening and contouring for face, neck, jawline, and body. GMC-registered doctors at The One…',
  openGraph: {
    title: 'Endolift Laser Leicester',
    description:
      'Reveal firmer, smoother, contoured skin in just one Endolift session with minimal downtime at The One Clinic, Leicester.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Endolift Laser Leicester',
    description:
      'Reveal firmer, smoother, contoured skin in just one Endolift session with minimal downtime at The One Clinic, Leicester.',
  },
};

export default function Page() {
  return <EndoliftPage />;
}
