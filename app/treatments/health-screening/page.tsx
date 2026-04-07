import type { Metadata } from 'next';
import HealthScreeningPage from './HealthScreeningPage';

export const metadata: Metadata = {
  title: 'Health Screening Leicester',
  description:
    'Proactive cardiovascular health screening at The One Clinic, Leicester. Early detection, personalised monitoring, and expert medical care from GMC-registered doctors.',
  keywords: [
    'health screening Leicester',
    'cardiac screening Leicester',
    'cardiovascular screening',
    'blood pressure check Leicester',
    'heart health check',
    'private health screening',
  ],
  openGraph: {
    title: 'Health Screening Leicester | The One Clinic',
    description:
      'Advanced cardiovascular health screening at Leicester\u2019s One Clinic. Book your appointment today.',
  },
};

export default function Page() {
  return <HealthScreeningPage />;
}
