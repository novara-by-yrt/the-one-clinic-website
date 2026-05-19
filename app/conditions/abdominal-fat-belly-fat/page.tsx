import type { Metadata } from 'next';
import AbdominalFatPage from './AbdominalFatPage';

export const metadata: Metadata = {
  title: 'Abdominal Fat & Belly Fat Treatment Leicester',
  description: 'Learn about abdominal fat and belly fat and effective treatment options. GMC-registered doctors at The One Clinic, Leicester offer personalised body contouri…',
  keywords: [
    'abdominal fat treatment Leicester',
    'belly fat treatment Leicester',
    'stomach fat reduction Leicester',
    'body contouring Leicester',
    'non-surgical fat removal Leicester',
    'liposuction Leicester',
    'The One Clinic Leicester',
  ],
  openGraph: {
    title: 'Abdominal Fat & Belly Fat Treatment Leicester',
    description:
      'Reduce stubborn abdominal fat with personalised body contouring treatments at The One Clinic, Leicester. GMC-registered doctors, proven results.',
  },
};

export default function Page() {
  return <AbdominalFatPage />;
}
