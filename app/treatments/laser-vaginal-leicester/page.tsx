import type { Metadata } from 'next';
import LaserVaginalPage from './LaserVaginalPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/laser-vaginal-leicester' },
  title: 'Laser Vaginal Rejuvenation Leicester | Women\'s Intimate Health | The One Clinic',
  description:
    'Laser vaginal rejuvenation in Leicester. Non-surgical treatment for vaginal laxity, dryness, and intimate wellbeing. Confidential expert care at The One Clinic.',
  openGraph: {
    title: 'Laser Vaginal Rejuvenation Leicester',
    description:
      'Confidential laser vaginal rejuvenation in Leicester. Expert non-surgical treatment for intimate health and wellbeing at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Laser Vaginal Rejuvenation Leicester',
    description:
      'Confidential laser vaginal rejuvenation in Leicester. Expert non-surgical treatment for intimate health and wellbeing at The One Clinic.',
  },
};

export default function Page() {
  return <LaserVaginalPage />;
}
