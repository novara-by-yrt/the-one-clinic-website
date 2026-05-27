import type { Metadata } from 'next';
import GPHomeVisitsPage from './GPHomeVisitsPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/gp-home-visits-leicester' },
  title: 'GP Home Visits Leicester | Doctor to Your Door',
  description: 'Private GP home visits in Leicester. A qualified doctor comes to you, ideal for patients who are unwell, elderly, or unable to travel. Same-day visits availa…',
  openGraph: {
    title: 'GP Home Visits Leicester',
    description:
      'A qualified private GP comes to your home in Leicester. Same-day visits available for those unable to attend the clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GP Home Visits Leicester',
    description:
      'A qualified private GP comes to your home in Leicester. Same-day visits available for those unable to attend the clinic.',
  },
};

export default function Page() {
  return <GPHomeVisitsPage />;
}
