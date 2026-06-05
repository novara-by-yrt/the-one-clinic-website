import type { Metadata } from 'next';
import HayFeverInjectionsPage from './HayFeverInjectionsPage';
import JsonLd from '@/lib/schema/JsonLd';
import { buildVideoSchema, buildProcedureSchema, buildBreadcrumbSchema } from '@/lib/schema/builders';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/hay-fever-injections-leicester' },
  title: 'Best Hay Fever Injections in Leicester | The One Clinic',
  description: 'Get expert hay fever injections in Leicester. Relieve severe symptoms instantly and enjoy a brilliant, symptom-free summer.',
  openGraph: {
    title: 'Best Hay Fever Injections in Leicester | The One Clinic',
    description:
      'Get expert hay fever injections in Leicester. Relieve severe symptoms instantly and enjoy a brilliant, symptom-free summer.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Hay Fever Injections in Leicester | The One Clinic',
    description:
      'Get expert hay fever injections in Leicester. Relieve severe symptoms instantly and enjoy a brilliant, symptom-free summer.',
  },
};

const schemas = [
  buildProcedureSchema({
    name: 'Hay Fever Injections Leicester',
    description: 'Expert hay fever injections to relieve severe allergic rhinitis and enjoy a symptom-free summer.',
    category: 'Health & Wellbeing',
    slug: 'hay-fever-injections-leicester',
    howPerformed: 'A targeted corticosteroid injection administered intramuscularly, typically into the gluteal muscle, providing relief for the entire hay fever season.',
  }),
  buildBreadcrumbSchema([
    { name: 'Treatments', href: '/treatments' },
    { name: 'Hay Fever Injections' },
  ]),
];

export default function Page() {
  return (
    <>
      <JsonLd schema={schemas} />
      <HayFeverInjectionsPage />
    </>
  );
}
