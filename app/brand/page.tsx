import Hero             from '@/components/sections/Hero';
import LogoCarousel     from '@/components/sections/LogoCarousel';
import VideoSection     from '@/components/sections/VideoSection';
import TrustStrip       from '@/components/sections/TrustStrip';
import BrandTreatments  from '@/components/brand/BrandTreatments';
import BrandBenefits    from '@/components/brand/BrandBenefits';
import Testimonials     from '@/components/sections/Testimonials';
import Process          from '@/components/sections/Process';
import TestimonialVideos from '@/components/sections/TestimonialVideos';
import MeetTheExperts   from '@/components/sections/MeetTheExperts';
import CaseStudies      from '@/components/sections/CaseStudies';
import LeadForm         from '@/components/sections/LeadForm';
import FinalCTA         from '@/components/sections/FinalCTA';

export default function BrandPage() {
  return (
    <>
      <Hero />
      <LogoCarousel />
      <VideoSection />
      <TrustStrip />
      <BrandTreatments />
      <BrandBenefits />
      <Testimonials />
      <Process />
      <TestimonialVideos />
      <MeetTheExperts />
      <CaseStudies />
      <LeadForm />
      <FinalCTA />
    </>
  );
}
