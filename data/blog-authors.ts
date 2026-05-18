/**
 * Blog author metadata, synced with team data
 * Maps author names to team slugs and medical credentials
 */

export interface BlogAuthor {
  name: string;
  slug: string; // team page slug
  role: string;
  gmcNumber?: string;
  bio?: string;
}

export const blogAuthors: Record<string, BlogAuthor> = {
  'Dr Sumit Virmani': {
    name: 'Dr Sumit Virmani',
    slug: 'dr-sumit-virmani',
    role: 'Co-Founder, General Practitioner',
    gmcNumber: '7469387', // Example
    bio: 'Dr Sumit Virmani is the co-founder of The One Clinic with over 15 years of medical expertise.',
  },
  'Dr Gunjan Bedi': {
    name: 'Dr Gunjan Bedi',
    slug: 'dr-gunjan-bedi',
    role: 'Aesthetics Practitioner, General Practitioner',
    gmcNumber: '7469388', // Example
    bio: 'Dr Gunjan Bedi is a highly skilled aesthetics practitioner with over 20 years in medicine.',
  },
  'Mr Thangasamy Sankar': {
    name: 'Mr Thangasamy Sankar',
    slug: 'mr-thangasamy-sankar',
    role: 'Cosmetic and Aesthetic Surgeon',
    bio: 'Mr Thangasamy Sankar brings surgical expertise in cosmetic procedures.',
  },
};
