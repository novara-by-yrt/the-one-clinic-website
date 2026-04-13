import type { Metadata } from 'next';
import IVDripPage from './IVDripPage';

export const metadata: Metadata = {
  title: 'IV Drip Therapy Leicester | Vitamin Infusions | The One Clinic',
  description:
    'IV drip therapy in Leicester. Premium vitamin and nutrient infusions delivered directly into the bloodstream for rapid results at The One Clinic.',
  keywords: [
    'IV drip therapy Leicester',
    'IV drip Leicester',
    'vitamin infusion Leicester',
    'IV vitamin therapy Leicester',
    'nutrient infusion Leicester',
    'IV hydration Leicester',
  ],
  openGraph: {
    title: 'IV Drip Therapy Leicester | The One Clinic',
    description:
      'Expert IV drip therapy in Leicester. Premium vitamin and nutrient infusions for energy, immunity, and recovery at The One Clinic.',
  },
};

export default function Page() {
  return <IVDripPage />;
}
