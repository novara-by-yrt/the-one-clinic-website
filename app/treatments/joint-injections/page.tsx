import type { Metadata } from 'next';
import JointInjectionsPage from './JointInjectionsPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/joint-injections' },
  title: 'Joint Injections Leicester | Pain Relief Specialist',
  description: 'Expert joint injection treatment in Leicester. Cortisone and hyaluronic acid injections for knee, hip, shoulder, and other joints. GMC-registered doctors at…',
  openGraph: {
    title: 'Joint Injections Leicester',
    description:
      'Fast, effective relief from joint pain with expert-administered injections at The One Clinic, Leicester.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Joint Injections Leicester',
    description:
      'Fast, effective relief from joint pain with expert-administered injections at The One Clinic, Leicester.',
  },
};

export default function Page() {
  return <JointInjectionsPage />;
}
