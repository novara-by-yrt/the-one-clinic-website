import BrandHeroSpread   from '@/components/brand/BrandHeroSpread';
import LogoCarousel      from '@/components/sections/LogoCarousel';
import BrandTreatmentsLazy from '@/components/brand/BrandTreatmentsLazy';
import BrandProcess      from '@/components/brand/BrandProcess';
import Testimonials      from '@/components/sections/Testimonials';
import MeetTheExperts    from '@/components/sections/MeetTheExperts';
import CaseStudiesLazy   from '@/components/sections/CaseStudies/CaseStudiesLazy';
import LeadForm          from '@/components/sections/LeadForm';
import FinalCTA          from '@/components/sections/FinalCTA';
import JsonLd            from '@/lib/schema/JsonLd';
import { buildClinicSchema } from '@/lib/schema/builders';

export default function Home() {
  return (
    <>
      <JsonLd schema={buildClinicSchema()} />
      {/* The /v1 masthead, with the image band folded into an L: a tall
          plate stands beside the copy and a wide one runs under it, so
          the first screen carries the headline and both photographs.
          BrandHero, the previous dark image-background hero, is still
          in components/brand/ and is no longer rendered anywhere. */}
      <BrandHeroSpread />
      <LogoCarousel />
      <BrandTreatmentsLazy />
      <BrandProcess />
      {/* Reviews only: `showVideos` defaults to false, which drops the
          patient-film grid and leaves the review carousel. */}
      <Testimonials />
      <MeetTheExperts />
      <CaseStudiesLazy />
      <LeadForm />
      <FinalCTA />
    </>
  );
}
