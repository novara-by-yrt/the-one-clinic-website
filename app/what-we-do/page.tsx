import type { Metadata } from 'next';
import WhatWeDoHero    from '@/components/sections/WhatWeDoHero';
import WhatWeDoContent from '@/components/sections/WhatWeDoContent';
import BrandProcess    from '@/components/brand/BrandProcess';
import Testimonials    from '@/components/sections/Testimonials';
import LeadForm        from '@/components/sections/LeadForm';

export const metadata: Metadata = {
  title: 'What We Do',
  description:
    'The One Clinic is made up of esteemed medical professionals delivering aesthetic medicine, weight management, and holistic healthcare. One clinic, all your needs.',
};

export default function WhatWeDoPage() {
  return (
    <>
      <WhatWeDoHero />
      <WhatWeDoContent />
      <BrandProcess />
      <Testimonials />
      <LeadForm />
    </>
  );
}
