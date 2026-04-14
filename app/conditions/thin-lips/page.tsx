import type { Metadata } from 'next';
import ThinLipsPage from './ThinLipsPage';

export const metadata: Metadata = {
  title: 'Thin Lips Treatment Leicester | Fuller, Natural-Looking Lips | The One Clinic',
  description:
    'Learn about thin lips and effective treatment options. GMC-registered doctors at The One Clinic, Leicester offer personalised lip filler and aesthetic treatments for natural, balanced results.',
  keywords: [
    'thin lips treatment Leicester',
    'lip filler Leicester',
    'lip enhancement Leicester',
    'lip augmentation Leicester',
    'natural lip filler Leicester',
    'lip volume Leicester',
    'The One Clinic Leicester',
  ],
  openGraph: {
    title: 'Thin Lips Treatment Leicester | The One Clinic',
    description:
      'Restore lip volume and definition with personalised treatments at The One Clinic, Leicester. GMC-registered doctors, natural-looking results.',
  },
};

export default function Page() {
  return <ThinLipsPage />;
}
