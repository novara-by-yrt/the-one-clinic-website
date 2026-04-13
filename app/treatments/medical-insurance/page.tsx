import type { Metadata } from 'next';
import MedicalInsurancePage from './MedicalInsurancePage';

export const metadata: Metadata = {
  title: 'Medical Insurance Examination Leicester | Independent Medical Reports | The One Clinic',
  description:
    'Private medical insurance examinations and independent medical reports in Leicester. Life insurance medicals, pre-employment health checks, and medico-legal reports by GMC-registered doctors at The One Clinic.',
  keywords: [
    'medical insurance examination Leicester',
    'insurance medical Leicester',
    'life insurance medical Leicester',
    'independent medical report Leicester',
    'pre-employment health check Leicester',
    'medico-legal report Leicester',
    'private medical examination Leicester',
  ],
  openGraph: {
    title: 'Medical Insurance Examination Leicester | The One Clinic',
    description:
      'Thorough, impartial medical insurance examinations and independent health reports by GMC-registered doctors at The One Clinic, Leicester.',
  },
};

export default function Page() {
  return <MedicalInsurancePage />;
}
