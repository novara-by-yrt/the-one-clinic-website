import type { Metadata } from 'next';
import HealthScreeningPage from './HealthScreeningPage';
import JsonLd from '@/lib/schema/JsonLd';
import { buildVideoSchema, buildProcedureSchema, buildBreadcrumbSchema } from '@/lib/schema/builders';

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

const schemas = [
  buildProcedureSchema({
    name: 'Health Screening Leicester',
    description: 'Comprehensive health assessments to detect risks early and give you a clear picture of your overall health.',
    category: 'Health & Wellbeing',
    slug: 'health-screening',
    howPerformed: 'A detailed health assessment including cardiovascular screening, blood tests, and clinical examination by a GMC-registered doctor.',
  }),
  buildBreadcrumbSchema([
    { name: 'Treatments', href: '/treatments' },
    { name: 'Health Screening' },
  ]),
  buildVideoSchema({
    name: 'Health Screening at The One Clinic Leicester',
    description: 'Learn about comprehensive health screening services at The One Clinic, Leicester, including cardiovascular risk assessment and early detection testing.',
    wistiaId: '2u0e7sshum',
    thumbnailUrl: 'https://fast.wistia.net/embed/medias/2u0e7sshum/swatch',
    uploadDate: '2024-01-15',
    duration: 'PT2M',
    pagePath: '/treatments/health-screening',
  }),
];

export default function Page() {
  return (
    <>
      <JsonLd schema={schemas} />
      <HealthScreeningPage />
    </>
  );
}
