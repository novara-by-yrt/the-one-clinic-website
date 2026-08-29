import type { Metadata } from 'next';
import JsonLd from '@/lib/schema/JsonLd';
import { buildClinicSchema } from '@/lib/schema/builders';
import V1Section, { surfaceAt } from '@/components/v1/V1Section';
import V1Heading from '@/components/v1/V1Heading';
import V1Hero from '@/components/v1/V1Hero';
import V1Logos from '@/components/v1/V1Logos';
import V1Video from '@/components/v1/V1Video';
import V1Treatments from '@/components/v1/V1Treatments';
import V1Philosophy from '@/components/v1/V1Philosophy';
import V1Testimonials from '@/components/v1/V1Testimonials';
import V1Experts from '@/components/v1/V1Experts';
import V1Results from '@/components/v1/V1Results';
import V1Contact from '@/components/v1/V1Contact';
import V1FinalCTA from '@/components/v1/V1FinalCTA';
import '@/components/v1/v1-tokens.css';

export const metadata: Metadata = {
  title: 'The One Clinic — V1 Concept',
  // A design concept running in parallel with the live homepage; keeping it
  // out of the index avoids competing with / for the same queries.
  robots: { index: false, follow: false },
};

/**
 * V1 — a full redesign of the homepage.
 *
 * Surfaces run black → gray → white and repeat, so `surfaceAt(i)` is the
 * single source of that rhythm: reorder or insert a section and the
 * sequence stays correct without touching any colour by hand. The hero
 * owns its own full-bleed treatment and starts the cycle at black.
 */
export default function V1Page() {
  return (
    <div className="v1-root">
      <JsonLd schema={buildClinicSchema()} />

      {/* 0 — black */}
      <V1Hero />

      {/* 1 — gray */}
      <V1Section surface={surfaceAt(1)} label="Accreditations" wide>
        <V1Logos />
      </V1Section>

      {/* 2 — white */}
      <V1Section surface={surfaceAt(2)} seam>
        <V1Heading
          chip="See It For Yourself"
          title="Our Story &amp; Real Patient"
          accent="Results"
          sub="Hear directly from our founder and the patients whose lives we've helped transform."
        />
        <V1Video />
      </V1Section>

      {/* 3 — black */}
      <V1Section surface={surfaceAt(3)} id="treatments">
        <V1Heading
          chip="Medical Aesthetics &amp; Health Care"
          title="Our Popular"
          accent="Treatments"
          sub="Advanced aesthetic and health treatments, all under one roof, tailored to your goals by our qualified doctors."
        />
        <V1Treatments />
      </V1Section>

      {/* 4 — gray */}
      <V1Section surface={surfaceAt(4)}>
        <V1Philosophy />
      </V1Section>

      {/* 5 — white */}
      <V1Section surface={surfaceAt(5)} seam>
        <V1Heading
          chip="Patient Voices"
          title="What Our Patients"
          accent="Say"
          sub="Real reviews from people we have cared for at our Leicester clinic."
        />
        <V1Testimonials />
      </V1Section>

      {/* 6 — black */}
      <V1Section surface={surfaceAt(6)}>
        <V1Heading
          chip="Our Team"
          title="Meet The"
          accent="Experts"
          sub="Consultants, GPs and clinicians bringing decades of NHS and private practice to every appointment."
        />
        <V1Experts />
      </V1Section>

      {/* 7 — gray */}
      <V1Section surface={surfaceAt(7)} id="results">
        <V1Heading
          chip="Patient Outcomes"
          title="Real"
          accent="Transformations"
          sub="Helping patients achieve confidence and long-term results, one personalised treatment at a time."
        />
        <V1Results />
      </V1Section>

      {/* 8 — white */}
      <V1Section surface={surfaceAt(8)} id="contact" seam>
        <V1Heading
          chip="Get In Touch"
          title="Visit The One"
          accent="Clinic"
          sub="Find us in the centre of Leicester. Call, email or book online — we will take it from there."
        />
        <V1Contact />
      </V1Section>

      {/* 9 — black */}
      <V1Section surface={surfaceAt(9)}>
        <V1FinalCTA />
      </V1Section>
    </div>
  );
}
