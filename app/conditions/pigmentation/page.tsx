import type { Metadata } from 'next';
import PigmentationPage from './PigmentationPage';

export const metadata: Metadata = {
  title: 'Pigmentation Treatment Leicester | Even, Clearer Skin | The One Clinic',
  description:
    'Learn about pigmentation and effective treatment options. GMC-registered doctors at The One Clinic, Leicester offer personalised treatments to reduce pigmentation and restore an even skin tone.',
  keywords: [
    'pigmentation treatment Leicester',
    'skin pigmentation Leicester',
    'uneven skin tone treatment Leicester',
    'dark spots treatment Leicester',
    'pigmentation laser Leicester',
    'skin brightening Leicester',
    'The One Clinic Leicester',
  ],
  openGraph: {
    title: 'Pigmentation Treatment Leicester | The One Clinic',
    description:
      'Reduce pigmentation and restore an even, clear complexion with personalised treatments at The One Clinic, Leicester. GMC-registered doctors, proven results.',
  },
};

export default function Page() {
  return <PigmentationPage />;
}
