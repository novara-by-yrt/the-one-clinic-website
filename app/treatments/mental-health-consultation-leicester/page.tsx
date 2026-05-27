import type { Metadata } from 'next';
import MentalHealthPage from './MentalHealthPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/mental-health-consultation-leicester' },
  title: 'Mental Health Consultation Leicester | Psychiatry & GP',
  description: 'Private mental health consultations in Leicester. Expert assessment and support for anxiety, depression, stress, and other mental health concerns. GMC-regist…',
  openGraph: {
    title: 'Mental Health Consultation Leicester',
    description:
      'Compassionate, confidential mental health support in Leicester. Expert doctors ready to help with anxiety, depression, and more at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mental Health Consultation Leicester',
    description:
      'Compassionate, confidential mental health support in Leicester. Expert doctors ready to help with anxiety, depression, and more at The One Clinic.',
  },
};

export default function Page() {
  return <MentalHealthPage />;
}
