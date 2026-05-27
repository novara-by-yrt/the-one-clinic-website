import type { Metadata } from 'next';
import ChemicalPeelsPage from './ChemicalPeelsPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/chemical-peels-leicester' },
  title: 'Chemical Peels Leicester | Skin Resurfacing Treatment',
  description:
    'Chemical peels in Leicester. Expert skin resurfacing to improve texture, tone, pigmentation, and radiance. Superficial to medium-depth peels at The One Clinic.',
  openGraph: {
    title: 'Chemical Peels Leicester',
    description:
      'Expert chemical peels in Leicester. Improve skin texture, tone, and radiance with professional skin resurfacing at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chemical Peels Leicester',
    description:
      'Expert chemical peels in Leicester. Improve skin texture, tone, and radiance with professional skin resurfacing at The One Clinic.',
  },
};

export default function Page() {
  return <ChemicalPeelsPage />;
}
