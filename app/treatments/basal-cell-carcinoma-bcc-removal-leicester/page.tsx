import type { Metadata } from 'next';
import BCCRemovalPage from './BCCRemovalPage';

export const metadata: Metadata = {
  title: 'Basal Cell Carcinoma (BCC) Removal Leicester | Skin Cancer Treatment | The One Clinic',
  description:
    'Basal cell carcinoma (BCC) removal in Leicester. Expert surgical excision of skin cancer by our experienced medical team at The One Clinic. No GP referral needed.',
  keywords: [
    'basal cell carcinoma removal Leicester',
    'BCC removal Leicester',
    'skin cancer treatment Leicester',
    'BCC excision Leicester',
    'skin cancer surgery Leicester',
    'private skin cancer clinic Leicester',
  ],
  openGraph: {
    title: 'BCC Removal Leicester | Basal Cell Carcinoma Treatment | The One Clinic',
    description:
      'Expert basal cell carcinoma (BCC) removal in Leicester. Surgical excision of skin cancer by our experienced medical team at The One Clinic.',
  },
};

export default function Page() {
  return <BCCRemovalPage />;
}
