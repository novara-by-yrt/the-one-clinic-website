import type { Metadata } from 'next';
import BodyConfidencePage from './BodyConfidencePage';

export const metadata: Metadata = {
  title: 'The Body Confidence Package Leicester | Aesthetic Treatments | The One Clinic',
  description:
    'The Body Confidence Package in Leicester. A curated combination of aesthetic treatments to help you look and feel your very best at The One Clinic.',
  keywords: [
    'body confidence package Leicester',
    'body contouring package Leicester',
    'aesthetic package Leicester',
    'body transformation Leicester',
    'weight loss treatment Leicester',
    'body sculpting Leicester',
  ],
  openGraph: {
    title: 'The Body Confidence Package Leicester | The One Clinic',
    description:
      'Transform how you look and feel with The Body Confidence Package at The One Clinic Leicester, a curated combination of expert aesthetic treatments.',
  },
};

export default function Page() {
  return <BodyConfidencePage />;
}
