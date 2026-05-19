import type { Metadata } from 'next';
import LaserResurfacingPage from './LaserResurfacingPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/laser-resurfacing' },
  title: 'Deep Laser Resurfacing Leicester | Skin Renewal',
  description:
    'Deep laser resurfacing in Leicester. Reduce wrinkles, sun damage, acne scars, and uneven skin tone with advanced laser skin renewal at The One Clinic.',
  openGraph: {
    title: 'Deep Laser Resurfacing Leicester',
    description:
      'Advanced deep laser skin resurfacing in Leicester. Expert treatment for wrinkles, scars, and uneven skin texture at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deep Laser Resurfacing Leicester',
    description:
      'Advanced deep laser skin resurfacing in Leicester. Expert treatment for wrinkles, scars, and uneven skin texture at The One Clinic.',
  },
};

export default function Page() {
  return <LaserResurfacingPage />;
}
