import type { Metadata } from 'next';
import VampireFacialPage from './VampireFacialPage';

export const metadata: Metadata = {
  title: 'Vampire Facial Leicester | PRP Skin Rejuvenation | The One Clinic',
  description:
    'Vampire Facial (PRP) in Leicester. Natural skin rejuvenation using your own platelet-rich plasma to stimulate collagen and improve skin texture at The One Clinic.',
  keywords: [
    'vampire facial Leicester',
    'PRP facial Leicester',
    'platelet rich plasma Leicester',
    'PRP skin rejuvenation Leicester',
    'vampire facial treatment Leicester',
    'PRP therapy Leicester',
  ],
  openGraph: {
    title: 'Vampire Facial Leicester | The One Clinic',
    description:
      'Natural PRP skin rejuvenation in Leicester. Expert Vampire Facial treatment to restore radiance, texture, and youthful skin at The One Clinic.',
  },
};

export default function Page() {
  return <VampireFacialPage />;
}
