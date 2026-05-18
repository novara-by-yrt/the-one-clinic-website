import type { Metadata } from 'next';
import MoleRemovalPage from './MoleRemovalPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/mole-removal-leicester' },
  title: 'Mole Removal Leicester | Expert Minor Surgery',
  description:
    'Mole removal in Leicester. Safe, precise removal of moles by our expert medical team at The One Clinic. No GP referral needed.',
  openGraph: {
    title: 'Mole Removal Leicester',
    description:
      'Expert mole removal in Leicester. Safe, precise mole excision by our experienced medical team at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mole Removal Leicester',
    description:
      'Expert mole removal in Leicester. Safe, precise mole excision by our experienced medical team at The One Clinic.',
  },
};

export default function Page() {
  return <MoleRemovalPage />;
}
