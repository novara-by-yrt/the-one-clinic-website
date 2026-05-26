import { treatments } from '@/data/treatments';
import { TEAM_MEMBERS } from '@/data/team';

export const dynamic = 'force-static';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.the-oneclinic.co.uk';

/**
 * Ordered by patient search volume / commercial intent.
 * Only slugs that exist in data/treatments.ts are resolved;
 * standalone-page treatments (profhilo, nctf-135-ha) are listed separately.
 */
const TOP_TREATMENT_SLUGS = [
  'endolift',
  'morpheus8',
  'dermal-fillers',
  'wrinkle-relaxing-injections',
  'weight-management',
  'private-gp',
  'laser-resurfacing',
  'hydrafacial',
  'body-contouring',
  'polynucleotides-leicester',
  'health-screening',
  'liposuction-leicester',
  'iv-drip-therapy',
];

const STANDALONE_TREATMENTS = [
  {
    slug: 'profhilo',
    title: 'Profhilo',
    desc: 'Bio-remodelling injectable for deep skin hydration and collagen stimulation.',
  },
  {
    slug: 'nctf-135-ha',
    title: 'NCTF 135 HA',
    desc: 'Microinjection cocktail of hyaluronic acid, vitamins, and amino acids for skin rejuvenation.',
  },
];

export async function GET() {
  const treatmentMap = new Map(treatments.map(t => [t.slug, t]));

  const treatmentLines = [
    ...TOP_TREATMENT_SLUGS
      .flatMap(slug => {
        const t = treatmentMap.get(slug);
        return t ? [`- [${t.title}](${SITE}/treatments/${slug}): ${t.shortDescription}`] : [];
      }),
    ...STANDALONE_TREATMENTS.map(
      t => `- [${t.title}](${SITE}/treatments/${t.slug}): ${t.desc}`,
    ),
  ].join('\n');

  const teamLines = TEAM_MEMBERS.map(m => {
    const path = m.profileUrl?.startsWith('/') ? m.profileUrl : `/our-team/${m.slug}`;
    return `- [${m.name}](${SITE}${path}): ${m.credentials} , ${m.role}`;
  }).join('\n');

  const body = `# The One Clinic
> Premium aesthetic and wellness clinic in Leicester offering clinician-led treatments including Endolift, Morpheus8, dermal fillers, laser resurfacing, weight management, and private GP services.

## Key pages
- [Homepage](${SITE}/): Clinician-led medical aesthetics and wellness in Leicester
- [All Treatments](${SITE}/treatments): Full list of aesthetic, medical, and wellness treatments
- [Our Team](${SITE}/our-team): Clinical team profiles and credentials
- [Contact & Booking](${SITE}/contact): Address, opening hours, and consultation booking
- [Patient Results](${SITE}/results): Before and after treatment gallery
- [Our Facilities](${SITE}/our-facilities): Treatment rooms and clinic environment

## Treatments
${treatmentLines}

## Clinical team
${teamLines}
`;

  return new Response(body.trim(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=86400',
    },
  });
}
