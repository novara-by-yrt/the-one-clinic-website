'use client';

import dynamic from 'next/dynamic';
import LazyVisible from '@/components/ui/LazyVisible';

// ssr:false + LazyVisible defers this Swiper carousel (near the bottom of the
// homepage) so it neither ships in the initial JS bundle nor runs its init on
// the main thread during first load.
const CaseStudies = dynamic(() => import('./CaseStudies'), { ssr: false });

export default function CaseStudiesLazy() {
  return (
    <LazyVisible minHeight="640px">
      <CaseStudies />
    </LazyVisible>
  );
}
