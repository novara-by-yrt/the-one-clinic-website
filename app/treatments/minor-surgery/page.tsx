import type { Metadata } from 'next';
import MinorSurgeryPage from './MinorSurgeryPage';

export const metadata: Metadata = {
  title: 'Minor Surgery Leicester | Mole, Cyst & Lesion Removal | The One Clinic',
  description:
    'Expert minor surgery in Leicester. Safe removal of moles, cysts, lipomas, and skin lesions under local anaesthetic by GMC-registered doctors at The One Clinic.',
  keywords: [
    'minor surgery Leicester',
    'mole removal Leicester',
    'cyst removal Leicester',
    'lipoma removal Leicester',
    'skin lesion removal Leicester',
    'minor surgical procedures Leicester',
    'private minor surgery Leicester',
  ],
  openGraph: {
    title: 'Minor Surgery Leicester | The One Clinic',
    description:
      'Safe, precise minor surgical procedures in Leicester. Moles, cysts, lipomas, and lesions removed under local anaesthetic at The One Clinic.',
  },
};

export default function Page() {
  return <MinorSurgeryPage />;
}
