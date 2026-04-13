import type { Metadata } from 'next';
import AcneScarRemovalPage from './AcneScarRemovalPage';

export const metadata: Metadata = {
  title: 'Acne Scar Removal Leicester | Advanced Skin Treatments | The One Clinic',
  description:
    'Acne scar removal in Leicester. Advanced laser, microneedling, and resurfacing treatments to reduce acne scars and restore smooth, confident skin at The One Clinic.',
  keywords: [
    'acne scar removal Leicester',
    'acne scar treatment Leicester',
    'acne scar laser Leicester',
    'acne scarring treatment Leicester',
    'skin resurfacing acne scars Leicester',
    'private acne scar clinic Leicester',
  ],
  openGraph: {
    title: 'Acne Scar Removal Leicester | The One Clinic',
    description:
      'Expert acne scar removal in Leicester. Advanced treatments to reduce scarring and restore smooth, radiant skin at The One Clinic.',
  },
};

export default function Page() {
  return <AcneScarRemovalPage />;
}
