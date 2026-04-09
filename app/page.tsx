import Hero             from '@/components/sections/Hero';
import LogoCarousel     from '@/components/sections/LogoCarousel';
import VideoSection     from '@/components/sections/VideoSection';
import TrustStrip       from '@/components/sections/TrustStrip';
import Services         from '@/components/sections/Services';
import Benefits         from '@/components/sections/Benefits';
import Testimonials     from '@/components/sections/Testimonials';
import Process          from '@/components/sections/Process';
import TestimonialVideos from '@/components/sections/TestimonialVideos';
import MeetTheExperts   from '@/components/sections/MeetTheExperts';
import CaseStudies      from '@/components/sections/CaseStudies';
import LeadForm         from '@/components/sections/LeadForm';
import FinalCTA         from '@/components/sections/FinalCTA';
import SectionDivider   from '@/components/ui/SectionDivider';

export default function Home() {
  return (
    <>
      {/* dark */}
      <Hero />
      <SectionDivider from="dark" to="light" />
      {/* light */}
      <LogoCarousel />
      <SectionDivider from="light" to="dark" />
      {/* dark */}
      <VideoSection />
      <SectionDivider from="dark" to="light" />
      {/* light */}
      <TrustStrip />
      <Services />
      <Benefits />
      <SectionDivider from="light" to="dark" />
      {/* dark */}
      <Testimonials />
      <SectionDivider from="dark" to="light" />
      {/* light */}
      <Process />
      <SectionDivider from="light" to="dark" />
      {/* dark */}
      <TestimonialVideos />
      <SectionDivider from="dark" to="light" />
      {/* light */}
      <MeetTheExperts />
      <SectionDivider from="light" to="dark" />
      {/* dark */}
      <CaseStudies />
      <SectionDivider from="dark" to="light" />
      {/* light */}
      <LeadForm />
      <SectionDivider from="light" to="dark" />
      {/* dark */}
      <FinalCTA />
    </>
  );
}
