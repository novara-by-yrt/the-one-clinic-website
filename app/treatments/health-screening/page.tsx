import type { Metadata } from 'next';
import HealthScreeningPage from './HealthScreeningPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/health-screening' },
  title: 'Health Screening Leicester',
  description: 'Proactive cardiovascular health screening at The One Clinic, Leicester. Early detection, personalised monitoring, and expert medical care from GMC-registered…',
  openGraph: {
    title: 'Health Screening Leicester',
    description:
      'Advanced cardiovascular health screening at Leicester\u2019s One Clinic. Book your appointment today.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Health Screening Leicester',
    description:
      'Advanced cardiovascular health screening at Leicester\u2019s One Clinic. Book your appointment today.',
  },
};

export default function Page() {
  return <HealthScreeningPage />;
}
