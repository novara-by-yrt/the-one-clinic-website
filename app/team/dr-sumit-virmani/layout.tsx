import type { Metadata } from 'next';

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

export default function DrSumitVirmaniLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
