import BrandHero          from '@/components/brand/BrandHero';
import BrandVideoSection  from '@/components/brand/BrandVideoSection';
import LogoCarousel      from '@/components/sections/LogoCarousel';
import BrandTreatments   from '@/components/brand/BrandTreatments';
import BrandProcess      from '@/components/brand/BrandProcess';
import Testimonials      from '@/components/sections/Testimonials';
import TestimonialVideos from '@/components/sections/TestimonialVideos';
import MeetTheExperts    from '@/components/sections/MeetTheExperts';
import CaseStudies       from '@/components/sections/CaseStudies';
import LeadForm          from '@/components/sections/LeadForm';
import FinalCTA          from '@/components/sections/FinalCTA';

export default function BrandPage() {
  return (
    <>
      <BrandHero />
      <LogoCarousel />
      <BrandVideoSection />
      <BrandTreatments />
      <BrandProcess />
      <Testimonials />
      <TestimonialVideos />
      <MeetTheExperts />
      <CaseStudies />
      <LeadForm />
      <FinalCTA />
    </>
  );
}
