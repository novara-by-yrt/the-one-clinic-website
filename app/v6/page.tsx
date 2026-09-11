import type { Metadata } from 'next';
import JsonLd from '@/lib/schema/JsonLd';
import { buildClinicSchema } from '@/lib/schema/builders';
import V6Stage from '@/components/v6/V6Stage';
import V6HeroPanel from '@/components/v6/V6HeroPanel';
import V6Panel, { type Panel } from '@/components/v6/V6Panel';
import V6ClosingPanel from '@/components/v6/V6ClosingPanel';
import '@/components/v6/v6-tokens.css';

export const metadata: Metadata = {
  title: 'The One Clinic - V6 Concept',
  // A design concept running alongside the live homepage, /v1, /v2 and
  // /v3. Kept out of the index so it cannot compete with / for the same
  // queries, matching what the other concept routes do.
  robots: { index: false, follow: false },
};

/**
 * V6 - the homepage as a magazine that flips sideways.
 *
 * On tablet-landscape and up the sections are planes stacked in depth on
 * a fixed stage: scrolling lifts the one in front up and away, tilting
 * it back past the camera, while the next rises out of depth and zooms
 * into its place. Below that the stage collapses to an ordinary page
 * with each section's image on top and its text beneath. See V6Stage and
 * v6-tokens.css for the mechanics.
 *
 * Panel 1 is the cover: centred copy over a full-bleed image. Panels 2
 * to 6 are the spread template, a 1:1 image column beside a text column,
 * alternating which side the image sits on. Panel 7 closes the magazine
 * and carries the site footer's content, because the stage ends on that
 * section rather than on a strip below the page.
 *
 * Copy is the live homepage's, unaltered. The headlines are set
 * uppercase in CSS rather than in these strings, so the wording here
 * still matches the homepage character for character.
 */
const PANELS: (Panel & { id: string })[] = [
  {
    id: 'treatments',
    eyebrow: 'Medical Aesthetics & Health Care',
    headline: 'Our Popular Treatments',
    body: [
      'Advanced aesthetic and health treatments, all under one roof, tailored to your goals by our qualified doctors.',
    ],
    cta: { label: 'Explore all treatments', href: '/treatments' },
    image: {
      src: '/images/LumeccaIPL1.png',
      alt: 'A Lumecca IPL handpiece in use at The One Clinic',
    },
    imageSide: 'left',
    tone: 'paper',
  },
  {
    id: 'mission',
    eyebrow: 'Our Mission',
    headline: 'A Fresh Perspective on Aesthetics & Well-being',
    body: [
      'We bring an honest, open approach to aesthetic medicine and health in Leicester, working closely with every patient to help them achieve their goals. Our mission is to empower you to become the version of yourself you are truly happy with.',
    ],
    cta: { label: 'Book a Consultation' },
    image: {
      src: '/images/Doctor1.jpg',
      alt: 'A clinician at The One Clinic treating a patient',
    },
    imageSide: 'right',
    tone: 'paperAlt',
  },
  {
    id: 'clinic',
    eyebrow: 'Our Clinic',
    headline: 'A Space Built Entirely Around You',
    body: [
      'Step into our state-of-the-art clinic and discover modern medical equipment within a relaxing, luxurious setting. Every visit is a bespoke experience centred on your needs, delivering innovative treatments using the most advanced techniques available.',
    ],
    cta: { label: 'Book a Consultation' },
    image: {
      src: '/images/Team Image.jpg',
      alt: 'The team at The One Clinic in Leicester',
    },
    imageSide: 'left',
    tone: 'paper',
  },
  {
    id: 'reviews',
    eyebrow: 'Loved by Thousands',
    headline: 'What Our Customers Say',
    body: [
      "Don't just take our word for it. Here's what real patients have to say about their experience at The One Clinic.",
    ],
    cta: { label: 'Book a Consultation' },
    image: {
      src: '/images/IV drip therapy1.png',
      alt: 'A patient of The One Clinic after IV drip therapy',
    },
    imageSide: 'right',
    tone: 'paperAlt',
  },
  {
    id: 'results',
    eyebrow: 'Patient Outcomes',
    headline: 'Real Transformations',
    body: [
      'Helping patients achieve confidence and long-term results, one personalised treatment at a time.',
    ],
    cta: { label: 'View More Results', href: '/results' },
    image: {
      // A "B-A" filename rather than a "Before & After" one: Next 16's
      // image optimizer reads the `&` in a local path as the start of a
      // query string and returns 400.
      src: '/images/Endolift B-A.jpg',
      alt: 'Endolift before and after results',
    },
    imageSide: 'left',
    tone: 'paper',
  },
];

// Cover + spreads + closing panel.
const TOTAL = PANELS.length + 2;

export default function V6Page() {
  return (
    <div className="v6-root">
      <JsonLd schema={buildClinicSchema()} />

      <V6Stage count={TOTAL}>
        <V6HeroPanel id="cover" section={0} />

        {PANELS.map((panel, i) => (
          // The cover plus the next two load eagerly: at zoom-stack
          // speed a section arrives from half size to full in well under
          // a second, and a blank plane rushing at the reader is very
          // visible.
          <V6Panel key={panel.id} {...panel} eager={i <= 1} section={i + 1} />
        ))}

        <V6ClosingPanel id="visit" section={TOTAL - 1} />
      </V6Stage>
    </div>
  );
}
