import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dr Gunjan Bedi — Advanced Aesthetics Practitioner',
  description: 'Meet Dr Gunjan Bedi at The One Clinic. 20+ years in medicine, qualified in GP, Psychiatry & Aesthetic Medicine. Specialising in injectables, radiofrequency and holistic care.',
  alternates: { canonical: '/team/dr-gunjan-bedi' },
  openGraph: {
    title: 'Dr Gunjan Bedi — Advanced Aesthetics Practitioner | The One Clinic',
    description: 'Meet Dr Gunjan Bedi at The One Clinic. 20+ years in medicine, qualified in GP, Psychiatry & Aesthetic Medicine. Specialising in injectables, radiofrequency and holistic care.',
    type: 'profile',
    images: [{ url: '/images/imgi_21_team-thumb-BEDI.jpg', alt: 'Dr Gunjan Bedi' }],
    url: '/team/dr-gunjan-bedi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr Gunjan Bedi — Advanced Aesthetics Practitioner | The One Clinic',
    description: 'Meet Dr Gunjan Bedi at The One Clinic. 20+ years in medicine, qualified in GP, Psychiatry & Aesthetic Medicine. Specialising in injectables, radiofrequency and holistic care.',
  },
};

export default function DrGunjanBediLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
