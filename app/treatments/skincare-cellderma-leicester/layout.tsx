import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/skincare-cellderma-leicester' },
  title: 'CellDerma Skincare Leicester | Science-Driven Medical-Grade Skincare',
  description:
    'CellDerma science-driven skincare in Leicester. Personalised skincare with clinically active ingredients and professional treatments to transform your skin at The One Clinic.',
  openGraph: {
    title: 'CellDerma Skincare Leicester',
    description:
      'Expert CellDerma science-driven skincare in Leicester. Personalised prescriptions and professional treatments for visibly healthier skin at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CellDerma Skincare Leicester',
    description:
      'Expert CellDerma science-driven skincare in Leicester. Personalised prescriptions and professional treatments for visibly healthier skin at The One Clinic.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
