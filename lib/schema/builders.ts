import { CLINIC, SITE_URL } from './clinic';

// ── Shared clinic reference used as worksFor / provider ─────────
const clinicRef = {
  '@type': 'MedicalBusiness',
  '@id': `${SITE_URL}/#clinic`,
  name: CLINIC.name,
  url: CLINIC.url,
};

// ── 1. MedicalBusiness + LocalBusiness (homepage) ───────────────
export function buildClinicSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['MedicalBusiness', 'LocalBusiness'],
    '@id': `${SITE_URL}/#clinic`,
    name: CLINIC.name,
    url: CLINIC.url,
    logo: CLINIC.logo,
    image: CLINIC.logo,
    telephone: CLINIC.telephone,
    priceRange: CLINIC.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CLINIC.address.streetAddress,
      addressLocality: CLINIC.address.addressLocality,
      postalCode: CLINIC.address.postalCode,
      addressCountry: CLINIC.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: CLINIC.geo.latitude,
      longitude: CLINIC.geo.longitude,
    },
    openingHoursSpecification: CLINIC.openingHours.flatMap(({ days, open, close }) =>
      days.map((day) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${day}`,
        opens: open,
        closes: close,
      }))
    ),
    sameAs: CLINIC.sameAs,
    aggregateRating: [
      {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '120',
        name: 'Google Reviews',
        ratingExplanation: 'Based on Google patient reviews',
      },
      {
        '@type': 'AggregateRating',
        ratingValue: '4.7',
        reviewCount: '140',
        name: 'Trustpilot',
        ratingExplanation: 'Based on Trustpilot patient reviews',
      },
    ],
  };
}

// ── 2. MedicalProcedure ─────────────────────────────────────────
interface ProcedureOptions {
  name: string;
  description: string;
  category: string;
  slug: string;
  howPerformed?: string;
  preparation?: string;
  followup?: string;
  bodyLocation?: string;
  image?: string;
  startingPrice?: number;
}

export function buildProcedureSchema(opts: ProcedureOptions) {
  const canonical = `${SITE_URL}/treatments/${opts.slug}`;
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    '@id': `${canonical}#procedure`,
    name: opts.name,
    description: opts.description,
    url: canonical,
    procedureType: 'https://schema.org/TherapeuticProcedure',
    provider: clinicRef,
    ...(opts.bodyLocation   && { bodyLocation: opts.bodyLocation }),
    ...(opts.howPerformed   && { howPerformed: opts.howPerformed }),
    ...(opts.preparation    && { preparation: opts.preparation }),
    ...(opts.followup       && { followup: opts.followup }),
    ...(opts.image          && { image: opts.image.startsWith('http') ? opts.image : `${SITE_URL}${opts.image}` }),
  };

  if (opts.startingPrice !== undefined) {
    schema.offers = {
      '@type': 'Offer',
      price: String(opts.startingPrice),
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      url: canonical,
      seller: clinicRef,
    };
  }

  return schema;
}

// ── 3. FAQPage ──────────────────────────────────────────────────
export function buildFaqSchema(faq: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };
}

// ── 4. BreadcrumbList ───────────────────────────────────────────
export function buildBreadcrumbSchema(
  crumbs: { name: string; href?: string }[]
) {
  const withHome = [{ name: 'Home', href: '/' }, ...crumbs];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: withHome.map(({ name, href }, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      ...(href ? { item: href.startsWith('http') ? href : `${SITE_URL}${href}` } : {}),
    })),
  };
}

// ── 5. Physician ────────────────────────────────────────────────
interface PhysicianOptions {
  name: string;
  role: string;
  credentials: string;       // e.g. "MBBS, MRCGP"
  image?: string;
  bio: string;               // first paragraph of bio
  medicalSpecialty?: string;
  profilePath: string;       // e.g. /team/dr-sumit-virmani
}

export function buildPhysicianSchema(opts: PhysicianOptions) {
  const profileUrl = `${SITE_URL}${opts.profilePath}`;
  const credList = opts.credentials
    .split(',')
    .map((c) => c.trim())
    .filter(Boolean)
    .map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: c,
    }));

  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    '@id': `${profileUrl}#physician`,
    name: opts.name,
    jobTitle: opts.role,
    url: profileUrl,
    description: opts.bio,
    ...(opts.image && {
      image: opts.image.startsWith('http') ? opts.image : `${SITE_URL}${opts.image}`,
    }),
    ...(opts.medicalSpecialty && { medicalSpecialty: opts.medicalSpecialty }),
    ...(credList.length > 0 && { hasCredential: credList }),
    worksFor: clinicRef,
    memberOf: {
      '@type': 'MedicalOrganization',
      name: CLINIC.name,
      url: SITE_URL,
    },
  };
}

// ── 6. VideoObject (Wistia) ─────────────────────────────────────
interface VideoOptions {
  name: string;
  description: string;
  wistiaId: string;
  thumbnailUrl: string;
  uploadDate: string;        // ISO 8601 e.g. "2024-01-15"
  duration?: string;         // ISO 8601 e.g. "PT2M30S"
  pagePath: string;
}

export function buildVideoSchema(opts: VideoOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: opts.name,
    description: opts.description,
    thumbnailUrl: opts.thumbnailUrl,
    uploadDate: opts.uploadDate,
    ...(opts.duration && { duration: opts.duration }),
    embedUrl: `https://fast.wistia.net/embed/iframe/${opts.wistiaId}`,
    contentUrl: `https://fast.wistia.net/embed/iframe/${opts.wistiaId}`,
    url: `${SITE_URL}${opts.pagePath}`,
    publisher: clinicRef,
  };
}
