import Hero         from '@/components/sections/Hero';
import VideoSection  from '@/components/sections/VideoSection';
import TrustStrip   from '@/components/sections/TrustStrip';
import Services    from '@/components/sections/Services';
import Benefits    from '@/components/sections/Benefits';
import CaseStudies from '@/components/sections/CaseStudies';
import Process     from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import LeadForm    from '@/components/sections/LeadForm';
import FAQ         from '@/components/sections/FAQ';
import FinalCTA    from '@/components/sections/FinalCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <VideoSection />
      <TrustStrip />
      <Services />
      <Benefits />
      <CaseStudies />
      <Process />
      <Testimonials />
      <LeadForm />
      <FAQ />
      <FinalCTA />
    </>
  );
}
