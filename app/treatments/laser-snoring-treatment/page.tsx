import type { Metadata } from 'next';
import LaserSnoringPage from './LaserSnoringPage';

export const metadata: Metadata = {
  title: 'Laser Snoring Treatment Leicester | Stop Snoring Clinic | The One Clinic',
  description:
    'Laser snoring treatment in Leicester. A fast, non-surgical solution to reduce snoring and improve sleep quality at The One Clinic.',
  keywords: [
    'laser snoring treatment Leicester',
    'stop snoring Leicester',
    'snoring clinic Leicester',
    'laser snoring Leicester',
    'snoring treatment Leicester',
    'private snoring clinic Leicester',
  ],
  openGraph: {
    title: 'Laser Snoring Treatment Leicester | The One Clinic',
    description:
      'Expert laser snoring treatment in Leicester. A non-surgical, fast, and effective solution to reduce snoring at The One Clinic.',
  },
};

export default function Page() {
  return <LaserSnoringPage />;
}
