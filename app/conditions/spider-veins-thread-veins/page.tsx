import type { Metadata } from 'next';
import SpiderVeinsPage from './SpiderVeinsPage';

export const metadata: Metadata = {
  title: 'Spider Veins & Thread Veins Treatment Leicester',
  description: 'Learn about spider veins and thread veins and effective treatment options. GMC-registered doctors at The One Clinic, Leicester offer personalised treatments…',
  keywords: [
    'spider veins treatment Leicester',
    'thread veins treatment Leicester',
    'thread vein removal Leicester',
    'broken capillaries treatment Leicester',
    'IPL thread veins Leicester',
    'vascular treatment Leicester',
    'The One Clinic Leicester',
  ],
  openGraph: {
    title: 'Spider Veins & Thread Veins Treatment Leicester',
    description:
      'Reduce visible spider veins and thread veins with personalised treatments at The One Clinic, Leicester. GMC-registered doctors, proven results.',
  },
};

export default function Page() {
  return <SpiderVeinsPage />;
}
