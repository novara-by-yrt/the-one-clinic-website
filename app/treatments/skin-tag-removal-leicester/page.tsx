import type { Metadata } from 'next';
import SkinTagsRemovalPage from './SkinTagsRemovalPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/skin-tag-removal-leicester' },
  title: 'Skin Tag Removal Leicester | Expert Minor Surgery',
  description:
    'Skin tag removal in Leicester. Fast, safe removal of skin tags by our expert medical team at The One Clinic. No GP referral needed.',
  openGraph: {
    title: 'Skin Tag Removal Leicester',
    description:
      'Expert skin tag removal in Leicester. Fast, safe, and effective treatment by our experienced medical team at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skin Tag Removal Leicester',
    description:
      'Expert skin tag removal in Leicester. Fast, safe, and effective treatment by our experienced medical team at The One Clinic.',
  },
};

export default function Page() {
  return <SkinTagsRemovalPage />;
}
