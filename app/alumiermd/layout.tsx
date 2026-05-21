import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AlumierMD | Professional Skincare - The One Clinic',
  description: 'Discover AlumierMD, a clean, medical-grade skincare brand used at The One Clinic. Professional-grade products with scientifically proven ingredients.',
  robots: 'noindex, follow',
};

export default function AlumierMDLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
