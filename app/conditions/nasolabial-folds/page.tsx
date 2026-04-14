import type { Metadata } from 'next';
import NasolabialFoldsPage from './NasolabialFoldsPage';

export const metadata: Metadata = {
  title: 'Nasolabial Folds Treatment Leicester | Smooth Smile Lines | The One Clinic',
  description:
    'Learn about nasolabial folds and effective treatment options. GMC-registered doctors at The One Clinic, Leicester offer personalised non-surgical treatments to smooth and soften smile lines.',
  keywords: [
    'nasolabial folds treatment Leicester',
    'smile lines treatment Leicester',
    'nose to mouth lines treatment',
    'dermal fillers nasolabial folds',
    'smile line filler Leicester',
    'facial rejuvenation Leicester',
    'The One Clinic Leicester',
  ],
  openGraph: {
    title: 'Nasolabial Folds Treatment Leicester | The One Clinic',
    description:
      'Smooth and soften smile lines with personalised nasolabial fold treatments at The One Clinic, Leicester. GMC-registered doctors, natural results.',
  },
};

export default function Page() {
  return <NasolabialFoldsPage />;
}
