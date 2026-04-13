import type { Metadata } from 'next';
import WeightManagementPage from './WeightManagementPage';

export const metadata: Metadata = {
  title: 'Weight Management Leicester | Medical Weight Loss | The One Clinic',
  description:
    'Medically supervised weight management in Leicester. Personalised plans combining lifestyle coaching, nutrition guidance, and medical support to achieve lasting results at The One Clinic.',
  keywords: [
    'weight management Leicester',
    'medical weight loss Leicester',
    'weight loss doctor Leicester',
    'private weight management Leicester',
    'supervised weight loss Leicester',
    'weight management clinic Leicester',
    'obesity treatment Leicester',
  ],
  openGraph: {
    title: 'Weight Management Leicester | The One Clinic',
    description:
      'Achieve lasting weight loss with a medically supervised programme tailored to you. Expert doctors and personalised plans at The One Clinic, Leicester.',
  },
};

export default function Page() {
  return <WeightManagementPage />;
}
