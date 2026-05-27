import type { Metadata } from 'next';
import MinorSurgeryPage from './MinorSurgeryPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/minor-surgery-leicester' },
  title: 'Minor Surgery Leicester | Mole, Cyst & Lesion Removal',
  description:
    'Expert minor surgery in Leicester. Safe removal of moles, cysts, lipomas, and skin lesions under local anaesthetic by GMC-registered doctors at The One Clinic.',
  openGraph: {
    title: 'Minor Surgery Leicester',
    description:
      'Safe, precise minor surgical procedures in Leicester. Moles, cysts, lipomas, and lesions removed under local anaesthetic at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Minor Surgery Leicester',
    description:
      'Safe, precise minor surgical procedures in Leicester. Moles, cysts, lipomas, and lesions removed under local anaesthetic at The One Clinic.',
  },
};

export default function Page() {
  return <MinorSurgeryPage />;
}
