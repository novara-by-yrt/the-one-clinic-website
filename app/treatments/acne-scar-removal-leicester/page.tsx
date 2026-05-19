import type { Metadata } from 'next';
import AcneScarRemovalPage from './AcneScarRemovalPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/acne-scar-removal-leicester' },
  title: 'Acne Scar Removal Leicester | Advanced Skin Treatments',
  description: 'Acne scar removal in Leicester. Advanced laser, microneedling, and resurfacing treatments to reduce acne scars and restore smooth, confident skin at The One…',
  openGraph: {
    title: 'Acne Scar Removal Leicester',
    description:
      'Expert acne scar removal in Leicester. Advanced treatments to reduce scarring and restore smooth, radiant skin at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Acne Scar Removal Leicester',
    description:
      'Expert acne scar removal in Leicester. Advanced treatments to reduce scarring and restore smooth, radiant skin at The One Clinic.',
  },
};

export default function Page() {
  return <AcneScarRemovalPage />;
}
