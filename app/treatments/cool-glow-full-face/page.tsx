import type { Metadata } from 'next';
import CoolGlowPage from './CoolGlowPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/cool-glow-full-face' },
  title: 'COOL Glow Peel Leicester | Full Face Skin Rejuvenation',
  description:
    'COOL Glow Peel full face treatment in Leicester. Advanced skin rejuvenation to brighten, smooth, and refresh your complexion with no downtime at The One Clinic.',
  openGraph: {
    title: 'COOL Glow Peel Leicester',
    description:
      'Expert COOL Glow Peel full face treatment in Leicester. Brighten, smooth, and refresh your skin with no downtime at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'COOL Glow Peel Leicester',
    description:
      'Expert COOL Glow Peel full face treatment in Leicester. Brighten, smooth, and refresh your skin with no downtime at The One Clinic.',
  },
};

export default function Page() {
  return <CoolGlowPage />;
}
