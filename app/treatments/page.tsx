import type { Metadata } from 'next';
import { treatments } from '@/data/treatments';
import TreatmentsListing from '@/components/sections/TreatmentsListing/TreatmentsListing';

export const metadata: Metadata = {
  title: 'Treatments',
  description:
    'Explore our full range of clinician-led aesthetic and wellness treatments, from anti-wrinkle and dermal fillers to laser resurfacing, hair restoration, body contouring, and IV wellness therapy.',
};

export default function TreatmentsPage() {
  return <TreatmentsListing treatments={treatments} />;
}
