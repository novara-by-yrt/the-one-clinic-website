import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/dermalux-led-light-therapy-leicester' },
  title: 'Dermalux LED Light Therapy in Leicester | The One Clinic',
  description:
    'Discover expert Dermalux LED treatments in Leicester. Rejuvenate your skin, reduce redness, and achieve a brilliant glow.',
  openGraph: {
    title: 'Dermalux LED Light Therapy in Leicester | The One Clinic',
    description:
      'Discover expert Dermalux LED treatments in Leicester. Rejuvenate your skin, reduce redness, and achieve a brilliant glow.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dermalux LED Light Therapy in Leicester | The One Clinic',
    description:
      'Discover expert Dermalux LED treatments in Leicester. Rejuvenate your skin, reduce redness, and achieve a brilliant glow.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
