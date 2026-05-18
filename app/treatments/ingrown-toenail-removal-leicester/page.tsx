import type { Metadata } from 'next';
import IngownToenailRemovalPage from './IngownToenailRemovalPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/ingrown-toenail-removal-leicester' },
  title: 'Ingrown Toenail Removal Leicester',
  description:
    'Permanent relief from ingrown toenails in Leicester. Dr Sumit Virmani offers expert minor surgery for immediate pain relief and long-term results.',
  openGraph: {
    title: 'Ingrown Toenail Removal Leicester',
    description:
      'Permanent relief from ingrown toenails in Leicester. Dr Sumit Virmani offers expert minor surgery for immediate pain relief and long-term results.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ingrown Toenail Removal Leicester',
    description:
      'Permanent relief from ingrown toenails in Leicester. Dr Sumit Virmani offers expert minor surgery for immediate pain relief and long-term results.',
  },
};

export default function Page() {
  return <IngownToenailRemovalPage />;
}
