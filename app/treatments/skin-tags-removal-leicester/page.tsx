import type { Metadata } from 'next';
import SkinTagsRemovalPage from './SkinTagsRemovalPage';

export const metadata: Metadata = {
  title: 'Skin Tag Removal Leicester | Expert Minor Surgery | The One Clinic',
  description:
    'Skin tag removal in Leicester. Fast, safe removal of skin tags by our expert medical team at The One Clinic. No GP referral needed.',
  keywords: [
    'skin tag removal Leicester',
    'skin tags Leicester',
    'remove skin tags Leicester',
    'minor surgery Leicester',
    'skin tag treatment Leicester',
    'private skin tag removal Leicester',
  ],
  openGraph: {
    title: 'Skin Tag Removal Leicester | The One Clinic',
    description:
      'Expert skin tag removal in Leicester. Fast, safe, and effective treatment by our experienced medical team at The One Clinic.',
  },
};

export default function Page() {
  return <SkinTagsRemovalPage />;
}
