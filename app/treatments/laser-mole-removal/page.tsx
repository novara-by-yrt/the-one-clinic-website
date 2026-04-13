import type { Metadata } from 'next';
import LaserMoleRemovalPage from './LaserMoleRemovalPage';

export const metadata: Metadata = {
  title: 'Laser Mole Removal Leicester | Precise & Safe | The One Clinic',
  description:
    'Laser mole removal in Leicester. Precise, safe removal of unwanted moles with minimal scarring by our expert clinical team at The One Clinic.',
  keywords: [
    'laser mole removal Leicester',
    'mole removal Leicester',
    'laser mole treatment Leicester',
    'mole removal clinic Leicester',
    'private mole removal Leicester',
    'safe mole removal Leicester',
  ],
  openGraph: {
    title: 'Laser Mole Removal Leicester | The One Clinic',
    description:
      'Precise laser mole removal in Leicester. Expert treatment with minimal scarring and fast results at The One Clinic.',
  },
};

export default function Page() {
  return <LaserMoleRemovalPage />;
}
