import type { Metadata } from 'next';
import BodyConfidencePage from './BodyConfidencePage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/the-body-confidence-package' },
  title: 'The Body Confidence Package Leicester | Aesthetic Treatments',
  description:
    'The Body Confidence Package in Leicester. A curated combination of aesthetic treatments to help you look and feel your very best at The One Clinic.',
  openGraph: {
    title: 'The Body Confidence Package Leicester',
    description:
      'Transform how you look and feel with The Body Confidence Package at The One Clinic Leicester, a curated combination of expert aesthetic treatments.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Body Confidence Package Leicester',
    description:
      'Transform how you look and feel with The Body Confidence Package at The One Clinic Leicester, a curated combination of expert aesthetic treatments.',
  },
};

export default function Page() {
  return <BodyConfidencePage />;
}
