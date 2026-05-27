import type { Metadata } from 'next';
import PrivateGPPage from './PrivateGPPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/private-gp-leicester' },
  title: 'Private GP Leicester | Same-Day Appointments',
  description: 'Private GP appointments in Leicester. Same-day and next-day consultations with GMC-registered doctors. Prescriptions, referrals, and comprehensive medical ca…',
  openGraph: {
    title: 'Private GP Leicester',
    description:
      'Book a same-day or next-day private GP appointment in Leicester. Thorough, unhurried consultations with qualified doctors at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Private GP Leicester',
    description:
      'Book a same-day or next-day private GP appointment in Leicester. Thorough, unhurried consultations with qualified doctors at The One Clinic.',
  },
};

export default function Page() {
  return <PrivateGPPage />;
}
