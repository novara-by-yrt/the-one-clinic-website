import type { Metadata } from 'next';
import CoolScarLiftPage from './CoolScarLiftPage';

export const metadata: Metadata = {
  title: 'Cool Scar Lift Leicester | Scar Reduction Treatment | The One Clinic',
  description:
    'Cool Scar Lift treatment in Leicester. Reduce the appearance of scars, improve skin texture, and restore confidence with expert care at The One Clinic.',
  keywords: [
    'Cool Scar Lift Leicester',
    'scar reduction Leicester',
    'scar treatment Leicester',
    'acne scar treatment Leicester',
    'scar revision Leicester',
    'non-surgical scar removal Leicester',
  ],
  openGraph: {
    title: 'Cool Scar Lift Leicester | The One Clinic',
    description:
      'Advanced Cool Scar Lift treatment in Leicester. Expert non-surgical scar reduction and skin resurfacing at The One Clinic.',
  },
};

export default function Page() {
  return <CoolScarLiftPage />;
}
