import type { Metadata } from 'next';
import LaserSnoringPage from './LaserSnoringPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/laser-snoring-treatment-leicester' },
  title: 'Laser Snoring Treatment Leicester | Stop Snoring Clinic',
  description:
    'Laser snoring treatment in Leicester. A fast, non-surgical solution to reduce snoring and improve sleep quality at The One Clinic.',
  openGraph: {
    title: 'Laser Snoring Treatment Leicester',
    description:
      'Expert laser snoring treatment in Leicester. A non-surgical, fast, and effective solution to reduce snoring at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Laser Snoring Treatment Leicester',
    description:
      'Expert laser snoring treatment in Leicester. A non-surgical, fast, and effective solution to reduce snoring at The One Clinic.',
  },
};

export default function Page() {
  return <LaserSnoringPage />;
}
