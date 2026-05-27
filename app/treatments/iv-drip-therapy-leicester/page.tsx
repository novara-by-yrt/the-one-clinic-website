import type { Metadata } from 'next';
import IVDripPage from './IVDripPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/iv-drip-therapy-leicester' },
  title: 'IV Drip Therapy Leicester | Vitamin Infusions',
  description:
    'IV drip therapy in Leicester. Premium vitamin and nutrient infusions delivered directly into the bloodstream for rapid results at The One Clinic.',
  openGraph: {
    title: 'IV Drip Therapy Leicester',
    description:
      'Expert IV drip therapy in Leicester. Premium vitamin and nutrient infusions for energy, immunity, and recovery at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IV Drip Therapy Leicester',
    description:
      'Expert IV drip therapy in Leicester. Premium vitamin and nutrient infusions for energy, immunity, and recovery at The One Clinic.',
  },
};

export default function Page() {
  return <IVDripPage />;
}
