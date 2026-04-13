import type { Metadata } from 'next';
import LaserResurfacingPage from './LaserResurfacingPage';

export const metadata: Metadata = {
  title: 'Deep Laser Resurfacing Leicester | Skin Renewal | The One Clinic',
  description:
    'Deep laser resurfacing in Leicester. Reduce wrinkles, sun damage, acne scars, and uneven skin tone with advanced laser skin renewal at The One Clinic.',
  keywords: [
    'deep laser resurfacing Leicester',
    'laser skin resurfacing Leicester',
    'fractional laser Leicester',
    'laser wrinkle treatment Leicester',
    'acne scar laser treatment Leicester',
    'skin renewal Leicester',
  ],
  openGraph: {
    title: 'Deep Laser Resurfacing Leicester | The One Clinic',
    description:
      'Advanced deep laser skin resurfacing in Leicester. Expert treatment for wrinkles, scars, and uneven skin texture at The One Clinic.',
  },
};

export default function Page() {
  return <LaserResurfacingPage />;
}
