import type { Metadata } from 'next';
import LipomaRemovalPage from './LipomaRemovalPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/lipoma-removal-leicester' },
  title: 'Lipoma Removal Leicester | Expert Minor Surgery',
  description:
    'Lipoma removal in Leicester. Safe, minimally invasive removal of fatty lumps by our expert medical team at The One Clinic. No GP referral needed.',
  openGraph: {
    title: 'Lipoma Removal Leicester',
    description:
      'Expert lipoma removal in Leicester. Minimally invasive treatment for fatty lumps by our experienced medical team at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lipoma Removal Leicester',
    description:
      'Expert lipoma removal in Leicester. Minimally invasive treatment for fatty lumps by our experienced medical team at The One Clinic.',
  },
};

export default function Page() {
  return <LipomaRemovalPage />;
}
