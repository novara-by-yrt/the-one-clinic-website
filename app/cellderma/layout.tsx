import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CellDerma | Science-Driven Skincare by Dr. Dev Patel - The One Clinic',
  description: 'Discover CellDerma, award-winning science-driven skincare by Dr. Dev Patel. High-performance formulations with clinically proven results, exclusively at The One Clinic.',
  robots: 'noindex, follow',
};

export default function CellDermaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
