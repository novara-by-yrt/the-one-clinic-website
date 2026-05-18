import type { Metadata } from 'next';
import BCCRemovalPage from './BCCRemovalPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/basal-cell-carcinoma-bcc-removal-leicester' },
  title: 'BCC Removal Leicester | Skin Cancer Treatment',
  description: 'Basal cell carcinoma (BCC) removal in Leicester. Expert surgical excision of skin cancer by our experienced medical team at The One Clinic. No GP referral ne…',
  openGraph: {
    title: 'BCC Removal Leicester | Basal Cell Carcinoma Treatment',
    description:
      'Expert basal cell carcinoma (BCC) removal in Leicester. Surgical excision of skin cancer by our experienced medical team at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BCC Removal Leicester | Basal Cell Carcinoma Treatment',
    description:
      'Expert basal cell carcinoma (BCC) removal in Leicester. Surgical excision of skin cancer by our experienced medical team at The One Clinic.',
  },
};

export default function Page() {
  return <BCCRemovalPage />;
}
