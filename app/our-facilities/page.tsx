import type { Metadata } from 'next';
import FacilitiesHero from '@/components/sections/FacilitiesHero';
import FacilitiesIntro from '@/components/sections/FacilitiesIntro';
import ArrivalExperience from '@/components/sections/ArrivalExperience';
import FacilityStats from '@/components/sections/FacilityStats';
import TechSafety from '@/components/sections/TechSafety';
import FacilitiesServices from '@/components/sections/FacilitiesServices';
import VideoSection from '@/components/sections/VideoSection';
import Testimonials from '@/components/sections/Testimonials';
import LeadForm from '@/components/sections/LeadForm';

export const metadata: Metadata = {
  title: 'Our Facilities',
  description:
    'Explore The One Clinic\u2019s purpose-built facilities in Leicester \u2014 designed for comfort, equipped with state-of-the-art technology, and staffed by GMC-registered doctors with 45+ years of combined experience.',
};

export default function OurFacilitiesPage() {
  return (
    <>
      <FacilitiesHero />
      <FacilitiesIntro />
      <ArrivalExperience />
      <FacilityStats />
      <TechSafety />
      <FacilitiesServices />
      <VideoSection />
      <Testimonials />
      <LeadForm />
    </>
  );
}
