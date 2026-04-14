import type { Metadata } from 'next';
import StretchMarksPage from './StretchMarksPage';

export const metadata: Metadata = {
  title: 'Stretch Marks Treatment Leicester | Smoother, Clearer Skin | The One Clinic',
  description:
    'Learn about stretch marks and effective treatment options. GMC-registered doctors at The One Clinic, Leicester offer personalised treatments to reduce stretch marks and restore smoother skin.',
  keywords: [
    'stretch marks treatment Leicester',
    'stretch mark removal Leicester',
    'striae treatment Leicester',
    'Morpheus8 stretch marks Leicester',
    'laser stretch marks Leicester',
    'skin resurfacing Leicester',
    'The One Clinic Leicester',
  ],
  openGraph: {
    title: 'Stretch Marks Treatment Leicester | The One Clinic',
    description:
      'Reduce stretch marks and restore smoother, clearer skin with personalised treatments at The One Clinic, Leicester. GMC-registered doctors, proven results.',
  },
};

export default function Page() {
  return <StretchMarksPage />;
}
