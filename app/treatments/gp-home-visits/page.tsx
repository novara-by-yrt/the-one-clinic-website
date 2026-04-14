import type { Metadata } from 'next';
import GPHomeVisitsPage from './GPHomeVisitsPage';

export const metadata: Metadata = {
  title: 'GP Home Visits Leicester | Doctor to Your Door | The One Clinic',
  description:
    'Private GP home visits in Leicester. A qualified doctor comes to you, ideal for patients who are unwell, elderly, or unable to travel. Same-day visits available at The One Clinic.',
  keywords: [
    'GP home visits Leicester',
    'private doctor home visit Leicester',
    'home visit GP Leicester',
    'doctor home visit Leicester',
    'private GP visit at home',
    'same day home visit GP Leicester',
  ],
  openGraph: {
    title: 'GP Home Visits Leicester | The One Clinic',
    description:
      'A qualified private GP comes to your home in Leicester. Same-day visits available for those unable to attend the clinic.',
  },
};

export default function Page() {
  return <GPHomeVisitsPage />;
}
