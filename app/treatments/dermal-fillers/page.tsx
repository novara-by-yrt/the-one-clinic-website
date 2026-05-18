import type { Metadata } from 'next';
import DermalFillersPage from './DermalFillersPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/dermal-fillers' },
  title: 'Dermal Fillers Leicester | Natural Volume & Contouring',
  description:
    'Access fast, personalised dermal filler treatments with expert care at The One Clinic Leicester. Natural-looking results from GMC-registered doctors.',
  openGraph: {
    title: 'Dermal Fillers Leicester',
    description:
      'Natural-looking dermal filler treatments in Leicester. Expert volume restoration and contouring by GMC-registered doctors at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dermal Fillers Leicester',
    description:
      'Natural-looking dermal filler treatments in Leicester. Expert volume restoration and contouring by GMC-registered doctors at The One Clinic.',
  },
};

export default function Page() {
  return <DermalFillersPage />;
}
