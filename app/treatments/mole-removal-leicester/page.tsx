import type { Metadata } from 'next';
import MoleRemovalPage from './MoleRemovalPage';

export const metadata: Metadata = {
  title: 'Mole Removal Leicester | Expert Minor Surgery | The One Clinic',
  description:
    'Mole removal in Leicester. Safe, precise removal of moles by our expert medical team at The One Clinic. No GP referral needed.',
  keywords: [
    'mole removal Leicester',
    'mole removal surgery Leicester',
    'private mole removal Leicester',
    'minor surgery Leicester',
    'mole excision Leicester',
    'skin lesion removal Leicester',
  ],
  openGraph: {
    title: 'Mole Removal Leicester | The One Clinic',
    description:
      'Expert mole removal in Leicester. Safe, precise mole excision by our experienced medical team at The One Clinic.',
  },
};

export default function Page() {
  return <MoleRemovalPage />;
}
