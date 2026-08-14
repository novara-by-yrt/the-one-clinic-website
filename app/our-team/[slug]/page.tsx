import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TEAM_MEMBERS } from '@/data/team';
import TeamMemberProfile from '@/components/sections/TeamMemberProfile';
import LeadForm from '@/components/sections/LeadForm';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return TEAM_MEMBERS.filter((m) => !m.noProfilePage).map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = TEAM_MEMBERS.find((m) => m.slug === slug);
  if (!member) return {};
  return {
    title: member.name,
    description: `Meet ${member.name}${member.credentials ? ` (${member.credentials})` : ''}, ${member.role} at The One Clinic, Leicester.`,
  };
}

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params;
  const member = TEAM_MEMBERS.find((m) => m.slug === slug);
  if (!member || member.noProfilePage) notFound();

  return (
    <>
      <TeamMemberProfile member={member} />
      <LeadForm />
    </>
  );
}
