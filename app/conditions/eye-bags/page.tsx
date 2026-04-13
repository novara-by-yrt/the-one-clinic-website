import type { Metadata } from 'next';
import EyeBagsPage from './EyeBagsPage';

export const metadata: Metadata = {
  title: 'Eye Bags Treatment Leicester | Smooth & Refreshed Eyes | The One Clinic',
  description:
    'Expert eye bag treatment at The One Clinic, Leicester. Reduce puffiness and under-eye bags with personalised dermal filler and aesthetic treatments from GMC-registered doctors.',
  keywords: [
    'eye bags treatment Leicester',
    'under eye bags Leicester',
    'tear trough filler Leicester',
    'under eye filler Leicester',
    'eye bag removal Leicester',
    'under eye treatment Leicester',
    'puffy eyes treatment',
    'cosmetic treatment eye bags',
    'eye bag causes',
    'types of eye bags',
    'fluid eye bags',
    'fat eye bags',
    'The One Clinic Leicester',
  ],
  openGraph: {
    title: 'Eye Bags Treatment Leicester | The One Clinic',
    description:
      'Get rid of eye bags for a smooth and refreshed look with personalised treatments at The One Clinic, Leicester. GMC-registered doctors.',
  },
};

export default function Page() {
  return <EyeBagsPage />;
}
