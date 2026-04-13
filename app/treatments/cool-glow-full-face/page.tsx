import type { Metadata } from 'next';
import CoolGlowPage from './CoolGlowPage';

export const metadata: Metadata = {
  title: 'COOL Glow Peel Leicester | Full Face Skin Rejuvenation | The One Clinic',
  description:
    'COOL Glow Peel full face treatment in Leicester. Advanced skin rejuvenation to brighten, smooth, and refresh your complexion with no downtime at The One Clinic.',
  keywords: [
    'COOL Glow Peel Leicester',
    'cool glow peel full face Leicester',
    'skin peel Leicester',
    'skin rejuvenation Leicester',
    'glow facial Leicester',
    'brightening treatment Leicester',
  ],
  openGraph: {
    title: 'COOL Glow Peel Leicester | The One Clinic',
    description:
      'Expert COOL Glow Peel full face treatment in Leicester. Brighten, smooth, and refresh your skin with no downtime at The One Clinic.',
  },
};

export default function Page() {
  return <CoolGlowPage />;
}
