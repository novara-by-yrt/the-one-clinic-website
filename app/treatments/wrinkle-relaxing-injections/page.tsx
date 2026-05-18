import type { Metadata } from 'next';
import WrinkleRelaxingPage from './WrinkleRelaxingPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/wrinkle-relaxing-injections' },
  title: 'Wrinkle Relaxing Injections Leicester | Anti-Wrinkle',
  description:
    'Wrinkle relaxing injections in Leicester. Expert anti-wrinkle treatment to smooth fine lines and restore a refreshed, natural appearance at The One Clinic.',
  openGraph: {
    title: 'Wrinkle Relaxing Injections Leicester',
    description:
      'Expert wrinkle relaxing injections in Leicester. Smooth fine lines and restore a natural, refreshed appearance with anti-wrinkle treatment at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wrinkle Relaxing Injections Leicester',
    description:
      'Expert wrinkle relaxing injections in Leicester. Smooth fine lines and restore a natural, refreshed appearance with anti-wrinkle treatment at The One Clinic.',
  },
};

export default function Page() {
  return <WrinkleRelaxingPage />;
}
