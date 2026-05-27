import type { Metadata } from 'next';
import WeightManagementPage from './WeightManagementPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/weight-management-leicester' },
  title: 'Weight Management Leicester | Medical Weight Loss',
  description: 'Medically supervised weight management in Leicester. Personalised plans combining lifestyle coaching, nutrition guidance, and medical support to achieve last…',
  openGraph: {
    title: 'Weight Management Leicester',
    description:
      'Achieve lasting weight loss with a medically supervised programme tailored to you. Expert doctors and personalised plans at The One Clinic, Leicester.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weight Management Leicester',
    description:
      'Achieve lasting weight loss with a medically supervised programme tailored to you. Expert doctors and personalised plans at The One Clinic, Leicester.',
  },
};

export default function Page() {
  return <WeightManagementPage />;
}
