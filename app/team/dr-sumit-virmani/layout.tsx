import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dr Sumit Virmani — Co-Founder & GP',
  description: 'Meet Dr Sumit Virmani, Co-Founder of The One Clinic. With 15+ years in medicine and 12+ years as a GP, specialising in minor surgery, skin lesion excision, and aesthetic procedures.',
  openGraph: {
    title: 'Dr Sumit Virmani — Co-Founder & GP | The One Clinic',
    description: 'Meet Dr Sumit Virmani, Co-Founder of The One Clinic. With 15+ years in medicine and 12+ years as a GP, specialising in minor surgery, skin lesion excision, and aesthetic procedures.',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr Sumit Virmani — Co-Founder & GP | The One Clinic',
    description: 'Meet Dr Sumit Virmani, Co-Founder of The One Clinic. With 15+ years in medicine and 12+ years as a GP, specialising in minor surgery, skin lesion excision, and aesthetic procedures.',
  },
};

export default function DrSumitVirmaniLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
