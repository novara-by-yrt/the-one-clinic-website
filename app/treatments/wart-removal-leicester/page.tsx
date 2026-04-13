import type { Metadata } from 'next';
import WartRemovalPage from './WartRemovalPage';

export const metadata: Metadata = {
  title: 'Wart Removal Leicester | Expert Skin Treatment | The One Clinic',
  description:
    'Wart removal in Leicester. Safe, effective removal of warts and verrucas by our expert medical team at The One Clinic. No GP referral needed.',
  keywords: [
    'wart removal Leicester',
    'wart treatment Leicester',
    'verruca removal Leicester',
    'skin wart removal Leicester',
    'private wart removal Leicester',
    'wart clinic Leicester',
  ],
  openGraph: {
    title: 'Wart Removal Leicester | The One Clinic',
    description:
      'Expert wart and verruca removal in Leicester. Safe, effective treatment by our experienced medical team at The One Clinic.',
  },
};

export default function Page() {
  return <WartRemovalPage />;
}
