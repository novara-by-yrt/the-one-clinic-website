import type { Metadata } from 'next';
import LiposuctionPage from './LiposuctionPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/liposuction-leicester' },
  title: 'Liposuction Leicester | Body Contouring Surgery',
  description:
    'Liposuction in Leicester. Expert surgical fat removal for stubborn areas, abdomen, thighs, arms, and more. Personalised body contouring at The One Clinic.',
  openGraph: {
    title: 'Liposuction Leicester',
    description:
      'Expert liposuction in Leicester. Surgical fat removal for stubborn areas with personalised body contouring care at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Liposuction Leicester',
    description:
      'Expert liposuction in Leicester. Surgical fat removal for stubborn areas with personalised body contouring care at The One Clinic.',
  },
};

export default function Page() {
  return <LiposuctionPage />;
}
