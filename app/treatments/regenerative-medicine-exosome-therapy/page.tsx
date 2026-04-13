import type { Metadata } from 'next';
import ExosomeTherapyPage from './ExosomeTherapyPage';

export const metadata: Metadata = {
  title: 'Exosome Therapy Leicester | Regenerative Medicine | The One Clinic',
  description:
    'Exosome therapy in Leicester. Advanced regenerative medicine to stimulate skin repair, collagen production, and cellular renewal at The One Clinic.',
  keywords: [
    'exosome therapy Leicester',
    'regenerative medicine Leicester',
    'exosome skin treatment Leicester',
    'exosome facial Leicester',
    'cellular regeneration Leicester',
    'skin regeneration Leicester',
  ],
  openGraph: {
    title: 'Exosome Therapy Leicester | The One Clinic',
    description:
      'Expert exosome therapy in Leicester. Cutting-edge regenerative medicine to restore skin health and stimulate natural repair at The One Clinic.',
  },
};

export default function Page() {
  return <ExosomeTherapyPage />;
}
