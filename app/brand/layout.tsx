import { Playfair_Display } from 'next/font/google';
import type { ReactNode } from 'react';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '600', '700', '800'],
  style: ['normal', 'italic'],
});

export default function BrandLayout({ children }: { children: ReactNode }) {
  return <div className={playfair.variable}>{children}</div>;
}
