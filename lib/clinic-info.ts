/**
 * Single source of truth for clinic NAP (Name, Address, Phone).
 * All locations must import from this file to maintain consistency across:
 * - Website UI (display formatting)
 * - Metadata & JSON-LD (E.164 / structured formats)
 * - SEO & local citations (must match Google Business Profile exactly)
 *
 * CRITICAL: Do NOT duplicate this data elsewhere.
 * Update this file only; all references will propagate automatically.
 */

export const CLINIC_INFO = {
  // Legal business name (for contracts, official documents)
  name: 'The One Clinic',

  // Phone , MUST match Google Business Profile and local citations
  phone: {
    // Display format: shown to users
    display: '07481 342 374',
    // Telephone link format: tel: links (E.164, no spaces or symbols)
    tel: '+447481342374',
    // Numeric format (no spaces, used in some links)
    digits: '07481342374',
  },

  // Email
  email: 'info@the-oneclinic.net',

  // Address , MUST match Google Business Profile
  address: {
    street: '36 DeMontfort Street',
    locality: 'Leicester',
    postalCode: 'LE1 7GS',
    country: 'GB', // ISO 3166-1 alpha-2
    // Formatted for display in footer/contact pages
    display: '36 DeMontfort Street, Leicester LE1 7GS',
    // Formatted for Google Maps embeds
    mapsQuery: '36+De+Montfort+St,+Leicester+LE1+7GS,+United+Kingdom',
  },

  // Geolocation (used for local SEO, Maps, structured data)
  geo: {
    lat: 52.6272773,
    lng: -1.1274381,
  },

  // Opening hours , normalized format
  hours: [
    { day: 'Monday',    open: '09:00', close: '18:00' },
    { day: 'Tuesday',   open: '09:00', close: '18:00' },
    { day: 'Wednesday', open: '09:00', close: '18:00' },
    { day: 'Thursday',  open: '09:00', close: '18:00' },
    { day: 'Friday',    open: '09:00', close: '18:00' },
    { day: 'Saturday',  open: '09:00', close: '16:00' },
    { day: 'Sunday',    open: '09:00', close: '18:00' },
  ],

  // Social media & professional profiles
  social: {
    facebook: 'https://www.facebook.com/theoneclinic.uk',
    instagram: 'https://www.instagram.com/theoneclinic.uk/',
  },

  // Price range indicator (for schema.org, aesthetic industry standard)
  priceRange: '££',
} as const;

/**
 * Helper: Format opening hours for display (e.g., "Monday , Friday: 09:00 , 18:00")
 */
export function formatHours(hours = CLINIC_INFO.hours) {
  const weekdays = hours.slice(0, 5);
  const saturday = hours[5];
  const sunday = hours[6];

  const weekdayStr = `Monday , Friday: ${weekdays[0].open} , ${weekdays[0].close}`;
  const satStr = `Saturday: ${saturday.open} , ${saturday.close}`;
  const sunStr = `Sunday: ${sunday.open} , ${sunday.close}`;

  return [weekdayStr, satStr, sunStr];
}

/**
 * Helper: Format hours as grouped display (e.g., for lead form)
 */
export function getHoursDisplay() {
  return [
    { days: 'Monday , Friday', time: `${CLINIC_INFO.hours[0].open} , ${CLINIC_INFO.hours[0].close}` },
    { days: 'Saturday',        time: `${CLINIC_INFO.hours[5].open} , ${CLINIC_INFO.hours[5].close}` },
    { days: 'Sunday',          time: `${CLINIC_INFO.hours[6].open} , ${CLINIC_INFO.hours[6].close}` },
  ];
}

/**
 * Helper: Generate Google Maps embed URL
 */
export function getMapsEmbedUrl() {
  return `https://maps.google.com/maps?q=${CLINIC_INFO.address.mapsQuery}&output=embed`;
}

/**
 * Helper: Generate Google Maps search URL
 */
export function getMapsSearchUrl() {
  return `https://www.google.com/maps/search/?api=1&query=${CLINIC_INFO.address.mapsQuery}`;
}
