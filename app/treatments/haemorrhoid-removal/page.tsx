import type { Metadata } from 'next';
import HaemorrhoidRemovalPage from './HaemorrhoidRemovalPage';

export const metadata: Metadata = {
  title: 'Best Haemorrhoid Leicester | The One Clinic',
  description:
    'Expert haemorrhoid removal in Leicester to relieve pain, bleeding, and discomfort with safe, minor surgical care.',
  openGraph: {
    title: 'Best Haemorrhoid Leicester | The One Clinic',
    description:
      'Expert haemorrhoid removal in Leicester to relieve pain, bleeding, and discomfort with safe, minor surgical care.',
  },
};

export default function Page() {
  return <HaemorrhoidRemovalPage />;
}
