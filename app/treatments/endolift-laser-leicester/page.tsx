import type { Metadata } from 'next';
import EndoliftPage from './EndoliftPage';
import JsonLd from '@/lib/schema/JsonLd';
import {
  buildProcedureSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
  buildVideoSchema,
} from '@/lib/schema/builders';
import { ENDOLIFT_FAQS } from './data';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/endolift-laser-leicester' },
  title: 'Endolift Laser Leicester | Skin Lifting & Contouring',
  description: 'Endolift laser treatment in Leicester. Minimally invasive skin tightening and contouring for face, neck, jawline, and body. GMC-registered doctors at The One…',
  openGraph: {
    title: 'Endolift Laser Leicester',
    description:
      'Reveal firmer, smoother, contoured skin in just one Endolift session with minimal downtime at The One Clinic, Leicester.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Endolift Laser Leicester',
    description:
      'Reveal firmer, smoother, contoured skin in just one Endolift session with minimal downtime at The One Clinic, Leicester.',
  },
};

const schemas = [
  buildProcedureSchema({
    name: 'Endolift Laser',
    description:
      'Minimally invasive laser skin tightening for face, neck, and body that lifts, contours, and stimulates collagen without surgery.',
    category: 'Medical Aesthetics',
    slug: 'endolift',
    bodyLocation: 'Face, neck, jawline, abdomen, arms',
    howPerformed:
      'A fine laser fibre is inserted through a micro-entry point beneath the skin. Laser energy melts localised fat deposits and stimulates neocollagenesis, tightening and lifting the overlying tissue.',
    preparation:
      'Topical anaesthetic is applied 30 minutes before treatment. Patients should avoid blood-thinning medications and alcohol 48 hours prior.',
    followup:
      'Mild swelling and redness may persist for 2,5 days. Full results develop over 3,6 months as collagen remodelling occurs.',
    startingPrice: 1500,
  }),
  buildFaqSchema(ENDOLIFT_FAQS),
  buildBreadcrumbSchema([
    { name: 'Treatments', href: '/treatments' },
    { name: 'Endolift Laser' },
  ]),
  buildVideoSchema({
    name: 'Endolift Laser Treatment at The One Clinic Leicester',
    description:
      'See how the Endolift laser procedure works at The One Clinic, Leicester. Watch the minimally invasive skin tightening process for face, neck, and jawline.',
    wistiaId: '2u0e7sshum',
    thumbnailUrl: 'https://fast.wistia.net/embed/medias/2u0e7sshum/swatch',
    uploadDate: '2024-01-15',
    duration: 'PT2M',
    pagePath: '/treatments/endolift-laser-leicester',
  }),
];

export default function Page() {
  return (
    <>
      <JsonLd schema={schemas} />
      <EndoliftPage />
    </>
  );
}
