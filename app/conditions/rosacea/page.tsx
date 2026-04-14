import type { Metadata } from 'next';
import RosaceaPage from './RosaceaPage';

export const metadata: Metadata = {
  title: 'Facial Redness & Rosacea Treatment Leicester | Calm & Clear Skin | The One Clinic',
  description:
    'Learn about facial redness and rosacea and effective treatment options. GMC-registered doctors at The One Clinic, Leicester offer personalised treatments to calm redness and restore even skin tone.',
  keywords: [
    'rosacea treatment Leicester',
    'facial redness treatment Leicester',
    'rosacea laser treatment Leicester',
    'red skin treatment Leicester',
    'rosacea clinic Leicester',
    'facial flushing treatment',
    'The One Clinic Leicester',
  ],
  openGraph: {
    title: 'Facial Redness & Rosacea Treatment Leicester | The One Clinic',
    description:
      'Calm facial redness and rosacea with personalised treatments at The One Clinic, Leicester. GMC-registered doctors, clinically proven results.',
  },
};

export default function Page() {
  return <RosaceaPage />;
}
