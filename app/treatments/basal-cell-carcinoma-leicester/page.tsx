import type { Metadata } from 'next';
import BCCRemovalPage from './BCCRemovalPage';
import JsonLd from '@/lib/schema/JsonLd';
import { buildVideoSchema, buildProcedureSchema, buildBreadcrumbSchema } from '@/lib/schema/builders';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/basal-cell-carcinoma-leicester' },
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

const schemas = [
  buildProcedureSchema({
    name: 'BCC Removal Leicester',
    description: 'Expert surgical removal of basal cell carcinoma (BCC) with histological analysis to confirm clear margins.',
    category: 'Medical Aesthetics',
    slug: 'basal-cell-carcinoma-bcc-removal-leicester',
    bodyLocation: 'Skin',
    howPerformed: 'Surgical excision under local anaesthetic. The lesion is removed with a margin of healthy tissue and sent for histological analysis.',
  }),
  buildBreadcrumbSchema([
    { name: 'Treatments', href: '/treatments' },
    { name: 'BCC Removal' },
  ]),
  buildVideoSchema({
    name: 'Minor Surgical Procedures at The One Clinic Leicester',
    description: 'Watch how minor surgical procedures including skin lesion and BCC removal are performed at The One Clinic, Leicester.',
    wistiaId: '2u0e7sshum',
    thumbnailUrl: 'https://fast.wistia.net/embed/medias/2u0e7sshum/swatch',
    uploadDate: '2024-01-15',
    duration: 'PT2M',
    pagePath: '/treatments/basal-cell-carcinoma-leicester',
  }),
];

export default function Page() {
  return (
    <>
      <JsonLd schema={schemas} />
      <BCCRemovalPage />
    </>
  );
}
