import Hero          from '@/components/sections/Hero';
import LogoCarousel  from '@/components/sections/LogoCarousel';
import VideoSection  from '@/components/sections/VideoSection';
import TrustStrip   from '@/components/sections/TrustStrip';
import Services    from '@/components/sections/Services';
import Benefits    from '@/components/sections/Benefits';
import CaseStudies from '@/components/sections/CaseStudies';
import Process            from '@/components/sections/Process';
import TestimonialVideos  from '@/components/sections/TestimonialVideos';
import MeetTheExperts    from '@/components/sections/MeetTheExperts';
import Testimonials from '@/components/sections/Testimonials';
import LeadForm    from '@/components/sections/LeadForm';
import FinalCTA    from '@/components/sections/FinalCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <LogoCarousel />
      <VideoSection />
      <TrustStrip />
      <Services />
      <Benefits />
      <CaseStudies />
      <Process />
      <TestimonialVideos />
      <MeetTheExperts />
      <Testimonials />
      <LeadForm />
      <FinalCTA />
    </>
  );
}
