import type { Metadata } from 'next';
import IngownToenailRemovalPage from './IngownToenailRemovalPage';

export const metadata: Metadata = {
  title: 'Ingrown Toenail Removal Leicester | The One Clinic',
  description:
    'Permanent relief from ingrown toenails in Leicester. Dr Sumit Virmani offers expert minor surgery for immediate pain relief and long-term results.',
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
      'Permanent relief from ingrown toenails in Leicester. Dr Sumit Virmani offers expert minor surgery for immediate pain relief and long-term results.',
  },
};

export default function Page() {
  return <IngownToenailRemovalPage />;
}
