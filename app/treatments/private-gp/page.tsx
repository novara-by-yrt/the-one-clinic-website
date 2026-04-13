import type { Metadata } from 'next';
import PrivateGPPage from './PrivateGPPage';

export const metadata: Metadata = {
  title: 'Private GP Leicester | Same-Day Appointments | The One Clinic',
  description:
    'Private GP appointments in Leicester. Same-day and next-day consultations with GMC-registered doctors. Prescriptions, referrals, and comprehensive medical care at The One Clinic.',
  keywords: [
    'Private GP Leicester',
    'private doctor Leicester',
    'same day GP appointment Leicester',
    'private GP appointment',
    'private medical consultation Leicester',
    'GMC registered GP Leicester',
    'private prescription Leicester',
  ],
  openGraph: {
    title: 'Private GP Leicester | The One Clinic',
    description:
      'Book a same-day or next-day private GP appointment in Leicester. Thorough, unhurried consultations with qualified doctors at The One Clinic.',
  },
};

export default function Page() {
  return <PrivateGPPage />;
}
