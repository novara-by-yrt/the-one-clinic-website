import BrandHero         from '@/components/brand/BrandHero';
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
      <BrandHero />
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
