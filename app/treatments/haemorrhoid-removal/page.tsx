import type { Metadata } from 'next';
import HaemorrhoidRemovalPage from './HaemorrhoidRemovalPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/haemorrhoid-removal' },
  title: 'Best Haemorrhoid Leicester',
  description:
    'Expert haemorrhoid removal in Leicester to relieve pain, bleeding, and discomfort with safe, minor surgical care.',
  openGraph: {
    title: 'Best Haemorrhoid Leicester',
    description:
      'Expert haemorrhoid removal in Leicester to relieve pain, bleeding, and discomfort with safe, minor surgical care.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Haemorrhoid Leicester',
    description:
      'Expert haemorrhoid removal in Leicester to relieve pain, bleeding, and discomfort with safe, minor surgical care.',
  },
};

export default function Page() {
  return <HaemorrhoidRemovalPage />;
}
