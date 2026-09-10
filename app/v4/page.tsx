import type { Metadata } from 'next';
import JsonLd from '@/lib/schema/JsonLd';
import { buildClinicSchema } from '@/lib/schema/builders';
import V4Hero from '@/components/v4/V4Hero';
import V4Spread, { type Spread } from '@/components/v4/V4Spread';
import '@/components/v4/v4-tokens.css';

export const metadata: Metadata = {
  title: 'The One Clinic - V4 Concept',
  // A design concept running alongside the live homepage, /v1, /v2 and
  // /v3. Kept out of the index so it cannot compete with / for the same
  // queries, matching what the other concept routes do.
  robots: { index: false, follow: false },
};

/**
 * V4 - the homepage as a magazine of spreads.
 *
 * The page opens on a wide centred hero over a full-bleed background
 * image, then settles into the spread template: a 1:1 image column
 * beside a text column of eyebrow, headline, body and one pill CTA,
 * each spread sized to read as one screen. The image side alternates
 * down the page, which is where the editorial rhythm comes from; the
 * template itself never varies. That is a deliberate inversion of how
 * /v2 and /v3 work, where no two sections share a layout.
 *
 * Copy is the live homepage's, unaltered. The headlines are set
 * uppercase in CSS rather than in these strings, so the wording here
 * still matches the homepage character for character.
 *
 * Grounds run ink, then light, then ink. The ink hero and ink closing
 * spread bracket the page, and the hero also gives the site header,
 * which renders white on transparent until the reader scrolls, a dark
 * band to sit on. Between them the light spreads alternate white and
 * off-white, which separates one spread from the next without leaving
 * the light family.
 */
const SPREADS: Spread[] = [
  {
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
  {
    eyebrow: 'Take the First Step',
    headline: 'Ready to Feel Your Best?',
    body: [
      'Our team is here to help. Book your consultation today and take control of your health and confidence.',
    ],
    cta: { label: 'Book Your Consultation' },
    image: {
      src: '/images/Juliane.jpg',
      alt: 'A patient of The One Clinic receiving an aesthetic treatment',
    },
    imageSide: 'right',
    tone: 'ink',
  },
];

const IDS = ['treatments', 'mission', 'clinic', 'reviews', 'results', 'book'];

export default function V4Page() {
  return (
    <div className="v4-root">
      <JsonLd schema={buildClinicSchema()} />

      <V4Hero />

      {SPREADS.map((spread, i) => (
        <V4Spread key={IDS[i]} id={IDS[i]} {...spread} />
      ))}
    </div>
  );
}
