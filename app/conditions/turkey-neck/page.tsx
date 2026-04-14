import type { Metadata } from 'next';
import TurkeyNeckPage from './TurkeyNeckPage';

export const metadata: Metadata = {
  title: 'Turkey Neck & Necklines Treatment Leicester | Tighten & Smooth | The One Clinic',
  description:
    'Learn about turkey neck and necklines and effective treatment options. GMC-registered doctors at The One Clinic, Leicester offer personalised non-surgical treatments to tighten and smooth the neck.',
  keywords: [
    'turkey neck treatment Leicester',
    'neck tightening Leicester',
    'neckline treatment Leicester',
    'loose neck skin treatment',
    'neck wrinkles treatment Leicester',
    'non-surgical neck lift Leicester',
    'The One Clinic Leicester',
  ],
  openGraph: {
    title: 'Turkey Neck & Necklines Treatment Leicester | The One Clinic',
    description:
      'Tighten and smooth loose neck skin with personalised non-surgical treatments at The One Clinic, Leicester. GMC-registered doctors, natural results.',
  },
};

export default function Page() {
  return <TurkeyNeckPage />;
}
