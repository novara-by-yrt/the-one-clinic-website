import type { Metadata } from 'next';
import HydrafacialKeravivePage from './HydrafacialKeravivePage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/hydrafacial-keravive-leicester' },
  title: 'HydraFacial Keravive Leicester | Scalp & Hair Health',
  description:
    'HydraFacial Keravive in Leicester. Advanced scalp treatment to cleanse, stimulate, and nourish the scalp for healthier, fuller-looking hair at The One Clinic.',
  openGraph: {
    title: 'HydraFacial Keravive Leicester',
    description:
      'Expert HydraFacial Keravive scalp treatment in Leicester. Cleanse, stimulate, and nourish your scalp for healthier, fuller hair at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HydraFacial Keravive Leicester',
    description:
      'Expert HydraFacial Keravive scalp treatment in Leicester. Cleanse, stimulate, and nourish your scalp for healthier, fuller hair at The One Clinic.',
  },
};

export default function Page() {
  return <HydrafacialKeravivePage />;
}
