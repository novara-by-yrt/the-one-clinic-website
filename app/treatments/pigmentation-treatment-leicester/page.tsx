import type { Metadata } from 'next';
import PigmentationTreatmentPage from './PigmentationTreatmentPage';

export const metadata: Metadata = {
  title: 'Pigmentation Treatment Leicester | Skin Discolouration | The One Clinic',
  description:
    'Pigmentation treatment in Leicester. Advanced laser and light-based treatments to reduce dark spots, sun damage, and uneven skin tone at The One Clinic.',
  keywords: [
    'pigmentation treatment Leicester',
    'dark spots treatment Leicester',
    'sun damage treatment Leicester',
    'hyperpigmentation Leicester',
    'skin discolouration Leicester',
    'laser pigmentation removal Leicester',
  ],
  openGraph: {
    title: 'Pigmentation Treatment Leicester | The One Clinic',
    description:
      'Expert pigmentation treatment in Leicester. Reduce dark spots, sun damage, and uneven skin tone with advanced laser and light therapy at The One Clinic.',
  },
};

export default function Page() {
  return <PigmentationTreatmentPage />;
}
