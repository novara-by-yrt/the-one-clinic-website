import type { Metadata } from 'next';
import CellulitePage from './CellulitePage';

export const metadata: Metadata = {
  title: 'Cellulite Treatment Leicester | Smoother, Firmer Skin | The One Clinic',
  description:
    'Learn about cellulite and effective treatment options. GMC-registered doctors at The One Clinic, Leicester offer personalised body treatments to reduce cellulite and restore smoother, firmer skin.',
  keywords: [
    'cellulite treatment Leicester',
    'cellulite reduction Leicester',
    'body contouring Leicester',
    'Morpheus8 cellulite Leicester',
    'skin tightening Leicester',
    'body confidence Leicester',
    'The One Clinic Leicester',
  ],
  openGraph: {
    title: 'Cellulite Treatment Leicester | The One Clinic',
    description:
      'Reduce cellulite and restore smoother, firmer skin with personalised body treatments at The One Clinic, Leicester. GMC-registered doctors, proven results.',
  },
};

export default function Page() {
  return <CellulitePage />;
}
