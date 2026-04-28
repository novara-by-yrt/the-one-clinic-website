import dynamic from 'next/dynamic';
import Hero         from '@/components/sections/Hero';
import LogoCarousel from '@/components/sections/LogoCarousel';
import TrustStrip   from '@/components/sections/TrustStrip';
import Services     from '@/components/sections/Services';
import Benefits     from '@/components/sections/Benefits';
import Process      from '@/components/sections/Process';
import BrandStage   from '@/components/brand/BrandStage';
import BrandReveal  from '@/components/brand/BrandReveal';

/* Lazily-loaded sections — JS bundle deferred until component enters viewport */
const VideoSection      = dynamic(() => import('@/components/sections/VideoSection'));
const Testimonials      = dynamic(() => import('@/components/sections/Testimonials'));
const TestimonialVideos = dynamic(() => import('@/components/sections/TestimonialVideos'));
const MeetTheExperts    = dynamic(() => import('@/components/sections/MeetTheExperts'));
const CaseStudies       = dynamic(() => import('@/components/sections/CaseStudies'));
const LeadForm          = dynamic(() => import('@/components/sections/LeadForm'));
const FinalCTA          = dynamic(() => import('@/components/sections/FinalCTA'));

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
