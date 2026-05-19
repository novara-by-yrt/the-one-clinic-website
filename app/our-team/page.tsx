import type { Metadata } from 'next';
import TeamHero from '@/components/sections/TeamHero';
import TeamIntro from '@/components/sections/TeamIntro';
import DoctorsGrid from '@/components/sections/DoctorsGrid';
import TeamTrustStrip from '@/components/sections/TeamTrustStrip';
import Testimonials from '@/components/sections/Testimonials';
import LeadForm from '@/components/sections/LeadForm';

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the GMC-registered doctors and expert team at The One Clinic, Leicester, with over 45 years of combined experience across general health, dermatology, a…',
};

export default function OurTeamPage() {
  return (
    <>
      <TeamHero />
      <TeamIntro />
      <DoctorsGrid />
      <TeamTrustStrip />
      <Testimonials />
      <LeadForm />
    </>
  );
}
