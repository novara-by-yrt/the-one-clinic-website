import type { Metadata } from 'next';
import ExcessiveSweatingPage from './ExcessiveSweatingPage';

export const metadata: Metadata = {
  title: 'Excessive Sweating Treatment Leicester | Hyperhidrosis | The One Clinic',
  description:
    'Learn about excessive sweating (hyperhidrosis) and effective treatment options. GMC-registered doctors at The One Clinic, Leicester offer personalised treatments to reduce excessive sweating and restore confidence.',
  keywords: [
    'excessive sweating treatment Leicester',
    'hyperhidrosis treatment Leicester',
    'botox sweating Leicester',
    'underarm sweating treatment Leicester',
    'hyperhidrosis Leicester',
    'sweat reduction Leicester',
    'The One Clinic Leicester',
  ],
  openGraph: {
    title: 'Excessive Sweating Treatment Leicester | The One Clinic',
    description:
      'Treat excessive sweating (hyperhidrosis) with personalised treatments at The One Clinic, Leicester. GMC-registered doctors, proven results.',
  },
};

export default function Page() {
  return <ExcessiveSweatingPage />;
}
