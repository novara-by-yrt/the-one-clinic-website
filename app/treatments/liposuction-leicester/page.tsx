import type { Metadata } from 'next';
import LiposuctionPage from './LiposuctionPage';

export const metadata: Metadata = {
  title: 'Liposuction Leicester | Body Contouring Surgery | The One Clinic',
  description:
    'Liposuction in Leicester. Expert surgical fat removal for stubborn areas — abdomen, thighs, arms, and more. Personalised body contouring at The One Clinic.',
  keywords: [
    'liposuction Leicester',
    'liposuction surgery Leicester',
    'fat removal Leicester',
    'body contouring Leicester',
    'tummy liposuction Leicester',
    'private liposuction Leicester',
  ],
  openGraph: {
    title: 'Liposuction Leicester | The One Clinic',
    description:
      'Expert liposuction in Leicester. Surgical fat removal for stubborn areas with personalised body contouring care at The One Clinic.',
  },
};

export default function Page() {
  return <LiposuctionPage />;
}
