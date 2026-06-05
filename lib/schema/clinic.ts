import { CLINIC_INFO } from '@/lib/clinic-info';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://the-oneclinic.co.uk';

export const CLINIC = {
  name: CLINIC_INFO.name,
  url: SITE_URL,
  logo: `${SITE_URL}/images/LOGO.png`,
  telephone: CLINIC_INFO.phone.tel,
  address: {
    streetAddress: CLINIC_INFO.address.street,
    addressLocality: CLINIC_INFO.address.locality,
    postalCode: CLINIC_INFO.address.postalCode,
    addressCountry: CLINIC_INFO.address.country,
  },
  geo: { latitude: CLINIC_INFO.geo.lat, longitude: CLINIC_INFO.geo.lng },
  openingHours: CLINIC_INFO.hours
    .filter(h => h.open !== null && h.close !== null)
    .map(h => ({
      days: h.day === 'Monday' ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
          : h.day === 'Saturday' ? ['Saturday']
          : [],
      open: h.open,
      close: h.close,
    })).filter((h, i, a) => i === 0 || h.days[0] !== a[i-1].days[0]),
  priceRange: CLINIC_INFO.priceRange,
  sameAs: [CLINIC_INFO.social.facebook, CLINIC_INFO.social.instagram],
} as const;
