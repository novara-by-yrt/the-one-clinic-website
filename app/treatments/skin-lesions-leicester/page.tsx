import type { Metadata } from 'next';
import SkinLesionPage from './SkinLesionPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/skin-lesions-leicester' },
  title: 'Skin Lesion Removal Leicester | Safe Expert Removal',
  description:
    'Private skin lesion removal in Leicester. Safe, expert removal of moles, cysts, lipomas, and skin tags by GMC-registered doctors at The One Clinic.',
  openGraph: {
    title: 'Skin Lesion Removal Leicester',
    description:
      'Expert private skin lesion removal in Leicester. Safe removal of moles, cysts, and lesions by GMC-registered doctors at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skin Lesion Removal Leicester',
    description:
      'Expert private skin lesion removal in Leicester. Safe removal of moles, cysts, and lesions by GMC-registered doctors at The One Clinic.',
  },
};

export default function Page() {
  return <SkinLesionPage />;
}
