'use client';

import dynamic from 'next/dynamic';
import LazyVisible from '@/components/ui/LazyVisible';

// ssr:false + LazyVisible: the Swiper-powered treatments carousel only loads
// and initialises once the user nears it, keeping its JS off the homepage's
// initial bundle and its init off the main thread during first load.
const BrandTreatments = dynamic(() => import('./BrandTreatments'), { ssr: false });

export default function BrandTreatmentsLazy() {
  // The real section is min-height: 100vh, so reserve a full viewport to
  // guarantee a zero-shift placeholder.
  return (
    <LazyVisible minHeight="100vh">
      <BrandTreatments />
    </LazyVisible>
  );
}
