import type { Metadata } from 'next';
import EyeBagsPage from './EyeBagsPage';

export const metadata: Metadata = {
  title: 'Eye Bags Treatment Leicester | The One Clinic',
  description:
    'Expert eye bag treatment at The One Clinic Leicester. Restore a refreshed, youthful appearance with dermal fillers and skin-strengthening treatments from our GMC-registered doctors.',
  keywords: [
    'eye bags treatment Leicester',
    'under eye filler Leicester',
    'tear trough filler Leicester',
    'eye bag removal Leicester',
    'under eye treatment',
    'cosmetic treatment eye bags',
  ],
  openGraph: {
    title: 'Eye Bags Treatment Leicester | The One Clinic',
    description:
      'Restore a refreshed, youthful appearance around the eyes with expert treatment at The One Clinic, Leicester.',
  },
};

export default function Page() {
  return <EyeBagsPage />;
}
