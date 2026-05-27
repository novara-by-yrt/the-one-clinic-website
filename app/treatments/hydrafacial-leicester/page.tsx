import type { Metadata } from 'next';
import HydrafacialPage from './HydrafacialPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/hydrafacial-leicester' },
  title: 'HydraFacial Leicester | Deep Cleanse & Skin Hydration',
  description:
    'HydraFacial treatment in Leicester. Deep cleanse, exfoliate, extract, and hydrate your skin in a single session. Expert care at The One Clinic.',
  openGraph: {
    title: 'HydraFacial Leicester',
    description:
      'HydraFacial skin treatment in Leicester. Deep cleanse, exfoliation, and intense hydration in one session at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HydraFacial Leicester',
    description:
      'HydraFacial skin treatment in Leicester. Deep cleanse, exfoliation, and intense hydration in one session at The One Clinic.',
  },
};

export default function Page() {
  return <HydrafacialPage />;
}
