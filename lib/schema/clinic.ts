export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://the-oneclinic.net';

export const CLINIC = {
  name: 'The One Clinic',
  url: SITE_URL,
  logo: `${SITE_URL}/images/LOGO.png`,
  telephone: '+447481342374',
  address: {
    streetAddress: '36 DeMontfort Street',
    addressLocality: 'Leicester',
    postalCode: 'LE1 7GS',
    addressCountry: 'GB',
  },
  geo: { latitude: 52.6272773, longitude: -1.1274381 },
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], open: '09:00', close: '18:00' },
    { days: ['Saturday'], open: '09:00', close: '16:00' },
    { days: ['Sunday'],   open: '09:00', close: '18:00' },
  ],
  priceRange: '££',
  sameAs: [
    'https://www.facebook.com/theoneclinic.uk',
    'https://www.instagram.com/theoneclinic.uk/',
  ],
} as const;
