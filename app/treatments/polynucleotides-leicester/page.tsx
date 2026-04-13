import type { Metadata } from 'next';
import PolynucleotidesPage from './PolynucleotidesPage';

export const metadata: Metadata = {
  title: 'Polynucleotides Leicester | Regenerative Skin Treatment | The One Clinic',
  description:
    'Polynucleotide treatment in Leicester. Advanced regenerative medicine to restore skin quality, stimulate collagen, and reduce fine lines at The One Clinic.',
  keywords: [
    'polynucleotides Leicester',
    'PDRN treatment Leicester',
    'polynucleotide injections Leicester',
    'regenerative skin treatment Leicester',
    'skin booster Leicester',
    'collagen stimulation Leicester',
  ],
  openGraph: {
    title: 'Polynucleotides Leicester | The One Clinic',
    description:
      'Expert polynucleotide treatment in Leicester. Regenerative medicine to restore skin health and stimulate natural repair at The One Clinic.',
  },
};

export default function Page() {
  return <PolynucleotidesPage />;
}
