import type { Metadata } from 'next';
import CoolBlephPage from './CoolBlephPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/cool-bleph-leicester' },
  title: 'Cool Bleph Eyelid Treatment Leicester | Eye Rejuvenation',
  description:
    'Cool Bleph non-surgical eyelid treatment in Leicester. Reduce under-eye bags, drooping lids, and skin laxity around the eyes, no surgery, no downtime.',
  openGraph: {
    title: 'Cool Bleph Leicester',
    description:
      'Non-surgical eyelid rejuvenation with Cool Bleph in Leicester. Expert treatment for eye bags, drooping lids, and periorbital skin laxity.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cool Bleph Leicester',
    description:
      'Non-surgical eyelid rejuvenation with Cool Bleph in Leicester. Expert treatment for eye bags, drooping lids, and periorbital skin laxity.',
  },
};

export default function Page() {
  return <CoolBlephPage />;
}
