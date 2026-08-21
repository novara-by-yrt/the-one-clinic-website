import type { Metadata } from 'next';
import LongevityMedicinePage from './LongevityMedicinePage';
import JsonLd from '@/lib/schema/JsonLd';
import {
  buildProcedureSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
} from '@/lib/schema/builders';
import { LONGEVITY_FAQS } from './data';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/longevity-medicine-leicester' },
  title: { absolute: 'Best Longevity Medicine in Leicester | The One Clinic' },
  description:
    'Discover the leading longevity medical clinic in Leicester. Our expert longevity doctors offer bespoke longevity treatment and face profiling for a fresher-looking face.',
  openGraph: {
    title: 'Best Longevity Medicine in Leicester | The One Clinic',
    description:
      'Discover the leading longevity medical clinic in Leicester. Our expert longevity doctors offer bespoke longevity treatment and face profiling for a fresher-looking face.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Longevity Medicine in Leicester | The One Clinic',
    description:
      'Discover the leading longevity medical clinic in Leicester. Our expert longevity doctors offer bespoke longevity treatment and face profiling for a fresher-looking face.',
  },
};

const schemas = [
  buildProcedureSchema({
    name: 'Longevity Medicine',
    description:
      'Proactive, science-led longevity medicine combining metabolic health optimisation with expert face profiling using premium fillers for a fresher-looking face.',
    category: 'Health & Wellbeing',
    slug: 'longevity-medicine-leicester',
    bodyLocation: 'Mid-face, peri-oral area (mouth and chin)',
    howPerformed:
      'An in-depth longevity consultation covers heart health, lipids, and diet, leading to bespoke lifestyle and diet plans. For face profiling, a carefully selected mixture of premium fillers is gently injected into the mid-face and peri-oral areas using advanced, safe techniques.',
    preparation:
      'A medical consultation with our longevity doctors assesses your metabolic health and aesthetic goals to create a personalised plan.',
    followup:
      'Mild redness, swelling, or bruising at injection sites settles within a few days. Avoid intense sun, heavy sports, and saunas for 24 to 48 hours after fillers.',
    startingPrice: 250,
  }),
  buildFaqSchema(LONGEVITY_FAQS),
  buildBreadcrumbSchema([
    { name: 'Treatments', href: '/treatments' },
    { name: 'Longevity Medicine' },
  ]),
];

export default function Page() {
  return (
    <>
      <JsonLd schema={schemas} />
      <LongevityMedicinePage />
    </>
  );
}
