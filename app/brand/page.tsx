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
import BrandStage       from '@/components/brand/BrandStage';
import BrandReveal      from '@/components/brand/BrandReveal';

export default function BrandPage() {
  return (
    <BrandStage>
      <Hero showVideo={false} />
      <BrandReveal><LogoCarousel /></BrandReveal>
      <BrandReveal><VideoSection /></BrandReveal>
      <BrandReveal><TrustStrip /></BrandReveal>
      <BrandReveal><Services /></BrandReveal>
      <BrandReveal><Benefits /></BrandReveal>
      <BrandReveal><Testimonials /></BrandReveal>
      <BrandReveal><Process /></BrandReveal>
      <BrandReveal><TestimonialVideos /></BrandReveal>
      <BrandReveal><MeetTheExperts /></BrandReveal>
      <BrandReveal><CaseStudies /></BrandReveal>
      <BrandReveal><LeadForm /></BrandReveal>
      <BrandReveal><FinalCTA /></BrandReveal>
    </BrandStage>
  );
}
