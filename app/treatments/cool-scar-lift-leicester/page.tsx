import type { Metadata } from 'next';
import CoolScarLiftPage from './CoolScarLiftPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/cool-scar-lift-leicester' },
  title: 'Cool Scar Lift Leicester | Scar Reduction Treatment',
  description:
    'Cool Scar Lift treatment in Leicester. Reduce the appearance of scars, improve skin texture, and restore confidence with expert care at The One Clinic.',
  openGraph: {
    title: 'Cool Scar Lift Leicester',
    description:
      'Advanced Cool Scar Lift treatment in Leicester. Expert non-surgical scar reduction and skin resurfacing at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cool Scar Lift Leicester',
    description:
      'Advanced Cool Scar Lift treatment in Leicester. Expert non-surgical scar reduction and skin resurfacing at The One Clinic.',
  },
};

export default function Page() {
  return <CoolScarLiftPage />;
}
