import type { Metadata } from 'next';
import CellDermaPage from './CellDermaPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/skincare-cellderma-leicester' },
  title: 'Best CellDerma Skincare in Leicester | The One Clinic',
  description:
    'Discover expert CellDerma skincare consultations in Leicester. Rejuvenate your complexion with bespoke medical-grade skincare.',
  openGraph: {
    title: 'Best CellDerma Skincare in Leicester | The One Clinic',
    description:
      'Discover expert CellDerma skincare consultations in Leicester. Rejuvenate your complexion with bespoke medical-grade skincare.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best CellDerma Skincare in Leicester | The One Clinic',
    description:
      'Discover expert CellDerma skincare consultations in Leicester. Rejuvenate your complexion with bespoke medical-grade skincare.',
  },
};

export default function Page() {
  return <CellDermaPage />;
}
