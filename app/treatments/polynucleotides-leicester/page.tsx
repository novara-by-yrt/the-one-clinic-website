import type { Metadata } from 'next';
import PolynucleotidesPage from './PolynucleotidesPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/polynucleotides-leicester' },
  title: 'Polynucleotides Leicester | Regenerative Skin Treatment',
  description:
    'Polynucleotide treatment in Leicester. Advanced regenerative medicine to restore skin quality, stimulate collagen, and reduce fine lines at The One Clinic.',
  openGraph: {
    title: 'Polynucleotides Leicester',
    description:
      'Expert polynucleotide treatment in Leicester. Regenerative medicine to restore skin health and stimulate natural repair at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Polynucleotides Leicester',
    description:
      'Expert polynucleotide treatment in Leicester. Regenerative medicine to restore skin health and stimulate natural repair at The One Clinic.',
  },
};

export default function Page() {
  return <PolynucleotidesPage />;
}
