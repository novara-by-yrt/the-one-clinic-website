import type { Metadata } from 'next';
import LaserMoleRemovalPage from './LaserMoleRemovalPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/laser-mole-removal' },
  title: 'Laser Mole Removal Leicester | Precise & Safe',
  description:
    'Laser mole removal in Leicester. Precise, safe removal of unwanted moles with minimal scarring by our expert clinical team at The One Clinic.',
  openGraph: {
    title: 'Laser Mole Removal Leicester',
    description:
      'Precise laser mole removal in Leicester. Expert treatment with minimal scarring and fast results at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Laser Mole Removal Leicester',
    description:
      'Precise laser mole removal in Leicester. Expert treatment with minimal scarring and fast results at The One Clinic.',
  },
};

export default function Page() {
  return <LaserMoleRemovalPage />;
}
