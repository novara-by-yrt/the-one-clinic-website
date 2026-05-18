import type { Metadata } from 'next';
import WartRemovalPage from './WartRemovalPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/wart-removal-leicester' },
  title: 'Wart Removal Leicester | Expert Skin Treatment',
  description:
    'Wart removal in Leicester. Safe, effective removal of warts and verrucas by our expert medical team at The One Clinic. No GP referral needed.',
  openGraph: {
    title: 'Wart Removal Leicester',
    description:
      'Expert wart and verruca removal in Leicester. Safe, effective treatment by our experienced medical team at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wart Removal Leicester',
    description:
      'Expert wart and verruca removal in Leicester. Safe, effective treatment by our experienced medical team at The One Clinic.',
  },
};

export default function Page() {
  return <WartRemovalPage />;
}
