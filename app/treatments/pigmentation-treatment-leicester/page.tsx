import type { Metadata } from 'next';
import PigmentationTreatmentPage from './PigmentationTreatmentPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/pigmentation-treatment-leicester' },
  title: 'Pigmentation Treatment Leicester | Skin Discolouration',
  description:
    'Pigmentation treatment in Leicester. Advanced laser and light-based treatments to reduce dark spots, sun damage, and uneven skin tone at The One Clinic.',
  openGraph: {
    title: 'Pigmentation Treatment Leicester',
    description:
      'Expert pigmentation treatment in Leicester. Reduce dark spots, sun damage, and uneven skin tone with advanced laser and light therapy at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pigmentation Treatment Leicester',
    description:
      'Expert pigmentation treatment in Leicester. Reduce dark spots, sun damage, and uneven skin tone with advanced laser and light therapy at The One Clinic.',
  },
};

export default function Page() {
  return <PigmentationTreatmentPage />;
}
