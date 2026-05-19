import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { treatments, getTreatmentBySlug } from '@/data/treatments';
import TreatmentTemplate from '@/components/sections/TreatmentTemplate/TreatmentTemplate';
import JsonLd from '@/lib/schema/JsonLd';
import {
  buildProcedureSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
} from '@/lib/schema/builders';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const treatment = getTreatmentBySlug(slug);

  if (!treatment) return { title: 'Treatment Not Found' };

  const canonical = `/treatments/${slug}`;
  const ogTitle = `${treatment.title} | The One Clinic`;
  const desc = treatment.shortDescription;

  return {
    title: treatment.title,
    description: desc,
    alternates: { canonical },
    openGraph: { title: ogTitle, description: desc, url: canonical, type: 'website' },
    twitter: { card: 'summary_large_image', title: ogTitle, description: desc },
  };
}

export default async function TreatmentPage({ params }: Props) {
  const { slug } = await params;
  const treatment = getTreatmentBySlug(slug);

  if (!treatment) notFound();

  const schemas: Record<string, unknown>[] = [
    buildProcedureSchema({
      name: treatment.title,
      description: treatment.shortDescription,
      category: treatment.category,
      slug,
      howPerformed: treatment.process?.[0]?.description,
      preparation: treatment.process?.find((s) => s.title.toLowerCase().includes('prep'))?.description,
    }),
    buildBreadcrumbSchema([
      { name: 'Treatments', href: '/treatments' },
      { name: treatment.title },
    ]),
  ];

  if (treatment.faq && treatment.faq.length > 0) {
    schemas.push(buildFaqSchema(treatment.faq));
  }

  return (
    <>
      <JsonLd schema={schemas} />
      <TreatmentTemplate treatment={treatment} />
    </>
  );
}
