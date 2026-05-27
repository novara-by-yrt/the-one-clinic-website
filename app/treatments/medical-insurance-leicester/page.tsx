import type { Metadata } from 'next';
import MedicalInsurancePage from './MedicalInsurancePage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/medical-insurance-leicester' },
  title: 'Medical Insurance Examination Leicester',
  description: 'Private medical insurance examinations and independent medical reports in Leicester. Life insurance medicals, pre-employment health checks, and medico-legal…',
  openGraph: {
    title: 'Medical Insurance Examination Leicester',
    description:
      'Thorough, impartial medical insurance examinations and independent health reports by GMC-registered doctors at The One Clinic, Leicester.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medical Insurance Examination Leicester',
    description:
      'Thorough, impartial medical insurance examinations and independent health reports by GMC-registered doctors at The One Clinic, Leicester.',
  },
};

export default function Page() {
  return <MedicalInsurancePage />;
}
