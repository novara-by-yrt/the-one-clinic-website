import type { Metadata } from 'next';
import HydrafacialPage from './HydrafacialPage';

export const metadata: Metadata = {
  title: 'HydraFacial Leicester | Deep Cleanse & Skin Hydration | The One Clinic',
  description:
    'HydraFacial treatment in Leicester. Deep cleanse, exfoliate, extract, and hydrate your skin in a single session. Expert care at The One Clinic.',
  keywords: [
    'HydraFacial Leicester',
    'hydrafacial treatment Leicester',
    'deep cleanse facial Leicester',
    'skin hydration treatment Leicester',
    'facial treatment Leicester',
    'HydraFacial near me',
  ],
  openGraph: {
    title: 'HydraFacial Leicester | The One Clinic',
    description:
      'HydraFacial skin treatment in Leicester. Deep cleanse, exfoliation, and intense hydration in one session at The One Clinic.',
  },
};

export default function Page() {
  return <HydrafacialPage />;
}
