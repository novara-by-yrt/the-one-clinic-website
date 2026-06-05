import type { Metadata } from 'next';
import AlumierMDPage from './AlumierMDPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/skincare-alumier-md-leicester' },
  title: 'Best Alumier Skincare in Leicester | The One Clinic',
  description:
    'Introducing innovative Alumier MD skincare products in Leicester. Restore, nourish, and rejuvenate your skin with our bespoke, customised treatments.',
  openGraph: {
    title: 'Best Alumier Skincare in Leicester | The One Clinic',
    description:
      'Introducing innovative Alumier MD skincare products in Leicester. Restore, nourish, and rejuvenate your skin with our bespoke, customised treatments.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Alumier Skincare in Leicester | The One Clinic',
    description:
      'Introducing innovative Alumier MD skincare products in Leicester. Restore, nourish, and rejuvenate your skin with our bespoke, customised treatments.',
  },
};

export default function Page() {
  return <AlumierMDPage />;
}
