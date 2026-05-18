import type { Metadata } from 'next';
import HyperpigmentationPage from './HyperpigmentationPage';

export const metadata: Metadata = {
  title: 'Hyperpigmentation, Sun Damage & Freckles Treatment Leicester',
  description: 'Learn about hyperpigmentation, sun damage and freckles and effective treatment options. GMC-registered doctors at The One Clinic, Leicester offer personalise…',
  keywords: [
    'hyperpigmentation treatment Leicester',
    'sun damage treatment Leicester',
    'freckles treatment Leicester',
    'dark spots treatment Leicester',
    'age spots treatment Leicester',
    'uneven skin tone Leicester',
    'The One Clinic Leicester',
  ],
  openGraph: {
    title: 'Hyperpigmentation, Sun Damage & Freckles Treatment Leicester',
    description:
      'Treat hyperpigmentation, sun damage and freckles with personalised treatments at The One Clinic, Leicester. GMC-registered doctors, proven results.',
  },
};

export default function Page() {
  return <HyperpigmentationPage />;
}
