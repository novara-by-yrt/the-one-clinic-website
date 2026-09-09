import type { Metadata } from 'next';
import JsonLd from '@/lib/schema/JsonLd';
import { buildClinicSchema } from '@/lib/schema/builders';
import V3Hero from '@/components/v3/V3Hero';
import V3Proof from '@/components/v3/V3Proof';
import V3Story from '@/components/v3/V3Story';
import V3Treatments from '@/components/v3/V3Treatments';
import V3Philosophy from '@/components/v3/V3Philosophy';
import V3Testimonials from '@/components/v3/V3Testimonials';
import V3Experts from '@/components/v3/V3Experts';
import V3Results from '@/components/v3/V3Results';
import V3Contact from '@/components/v3/V3Contact';
import V3FinalCTA from '@/components/v3/V3FinalCTA';
import '@/components/v3/v3-tokens.css';

export const metadata: Metadata = {
  title: 'The One Clinic - V3 Concept',
  // A design concept running alongside the live homepage, /v1 and /v2.
  // Kept out of the index so it cannot compete with / for the same
  // queries, matching what the other concept routes do.
  robots: { index: false, follow: false },
};

/**
 * V3 - a third homepage concept, in an editorial lifestyle-publication
 * register rather than a clinic-commercial one.
 *
 * Every visible string is the live homepage's, unchanged. Only layout,
 * spacing, imagery treatment and styling differ, so this is a pure
 * visual redesign and the two pages can be compared like for like.
 *
 * The language: a full-bleed scrimmed hero, then a rhythm of contained
 * two-thirds headers against full-width card grids, with the philosophy
 * pillars as alternating image and text spreads. One radius, one CTA
 * treatment, one desaturation pass over all photography, and whitespace
 * as the main carrier of the premium feel. Ink appears twice, at the
 * hero and the close.
 *
 * Section order matches the live homepage exactly.
 */
export default function V3Page() {
  return (
    <div className="v3-root">
      <JsonLd schema={buildClinicSchema()} />

      <V3Hero />
      <V3Proof />
      <V3Story />
      <V3Treatments />
      <V3Philosophy />
      <V3Testimonials />
      <V3Experts />
      <V3Results />
      <V3Contact />
      <V3FinalCTA />
    </div>
  );
}
