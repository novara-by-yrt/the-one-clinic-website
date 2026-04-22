import type { Metadata } from 'next';
import PatientExperiencePage from './PatientExperiencePage';

export const metadata: Metadata = {
  title: 'Patient Experience | The One Clinic Leicester',
  description:
    'Discover the patient experience at The One Clinic, Leicester. From your first consultation to ongoing care, every step is tailored to you by our GMC-registered doctors.',
  openGraph: {
    title: 'Patient Experience | The One Clinic Leicester',
    description:
      'Every patient at The One Clinic receives a bespoke journey, from consultation to results. Discover what to expect when you visit us in Leicester.',
  },
};

export default function Page() {
  return <PatientExperiencePage />;
}
