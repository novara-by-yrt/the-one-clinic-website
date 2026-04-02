import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { treatments, getTreatmentBySlug } from '@/data/treatments';
import TreatmentTemplate from '@/components/sections/TreatmentTemplate/TreatmentTemplate';

// ── Types ────────────────────────────────────────────────────────
interface Props {
  params: Promise<{ slug: string }>;
}

// ── Static generation ────────────────────────────────────────────
export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

// ── SEO ──────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const treatment = getTreatmentBySlug(slug);

  if (!treatment) {
    return { title: 'Treatment Not Found' };
  }

  return {
    title: treatment.title,
    description: treatment.shortDescription,
  };
}

// ── Page ─────────────────────────────────────────────────────────
export default async function TreatmentPage({ params }: Props) {
  const { slug } = await params;
  const treatment = getTreatmentBySlug(slug);

  if (!treatment) {
    notFound();
  }

  return <TreatmentTemplate treatment={treatment} />;
}
