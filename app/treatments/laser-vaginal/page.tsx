import type { Metadata } from 'next';
import LaserVaginalPage from './LaserVaginalPage';

export const metadata: Metadata = {
  title: 'Laser Vaginal Rejuvenation Leicester | Women\'s Intimate Health | The One Clinic',
  description:
    'Laser vaginal rejuvenation in Leicester. Non-surgical treatment for vaginal laxity, dryness, and intimate wellbeing. Confidential expert care at The One Clinic.',
  keywords: [
    'laser vaginal rejuvenation Leicester',
    'vaginal rejuvenation Leicester',
    'intimate health treatment Leicester',
    'vaginal laxity treatment Leicester',
    'non-surgical vaginal treatment Leicester',
    'women\'s intimate health Leicester',
  ],
  openGraph: {
    title: 'Laser Vaginal Rejuvenation Leicester | The One Clinic',
    description:
      'Confidential laser vaginal rejuvenation in Leicester. Expert non-surgical treatment for intimate health and wellbeing at The One Clinic.',
  },
};

export default function Page() {
  return <LaserVaginalPage />;
}
