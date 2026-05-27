import type { Metadata } from 'next';
import ProfhiloPage from './ProfhiloPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/profhilo-leicester' },
  title: 'Best Profhilo in Leicester',
  description: 'Discover expert Profhilo treatments in Leicester at The One Clinic. Rejuvenate your skin with deep hydration and collagen stimulation in a state-of-the-art c…',
  openGraph: {
    title: 'Best Profhilo in Leicester',
    description: 'Discover expert Profhilo treatments in Leicester at The One Clinic. Rejuvenate your skin with deep hydration and collagen stimulation in a state-of-the-art c…',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Profhilo in Leicester',
    description: 'Discover expert Profhilo treatments in Leicester at The One Clinic. Rejuvenate your skin with deep hydration and collagen stimulation in a state-of-the-art c…',
  },
};

export default function Page() {
  return <ProfhiloPage />;
}
