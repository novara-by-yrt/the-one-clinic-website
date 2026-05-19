import type { Metadata } from 'next';
import WeakChinPage from './WeakChinPage';

export const metadata: Metadata = {
  title: 'Weak Chin & Jawline Treatment Leicester | Define & Contour',
  description: 'Learn about weak chin and jawline concerns and effective treatment options. GMC-registered doctors at The One Clinic, Leicester offer personalised non-surgic…',
  keywords: [
    'weak chin treatment Leicester',
    'chin filler Leicester',
    'jawline filler Leicester',
    'chin augmentation Leicester',
    'jawline contouring Leicester',
    'non-surgical chin augmentation',
    'The One Clinic Leicester',
  ],
  openGraph: {
    title: 'Weak Chin & Jawline Treatment Leicester',
    description:
      'Define and contour your chin and jawline with personalised non-surgical treatments at The One Clinic, Leicester. GMC-registered doctors, natural results.',
  },
};

export default function Page() {
  return <WeakChinPage />;
}
