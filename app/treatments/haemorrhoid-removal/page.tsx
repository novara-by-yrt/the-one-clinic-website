import type { Metadata } from 'next';
import HaemorrhoidRemovalPage from './HaemorrhoidRemovalPage';

export const metadata: Metadata = {
  title: 'Best Haemorrhoid Leicester | The One Clinic',
  description:
    'Expert haemorrhoid removal in Leicester to relieve pain, bleeding, and discomfort with safe, minor surgical care.',
  keywords: [
    'haemorrhoid removal Leicester',
    'piles treatment Leicester',
    'haemorrhoidectomy Leicester',
    'rubber band ligation Leicester',
    'haemorrhoid surgery Leicester',
    'piles doctor Leicester',
    'haemorrhoid specialist Leicester',
    'private haemorrhoid treatment Leicester',
  ],
  openGraph: {
    title: 'Best Haemorrhoid Leicester | The One Clinic',
    description:
      'Expert haemorrhoid removal in Leicester to relieve pain, bleeding, and discomfort with safe, minor surgical care.',
  },
};

export default function Page() {
  return <HaemorrhoidRemovalPage />;
}
