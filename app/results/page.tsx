import type { Metadata } from 'next';
import ResultsPage from './ResultsPage';

export const metadata: Metadata = {
  title: 'Real Transformations | The One Clinic Leicester',
  description:
    'See real before and after results from patients at The One Clinic Leicester — Lumecca Laser, Endolift, Laser Mole Removal, and more. Book your consultation today.',
};

export default function Page() {
  return <ResultsPage />;
}
