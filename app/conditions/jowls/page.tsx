import type { Metadata } from 'next';
import JowlsPage from './JowlsPage';

export const metadata: Metadata = {
  title: 'Jowls Treatment Leicester | Lift & Define Your Jawline | The One Clinic',
  description:
    'Learn about jowls and effective treatment options. GMC-registered doctors at The One Clinic, Leicester offer personalised non-surgical treatments to lift and redefine the jawline.',
  keywords: [
    'jowls treatment Leicester',
    'sagging jawline treatment',
    'jowl lift Leicester',
    'non-surgical jowl treatment',
    'dermal fillers jawline Leicester',
    'skin tightening Leicester',
    'jawline contouring Leicester',
    'The One Clinic Leicester',
  ],
  openGraph: {
    title: 'Jowls Treatment Leicester | The One Clinic',
    description:
      'Lift and redefine your jawline with personalised jowl treatments at The One Clinic, Leicester. GMC-registered doctors, natural-looking results.',
  },
};

export default function Page() {
  return <JowlsPage />;
}
