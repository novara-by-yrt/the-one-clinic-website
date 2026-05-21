import type { Metadata } from 'next';
import JsonLd from '@/lib/schema/JsonLd';
import { buildPhysicianSchema } from '@/lib/schema/builders';

export const metadata: Metadata = {
  title: 'Dr Gunjan Bedi , Advanced Aesthetics Practitioner',
  description: 'Meet Dr Gunjan Bedi at The One Clinic. 20+ years in medicine, qualified in GP, Psychiatry & Aesthetic Medicine. Specialising in injectables, radiofrequency and holistic care.',
  alternates: { canonical: '/team/dr-gunjan-bedi' },
  openGraph: {
    title: 'Dr Gunjan Bedi , Advanced Aesthetics Practitioner | The One Clinic',
    description: 'Meet Dr Gunjan Bedi at The One Clinic. 20+ years in medicine, qualified in GP, Psychiatry & Aesthetic Medicine. Specialising in injectables, radiofrequency and holistic care.',
    type: 'profile',
    images: [{ url: '/DR-GUNJAN.jpg', alt: 'Dr Gunjan Bedi' }],
    url: '/team/dr-gunjan-bedi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr Gunjan Bedi , Advanced Aesthetics Practitioner | The One Clinic',
    description: 'Meet Dr Gunjan Bedi at The One Clinic. 20+ years in medicine, qualified in GP, Psychiatry & Aesthetic Medicine. Specialising in injectables, radiofrequency and holistic care.',
  },
};

const schema = buildPhysicianSchema({
  name: 'Dr Gunjan Bedi',
  role: 'General Practitioner & Psychiatrist',
  credentials: 'MBBS, MRCpsych, MRCGP, BCAM',
  image: '/DR-GUNJAN.jpg',
  bio: 'Dr Gunjan Bedi brings a unique perspective combining qualifications in General Practice, Psychiatry, and Aesthetic Medicine. Her holistic approach addresses both physical and psychological dimensions of each patient\'s health and wellbeing.',
  medicalSpecialty: 'Psychiatry',
  profilePath: '/team/dr-gunjan-bedi',
});

export default function DrGunjanBediLayout({
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
