import type { Metadata } from 'next';
import NonSurgicalBlepharoplastyPage from './NonSurgicalBlepharoplastyPage';

export const metadata: Metadata = {
  title: 'Non-Surgical Blepharoplasty Leicester | Eyelid Rejuvenation | The One Clinic',
  description:
    'Non-surgical blepharoplasty in Leicester. Lift and rejuvenate hooded or drooping eyelids without surgery at The One Clinic.',
  keywords: [
    'non surgical blepharoplasty Leicester',
    'eyelid rejuvenation Leicester',
    'plasma eyelid lift Leicester',
    'hooded eyelids treatment Leicester',
    'non surgical eyelid lift Leicester',
    'blepharoplasty Leicester',
  ],
  openGraph: {
    title: 'Non-Surgical Blepharoplasty Leicester | The One Clinic',
    description:
      'Expert non-surgical blepharoplasty in Leicester. Lift drooping eyelids and restore a more youthful appearance without surgery at The One Clinic.',
  },
};

export default function Page() {
  return <NonSurgicalBlepharoplastyPage />;
}
