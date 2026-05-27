import type { Metadata } from 'next';
import DermatologistPage from './DermatologistPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/dermatologist-leicester' },
  title: 'Dermatologist Leicester | Private Skin Specialist',
  description: 'Private dermatology consultations in Leicester. Expert diagnosis and treatment of skin conditions including acne, eczema, psoriasis, rosacea, and skin cancer…',
  openGraph: {
    title: 'Dermatologist Leicester',
    description:
      'Expert private dermatology in Leicester. Fast access to a skin specialist for diagnosis and treatment of all skin conditions at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dermatologist Leicester',
    description:
      'Expert private dermatology in Leicester. Fast access to a skin specialist for diagnosis and treatment of all skin conditions at The One Clinic.',
  },
};

export default function Page() {
  return <DermatologistPage />;
}
