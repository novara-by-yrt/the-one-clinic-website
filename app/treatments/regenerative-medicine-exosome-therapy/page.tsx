import type { Metadata } from 'next';
import ExosomeTherapyPage from './ExosomeTherapyPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/regenerative-medicine-exosome-therapy' },
  title: 'Exosome Therapy Leicester | Regenerative Medicine',
  description:
    'Exosome therapy in Leicester. Advanced regenerative medicine to stimulate skin repair, collagen production, and cellular renewal at The One Clinic.',
  openGraph: {
    title: 'Exosome Therapy Leicester',
    description:
      'Expert exosome therapy in Leicester. Cutting-edge regenerative medicine to restore skin health and stimulate natural repair at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Exosome Therapy Leicester',
    description:
      'Expert exosome therapy in Leicester. Cutting-edge regenerative medicine to restore skin health and stimulate natural repair at The One Clinic.',
  },
};

export default function Page() {
  return <ExosomeTherapyPage />;
}
