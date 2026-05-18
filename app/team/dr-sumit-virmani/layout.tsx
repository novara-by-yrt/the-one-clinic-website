import type { Metadata } from 'next';
import JsonLd from '@/lib/schema/JsonLd';
import { buildPhysicianSchema } from '@/lib/schema/builders';

export const metadata: Metadata = {
  title: 'Dr Sumit Virmani — Co-Founder & GP',
  description: 'Meet Dr Sumit Virmani, Co-Founder of The One Clinic. Over 15 years in medicine, 12+ years as a GP. Specialising in minor surgery, skin lesion excision, and aesthetic procedures.',
  alternates: { canonical: '/team/dr-sumit-virmani' },
  openGraph: {
    title: 'Dr Sumit Virmani — Co-Founder & GP | The One Clinic',
    description: 'Meet Dr Sumit Virmani, Co-Founder of The One Clinic. Over 15 years in medicine, 12+ years as a GP. Specialising in minor surgery, skin lesion excision, and aesthetic procedures.',
    type: 'profile',
    images: [{ url: '/images/imgi_20_team-thumb-VIRMANI.jpg', alt: 'Dr Sumit Virmani' }],
    url: '/team/dr-sumit-virmani',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr Sumit Virmani — Co-Founder & GP | The One Clinic',
    description: 'Meet Dr Sumit Virmani, Co-Founder of The One Clinic. Over 15 years in medicine, 12+ years as a GP. Specialising in minor surgery, skin lesion excision, and aesthetic procedures.',
  },
};

const schema = buildPhysicianSchema({
  name: 'Dr Sumit Virmani',
  role: 'Co-Founder & GP',
  credentials: 'MBBS, MRCGP',
  image: '/images/imgi_20_team-thumb-VIRMANI.jpg',
  bio: 'Dr Sumit Virmani is co-founder of The One Clinic. He has extensive experience having worked as a medical doctor for over 15 years, with over 12 of these years working as a local GP. He specialises in minor surgery, skin lesion excision, body contouring, and hair rejuvenation.',
  medicalSpecialty: 'GeneralPractice',
  profilePath: '/team/dr-sumit-virmani',
});

export default function DrSumitVirmaniLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd schema={schema} />
      {children}
    </>
  );
}
