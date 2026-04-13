import type { Metadata } from 'next';
import DermatologistPage from './DermatologistPage';

export const metadata: Metadata = {
  title: 'Dermatologist Leicester | Private Skin Specialist | The One Clinic',
  description:
    'Private dermatology consultations in Leicester. Expert diagnosis and treatment of skin conditions including acne, eczema, psoriasis, rosacea, and skin cancer screening at The One Clinic.',
  keywords: [
    'dermatologist Leicester',
    'private dermatology Leicester',
    'skin specialist Leicester',
    'skin clinic Leicester',
    'eczema treatment Leicester',
    'acne specialist Leicester',
    'skin cancer screening Leicester',
  ],
  openGraph: {
    title: 'Dermatologist Leicester | The One Clinic',
    description:
      'Expert private dermatology in Leicester. Fast access to a skin specialist for diagnosis and treatment of all skin conditions at The One Clinic.',
  },
};

export default function Page() {
  return <DermatologistPage />;
}
