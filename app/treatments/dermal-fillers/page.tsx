import type { Metadata } from 'next';
import DermalFillersPage from './DermalFillersPage';

export const metadata: Metadata = {
  title: 'Dermal Fillers Leicester | Natural Volume & Contouring | The One Clinic',
  description:
    'Access fast, personalised dermal filler treatments with expert care at The One Clinic Leicester. Natural-looking results from GMC-registered doctors.',
  keywords: [
    'dermal fillers Leicester',
    'lip fillers Leicester',
    'facial fillers Leicester',
    'cheek fillers Leicester',
    'anti-ageing fillers Leicester',
    'hyaluronic acid fillers Leicester',
  ],
  openGraph: {
    title: 'Dermal Fillers Leicester | The One Clinic',
    description:
      'Natural-looking dermal filler treatments in Leicester. Expert volume restoration and contouring by GMC-registered doctors at The One Clinic.',
  },
};

export default function Page() {
  return <DermalFillersPage />;
}
