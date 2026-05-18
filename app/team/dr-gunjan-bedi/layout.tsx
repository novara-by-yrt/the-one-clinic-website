import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dr Gunjan Bedi — Advanced Aesthetics Practitioner',
  description: 'Meet Dr Gunjan Bedi, Advanced Aesthetics Practitioner at The One Clinic. With 20+ years in medicine and 10+ years as a GP, specialising in dermatology, injectables, and radiofrequency treatments.',
  openGraph: {
    title: 'Dr Gunjan Bedi — Advanced Aesthetics Practitioner | The One Clinic',
    description: 'Meet Dr Gunjan Bedi, Advanced Aesthetics Practitioner at The One Clinic. With 20+ years in medicine and 10+ years as a GP, specialising in dermatology, injectables, and radiofrequency treatments.',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr Gunjan Bedi — Advanced Aesthetics Practitioner | The One Clinic',
    description: 'Meet Dr Gunjan Bedi, Advanced Aesthetics Practitioner at The One Clinic. With 20+ years in medicine and 10+ years as a GP, specialising in dermatology, injectables, and radiofrequency treatments.',
  },
};

export default function DrGunjanBediLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
