import type { Metadata } from 'next';
import MentalHealthPage from './MentalHealthPage';

export const metadata: Metadata = {
  title: 'Mental Health Consultation Leicester | Private Psychiatry & GP | The One Clinic',
  description:
    'Private mental health consultations in Leicester. Expert assessment and support for anxiety, depression, stress, and other mental health concerns. GMC-registered doctors at The One Clinic.',
  keywords: [
    'mental health consultation Leicester',
    'private mental health Leicester',
    'anxiety treatment Leicester',
    'depression consultation Leicester',
    'private psychiatry Leicester',
    'mental health GP Leicester',
    'stress management Leicester',
  ],
  openGraph: {
    title: 'Mental Health Consultation Leicester | The One Clinic',
    description:
      'Compassionate, confidential mental health support in Leicester. Expert doctors ready to help with anxiety, depression, and more at The One Clinic.',
  },
};

export default function Page() {
  return <MentalHealthPage />;
}
