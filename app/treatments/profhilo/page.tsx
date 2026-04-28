import type { Metadata } from 'next';
import ProfhiloPage from './ProfhiloPage';

export const metadata: Metadata = {
  title: 'Best Profhilo in Leicester | The One Clinic',
  description:
    'Discover expert Profhilo treatments in Leicester at The One Clinic. Rejuvenate your skin with deep hydration and collagen stimulation in a state-of-the-art clinic.',
  keywords: [
    'Profhilo Leicester',
    'Profhilo treatment',
    'skin hydration Leicester',
    'collagen stimulation Leicester',
    'skin rejuvenation Leicester',
    'anti-ageing injections Leicester',
    'bio-remodelling Leicester',
  ],
  openGraph: {
    title: 'Best Profhilo in Leicester | The One Clinic',
    description:
      'Discover expert Profhilo treatments in Leicester at The One Clinic. Rejuvenate your skin with deep hydration and collagen stimulation in a state-of-the-art clinic.',
  },
};

export default function Page() {
  return <ProfhiloPage />;
}
