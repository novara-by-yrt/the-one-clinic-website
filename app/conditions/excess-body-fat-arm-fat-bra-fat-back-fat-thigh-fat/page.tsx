import type { Metadata } from 'next';
import ExcessBodyFatPage from './ExcessBodyFatPage';

export const metadata: Metadata = {
  title: 'Excess Body Fat Treatment Leicester | Arm, Bra & Back Fat',
  description: 'Learn about excess body fat, including arm, bra, back, and thigh fat, and effective treatment options. GMC-registered doctors at The One Clinic, Leicester of…',
  keywords: [
    'excess body fat treatment Leicester',
    'arm fat treatment Leicester',
    'bra fat treatment Leicester',
    'back fat treatment Leicester',
    'thigh fat treatment Leicester',
    'body contouring Leicester',
    'The One Clinic Leicester',
  ],
  openGraph: {
    title: 'Excess Body Fat Treatment Leicester',
    description:
      'Reduce stubborn arm, bra, back, and thigh fat with personalised body contouring at The One Clinic, Leicester. GMC-registered doctors, proven results.',
  },
};

export default function Page() {
  return <ExcessBodyFatPage />;
}
