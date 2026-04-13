import type { Metadata } from 'next';
import TravelVaccinePage from './TravelVaccinePage';

export const metadata: Metadata = {
  title: 'Travel Vaccines & Immunisations Leicester | The One Clinic',
  description:
    'Private travel vaccines and immunisations in Leicester. Expert travel health consultations, destination-specific advice, and all major travel jabs available at The One Clinic.',
  keywords: [
    'travel vaccines Leicester',
    'travel immunisations Leicester',
    'travel jabs Leicester',
    'private travel clinic Leicester',
    'travel health consultation Leicester',
    'yellow fever vaccine Leicester',
    'typhoid vaccine Leicester',
  ],
  openGraph: {
    title: 'Travel Vaccines & Immunisations Leicester | The One Clinic',
    description:
      'Stay protected on your travels. Expert travel health advice and all major travel vaccinations available at The One Clinic, Leicester.',
  },
};

export default function Page() {
  return <TravelVaccinePage />;
}
