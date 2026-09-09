import type { Metadata } from 'next';
import JsonLd from '@/lib/schema/JsonLd';
import { buildClinicSchema } from '@/lib/schema/builders';
import V2Hero from '@/components/v2/V2Hero';
import V2Trust from '@/components/v2/V2Trust';
import V2Story from '@/components/v2/V2Story';
import V2Treatments from '@/components/v2/V2Treatments';
import V2Philosophy from '@/components/v2/V2Philosophy';
import V2Voices from '@/components/v2/V2Voices';
import V2Experts from '@/components/v2/V2Experts';
import V2Results from '@/components/v2/V2Results';
import V2Visit from '@/components/v2/V2Visit';
import V2Close from '@/components/v2/V2Close';
import '@/components/v2/v2-tokens.css';

export const metadata: Metadata = {
  title: 'The One Clinic - V2 Concept',
  // A design concept running alongside the live homepage and /v1. Kept
  // out of the index so it cannot compete with / for the same queries,
  // matching what /v1 already does.
  robots: { index: false, follow: false },
};

/**
 * V2 - a second full redesign of the homepage, built to sit beside the
 * live page and /v1 for comparison. None of the three shares components.
 *
 * The organising idea is a single sheet of paper with a hairline grid.
 * Every section header is left-aligned and hangs off a full-width rule,
 * which is what holds ten different layouts together without repeating
 * a layout family. Ink appears exactly twice, at the top and the
 * bottom, bracketing the paper rather than alternating with it.
 *
 * Information architecture is unchanged from the live homepage, section
 * for section, so this is a visual redesign and not a content one.
 */
export default function V2Page() {
  return (
    <div className="v2-root">
      <JsonLd schema={buildClinicSchema()} />

      {/* Ink */}
      <V2Hero />

      {/* Paper from here to the close */}
      <V2Trust />
      <V2Story />
      <V2Treatments />
      <V2Philosophy />
      <V2Voices />
      <V2Experts />
      <V2Results />
      <V2Visit />

      {/* Ink */}
      <V2Close />
    </div>
  );
}
