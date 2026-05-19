import type { Metadata } from 'next';
import TravelVaccinePage from './TravelVaccinePage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/travel-vaccine' },
  title: 'Travel Vaccines & Immunisations Leicester',
  description: 'Private travel vaccines and immunisations in Leicester. Expert travel health consultations, destination-specific advice, and all major travel jabs available…',
  openGraph: {
    title: 'Travel Vaccines & Immunisations Leicester',
    description:
      'Stay protected on your travels. Expert travel health advice and all major travel vaccinations available at The One Clinic, Leicester.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel Vaccines & Immunisations Leicester',
    description:
      'Stay protected on your travels. Expert travel health advice and all major travel vaccinations available at The One Clinic, Leicester.',
  },
};

export default function Page() {
  return <TravelVaccinePage />;
}
