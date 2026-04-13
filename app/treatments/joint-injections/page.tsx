import type { Metadata } from 'next';
import JointInjectionsPage from './JointInjectionsPage';

export const metadata: Metadata = {
  title: 'Joint Injections Leicester | Pain Relief Specialist | The One Clinic',
  description:
    'Expert joint injection treatment in Leicester. Cortisone and hyaluronic acid injections for knee, hip, shoulder, and other joints. GMC-registered doctors at The One Clinic.',
  keywords: [
    'joint injections Leicester',
    'cortisone injection Leicester',
    'knee injection Leicester',
    'shoulder injection Leicester',
    'joint pain treatment Leicester',
    'steroid injection Leicester',
    'hyaluronic acid joint injection',
  ],
  openGraph: {
    title: 'Joint Injections Leicester | The One Clinic',
    description:
      'Fast, effective relief from joint pain with expert-administered injections at The One Clinic, Leicester.',
  },
};

export default function Page() {
  return <JointInjectionsPage />;
}
