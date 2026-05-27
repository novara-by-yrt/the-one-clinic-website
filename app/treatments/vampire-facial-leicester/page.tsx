import type { Metadata } from 'next';
import VampireFacialPage from './VampireFacialPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/vampire-facial-leicester' },
  title: 'Vampire Facial Leicester | PRP Skin Rejuvenation',
  description: 'Vampire Facial (PRP) in Leicester. Natural skin rejuvenation using your own platelet-rich plasma to stimulate collagen and improve skin texture at The One Cl…',
  openGraph: {
    title: 'Vampire Facial Leicester',
    description:
      'Natural PRP skin rejuvenation in Leicester. Expert Vampire Facial treatment to restore radiance, texture, and youthful skin at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vampire Facial Leicester',
    description:
      'Natural PRP skin rejuvenation in Leicester. Expert Vampire Facial treatment to restore radiance, texture, and youthful skin at The One Clinic.',
  },
};

export default function Page() {
  return <VampireFacialPage />;
}
