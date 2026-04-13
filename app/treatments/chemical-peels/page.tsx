import type { Metadata } from 'next';
import ChemicalPeelsPage from './ChemicalPeelsPage';

export const metadata: Metadata = {
  title: 'Chemical Peels Leicester | Skin Resurfacing Treatment | The One Clinic',
  description:
    'Chemical peels in Leicester. Expert skin resurfacing to improve texture, tone, pigmentation, and radiance. Superficial to medium-depth peels at The One Clinic.',
  keywords: [
    'chemical peels Leicester',
    'chemical peel treatment Leicester',
    'skin peel Leicester',
    'skin resurfacing Leicester',
    'pigmentation treatment Leicester',
    'skin rejuvenation Leicester',
  ],
  openGraph: {
    title: 'Chemical Peels Leicester | The One Clinic',
    description:
      'Expert chemical peels in Leicester. Improve skin texture, tone, and radiance with professional skin resurfacing at The One Clinic.',
  },
};

export default function Page() {
  return <ChemicalPeelsPage />;
}
