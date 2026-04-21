import type { Metadata } from 'next';
import IngrownToenailPage from './IngrownToenailPage';

export const metadata: Metadata = {
  title: 'Ingrown Toenail Removal Leicester | The One Clinic',
  description:
    'Permanent relief from ingrown toenails in Leicester. Dr Sumit Virmani offers expert minor surgery for immediate pain relief and long-term results.',
  keywords: [
    'ingrown toenail removal Leicester',
    'ingrown toenail treatment Leicester',
    'partial nail avulsion Leicester',
    'PNA toenail Leicester',
    'toenail surgery Leicester',
    'ingrown nail doctor Leicester',
    'ingrown toenail permanent fix Leicester',
    'ingrown toenail specialist Leicester',
  ],
  openGraph: {
    title: 'Ingrown Toenail Removal Leicester | The One Clinic',
    description:
      'Permanent relief from ingrown toenails in Leicester. Dr Sumit Virmani offers expert minor surgery for immediate pain relief and long-term results.',
  },
};

export default function Page() {
  return <IngrownToenailPage />;
}
