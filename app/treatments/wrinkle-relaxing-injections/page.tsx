import type { Metadata } from 'next';
import WrinkleRelaxingPage from './WrinkleRelaxingPage';

export const metadata: Metadata = {
  title: 'Wrinkle Relaxing Injections Leicester | Anti-Wrinkle Treatment | The One Clinic',
  description:
    'Wrinkle relaxing injections in Leicester. Expert anti-wrinkle treatment to smooth fine lines and restore a refreshed, natural appearance at The One Clinic.',
  keywords: [
    'wrinkle relaxing injections Leicester',
    'anti-wrinkle injections Leicester',
    'botox Leicester',
    'botulinum toxin Leicester',
    'forehead lines Leicester',
    'frown lines Leicester',
  ],
  openGraph: {
    title: 'Wrinkle Relaxing Injections Leicester | The One Clinic',
    description:
      'Expert wrinkle relaxing injections in Leicester. Smooth fine lines and restore a natural, refreshed appearance with anti-wrinkle treatment at The One Clinic.',
  },
};

export default function Page() {
  return <WrinkleRelaxingPage />;
}
