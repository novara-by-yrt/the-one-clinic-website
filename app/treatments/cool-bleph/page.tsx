import type { Metadata } from 'next';
import CoolBlephPage from './CoolBlephPage';

export const metadata: Metadata = {
  title: 'Cool Bleph Eyelid Treatment Leicester | Eye Rejuvenation | The One Clinic',
  description:
    'Cool Bleph non-surgical eyelid treatment in Leicester. Reduce under-eye bags, drooping lids, and skin laxity around the eyes, no surgery, no downtime.',
  keywords: [
    'Cool Bleph Leicester',
    'eyelid treatment Leicester',
    'non-surgical eyelid rejuvenation Leicester',
    'under-eye treatment Leicester',
    'eye bag treatment Leicester',
    'eyelid tightening Leicester',
  ],
  openGraph: {
    title: 'Cool Bleph Leicester | The One Clinic',
    description:
      'Non-surgical eyelid rejuvenation with Cool Bleph in Leicester. Expert treatment for eye bags, drooping lids, and periorbital skin laxity.',
  },
};

export default function Page() {
  return <CoolBlephPage />;
}
