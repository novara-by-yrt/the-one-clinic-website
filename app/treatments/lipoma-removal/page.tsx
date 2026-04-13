import type { Metadata } from 'next';
import LipomaRemovalPage from './LipomaRemovalPage';

export const metadata: Metadata = {
  title: 'Lipoma Removal Leicester | Expert Minor Surgery | The One Clinic',
  description:
    'Lipoma removal in Leicester. Safe, minimally invasive removal of fatty lumps by our expert medical team at The One Clinic. No GP referral needed.',
  keywords: [
    'lipoma removal Leicester',
    'lipoma treatment Leicester',
    'fatty lump removal Leicester',
    'minor surgery Leicester',
    'lipoma excision Leicester',
    'private lipoma removal Leicester',
  ],
  openGraph: {
    title: 'Lipoma Removal Leicester | The One Clinic',
    description:
      'Expert lipoma removal in Leicester. Minimally invasive treatment for fatty lumps by our experienced medical team at The One Clinic.',
  },
};

export default function Page() {
  return <LipomaRemovalPage />;
}
