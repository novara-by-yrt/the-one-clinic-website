import type { Metadata } from 'next';
import SkinLesionPage from './SkinLesionPage';

export const metadata: Metadata = {
  title: 'Skin Lesion Removal Leicester | Safe Expert Removal | The One Clinic',
  description:
    'Private skin lesion removal in Leicester. Safe, expert removal of moles, cysts, lipomas, and skin tags by GMC-registered doctors at The One Clinic.',
  keywords: [
    'skin lesion removal Leicester',
    'mole removal Leicester',
    'cyst removal Leicester',
    'lipoma removal Leicester',
    'skin tag removal Leicester',
    'private skin lesion Leicester',
  ],
  openGraph: {
    title: 'Skin Lesion Removal Leicester | The One Clinic',
    description:
      'Expert private skin lesion removal in Leicester. Safe removal of moles, cysts, and lesions by GMC-registered doctors at The One Clinic.',
  },
};

export default function Page() {
  return <SkinLesionPage />;
}
