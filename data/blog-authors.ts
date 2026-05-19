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
  'Mr Ashish Kelkar': {
    name: 'Mr Ashish Kelkar',
    slug: 'mr-ashish-kelkar',
    role: 'Consultant General and Colorectal Surgeon',
    bio: 'Mr Ashish Kelkar is an experienced consultant general and colorectal surgeon specialising in colorectal cancer, haemorrhoids, hernias and gallbladder surgery.',
  },
  'Dr Veena Patel': {
    name: 'Dr Veena Patel',
    slug: 'dr-veena-patel',
    role: 'Consultant Rheumatologist',
    bio: 'Dr Veena Patel is a Consultant Rheumatologist with extensive experience in managing rheumatoid arthritis, psoriatic arthritis, and other rheumatological conditions.',
  },
  'Professor Prashanth Patel': {
    name: 'Professor Prashanth Patel',
    slug: 'professor-prashanth-patel',
    role: 'Consultant Metabolic Physician & Chemical Pathologist',
    bio: 'Professor Prashanth Patel is Head of Service for Chemical Pathology and Metabolic Medicine at UHL, specialising in metabolic bone disease and lipid disorders.',
  },
  'Mr Randeep S. Aujla': {
    name: 'Mr Randeep S. Aujla',
    slug: 'mr-randeep-aujla',
    role: 'Consultant Orthopaedic Surgeon',
    bio: 'Mr Randeep Aujla is an internationally fellowship-trained Consultant Orthopaedic Surgeon specialising in knee conditions and sports medicine.',
  },
};
