import type { Metadata } from 'next';
import NonSurgicalBlepharoplastyPage from './NonSurgicalBlepharoplastyPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/non-surgical-blepharoplasty-leicester' },
  title: 'Non-Surgical Blepharoplasty Leicester | Eyelid Rejuvenation',
  description:
    'Non-surgical blepharoplasty in Leicester. Lift and rejuvenate hooded or drooping eyelids without surgery at The One Clinic.',
  openGraph: {
    title: 'Non-Surgical Blepharoplasty Leicester',
    description:
      'Expert non-surgical blepharoplasty in Leicester. Lift drooping eyelids and restore a more youthful appearance without surgery at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Non-Surgical Blepharoplasty Leicester',
    description:
      'Expert non-surgical blepharoplasty in Leicester. Lift drooping eyelids and restore a more youthful appearance without surgery at The One Clinic.',
  },
};

export default function Page() {
  return <NonSurgicalBlepharoplastyPage />;
}
