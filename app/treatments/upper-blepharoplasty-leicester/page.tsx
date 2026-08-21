import type { Metadata } from 'next';
import UpperBlepharoplastyPage from './UpperBlepharoplastyPage';
import JsonLd from '@/lib/schema/JsonLd';
import {
  buildProcedureSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
} from '@/lib/schema/builders';
import { UPPER_BLEPH_FAQS } from './data';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/upper-blepharoplasty-leicester' },
  title: { absolute: 'Best Upper Blepharoplasty in Leicester | The One Clinic' },
  description:
    'Experience upper blepharoplasty procedures performed by experts in Leicester. Transform your eyes for a youthful look. Book your Consultation Today.',
  openGraph: {
    title: 'Best Upper Blepharoplasty in Leicester | The One Clinic',
    description:
      'Experience upper blepharoplasty procedures performed by experts in Leicester. Transform your eyes for a youthful look. Book your Consultation Today.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Upper Blepharoplasty in Leicester | The One Clinic',
    description:
      'Experience upper blepharoplasty procedures performed by experts in Leicester. Transform your eyes for a youthful look. Book your Consultation Today.',
  },
};

const schemas = [
  buildProcedureSchema({
    name: 'Upper Blepharoplasty',
    description:
      'Upper eyelid lift treatment that addresses excess skin and hooded eyelids to restore a brighter, more youthful eye area.',
    category: 'Medical Aesthetics',
    slug: 'upper-blepharoplasty-leicester',
    bodyLocation: 'Upper eyelids',
    howPerformed:
      'The eye area is cleansed and a local anaesthetic administered. Using modern techniques, the specialist removes or resuspends excess upper eyelid skin to lift and smooth the eye area.',
    preparation:
      'A consultation and eyelid examination allow the specialist to design a customised treatment plan aligned with your objectives.',
    followup:
      'Mild swelling, redness, and temporary bruising may occur. Full results appear once initial swelling settles over a couple of weeks; follow-up appointments monitor healing.',
  }),
  buildFaqSchema(UPPER_BLEPH_FAQS),
  buildBreadcrumbSchema([
    { name: 'Treatments', href: '/treatments' },
    { name: 'Upper Blepharoplasty' },
  ]),
];

export default function Page() {
  return (
    <>
      <JsonLd schema={schemas} />
      <UpperBlepharoplastyPage />
    </>
  );
}
