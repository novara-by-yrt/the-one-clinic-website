import type { Metadata } from 'next';
import IngownToenailRemovalPage from './IngownToenailRemovalPage';

export const metadata: Metadata = {
  title: 'Ingrown Toenail Removal Leicester | The One Clinic',
  description:
    'Expert ingrown toenail removal in Leicester by GMC-registered doctors. Permanent Partial Nail Avulsion with phenol under local anaesthetic — same-day procedure, fast healing.',
  keywords: [
    'ingrown toenail removal Leicester',
    'ingrown toenail treatment Leicester',
    'ingrown toenail surgery Leicester',
    'partial nail avulsion Leicester',
    'toenail removal Leicester',
    'ingrown nail removal Leicester',
    'foot surgery Leicester',
    'nail removal specialist Leicester',
  ],
  openGraph: {
    title: 'Ingrown Toenail Removal Leicester | The One Clinic',
    description:
      'Expert ingrown toenail removal in Leicester by GMC-registered doctors. Permanent Partial Nail Avulsion with phenol under local anaesthetic — same-day procedure, fast healing.',
  },
};

export default function Page() {
  return <IngownToenailRemovalPage />;
}
