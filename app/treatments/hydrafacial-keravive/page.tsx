import type { Metadata } from 'next';
import HydrafacialKeravivePage from './HydrafacialKeravivePage';

export const metadata: Metadata = {
  title: 'HydraFacial Keravive Leicester | Scalp & Hair Health | The One Clinic',
  description:
    'HydraFacial Keravive in Leicester. Advanced scalp treatment to cleanse, stimulate, and nourish the scalp for healthier, fuller-looking hair at The One Clinic.',
  keywords: [
    'HydraFacial Keravive Leicester',
    'Keravive scalp treatment Leicester',
    'scalp health treatment Leicester',
    'hair loss treatment Leicester',
    'scalp rejuvenation Leicester',
    'HydraFacial hair Leicester',
  ],
  openGraph: {
    title: 'HydraFacial Keravive Leicester | The One Clinic',
    description:
      'Expert HydraFacial Keravive scalp treatment in Leicester. Cleanse, stimulate, and nourish your scalp for healthier, fuller hair at The One Clinic.',
  },
};

export default function Page() {
  return <HydrafacialKeravivePage />;
}
