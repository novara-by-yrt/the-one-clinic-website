export type TeamMember = {
  slug: string;
  name: string;
  credentials: string;
  initials: string;
  image?: string;
  role: string;
  bio: string[];
  /** Overrides the default /our-team/[slug] URL for the Read More link */
  profileUrl?: string;

  /* ─ E-E-A-T & YMYL medical credentials ─ */
  /** UK General Medical Council registration number, e.g. "7765432" */
  gmcNumber?: string;
  /** Year qualified or began medical practice */
  yearQualified?: number;
  /** Professional society memberships, e.g. ["BAAPS", "BACD"] */
  specialtyMemberships?: string[];
  /** Published papers, research, or clinical articles */
  publications?: Array<{ title: string; url: string; year: number }>;
  /** LinkedIn profile URL for professional social proof */
  linkedinUrl?: string;
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    slug: 'dr-sumit-virmani',
    name: 'Dr Sumit Virmani',
    credentials: 'MBBS, MRCGP',
    initials: 'SV',
    image: '/images/imgi_20_team-thumb-VIRMANI.jpg',
    role: 'Co-Founder & GP',
    profileUrl: '/team/dr-sumit-virmani',
    bio: [
      'Dr Sumit Virmani is co-founder of The One Clinic. He has extensive experience having worked as a medical doctor for over 15 years, with over 12 of these years working as a local GP.',
      'His particular skills are in performing minor surgery, and the excision of skin lesions. Throughout his work he has been rewarded by the help he has given to his patients. He is especially proud when a person completes their treatment feeling elated by the transformation in their appearance. This has led to a growing interest in aesthetics, particularly with body contouring procedures and hair rejuvenation.',
      'Dr Virmani is currently a locally practising GP. He aims to continue this service within his role at The One Clinic, as well as focusing on aesthetic procedures and ensuring his patients have access to a wide range of health and well-being treatments.',
    ],
  },
  {
    slug: 'dr-gunjan-bedi',
    name: 'Dr Gunjan Bedi',
    credentials: 'MBBS, MRCpsych, MRCGP, BCAM',
    initials: 'GB',
    image: '/images/imgi_21_team-thumb-BEDI.jpg',
    role: 'General Practitioner & Psychiatrist',
    profileUrl: '/team/dr-gunjan-bedi',
    bio: [
      'Dr Gunjan Bedi brings a unique and comprehensive perspective to patient care, combining qualifications in General Practice, Psychiatry, and Aesthetic Medicine.',
      'Her breadth of expertise allows her to take a truly holistic approach, addressing both the physical and psychological dimensions of each patient\'s health and wellbeing.',
    ],
  },
  {
    slug: 'mr-thangasamy-sankar',
    name: 'Mr Thangasamy Sankar',
    credentials: 'FRCS',
    initials: 'TS',
    image: '/images/Mr. Thangasamy Sankar.jpg',
    role: 'Consultant Plastic Surgeon & Laser Specialist',
    bio: [
      'Mr Thangasamy Sankar is a highly skilled Consultant Plastic Surgeon holding the prestigious FRCS qualification, with specialist expertise in both surgical aesthetics and laser treatments.',
      'His surgical precision and in-depth knowledge of laser technology make him an invaluable member of The One Clinic team, offering patients access to world-class interventional care.',
    ],
  },
  {
    slug: 'dr-mahesh-kodivalasa',
    name: 'Dr Mahesh Kodivalasa',
    credentials: '',
    initials: 'MK',
    image: '/images/Dr Mahesh Kodivalasa.webp',
    role: 'Doctor',
    bio: [
      'Dr Mahesh Kodivalasa is a valued member of The One Clinic medical team, bringing dedication and clinical expertise to every patient interaction.',
      'Committed to the highest standards of care, Dr Kodivalasa works closely with colleagues to deliver comprehensive, personalised treatment plans.',
    ],
  },
  {
    slug: 'dr-hari-subramaniam',
    name: 'Dr Hari Subramaniam',
    credentials: 'MSc, MD, DPM, DNB, FRCPsych',
    initials: 'HS',
    image: '/images/Dr Hari Subramaniam.webp',
    role: 'Consultant Psychiatrist',
    bio: [
      'Dr Hari Subramaniam is a Consultant Psychiatrist with an impressive portfolio of qualifications including MSc, MD, DPM, DNB, and FRCPsych.',
      'With extensive experience in mental health and complex clinical presentations, Dr Subramaniam brings a depth of expertise that enriches the multidisciplinary approach at The One Clinic.',
    ],
  },
  {
    slug: 'dr-amol-vaze',
    name: 'Dr Amol Vaze',
    credentials: '',
    initials: 'AV',
    image: '/images/Dr Amol Vaze.jpg',
    role: 'Doctor',
    bio: [
      'Dr Amol Vaze is an experienced clinician committed to providing exceptional patient care at The One Clinic.',
      'His approach is grounded in evidence-based medicine and a genuine commitment to improving each patient\'s health outcomes and quality of life.',
    ],
  },
  {
    slug: 'dr-ralph-mitchell',
    name: 'Dr Ralph Mitchell',
    credentials: '',
    initials: 'RM',
    image: '/images/Dr Ralph Mitchell.png',
    role: 'Doctor',
    bio: [
      'Dr Ralph Mitchell is a dedicated member of The One Clinic\'s medical team, bringing clinical expertise and a compassionate approach to every consultation.',
      'He is committed to delivering personalised, high-quality care across a range of medical and aesthetic services.',
    ],
  },
  {
    slug: 'nurse-sanj',
    name: 'Nurse Sanj',
    credentials: '',
    initials: 'NS',
    image: '/images/Nurse Sanj.png',
    role: 'Clinical Nurse',
    bio: [
      'Nurse Sanj is an integral part of the clinical team at The One Clinic, providing expert nursing care and ensuring every patient feels comfortable and well-supported throughout their treatment.',
      'Her professionalism, warmth, and clinical expertise contribute greatly to the premium patient experience at the clinic.',
    ],
  },
  {
    slug: 'chloe',
    name: 'Chloe',
    credentials: '',
    initials: 'C',
    image: '/images/Chloe.jpg',
    role: 'Patient Care Team',
    bio: [
      'Chloe is a valued member of The One Clinic\'s patient care team, dedicated to providing a warm, welcoming experience for every visitor.',
      'Her attention to detail and commitment to patient satisfaction ensures that every visit to the clinic is comfortable and positive.',
    ],
  },
  {
    slug: 'hollie',
    name: 'Hollie',
    credentials: '',
    initials: 'H',
    image: '/images/Hollie.jpg',
    role: 'Patient Care Team',
    bio: [
      'Hollie brings enthusiasm and care to her role within The One Clinic\'s patient team, ensuring every patient receives attentive and thoughtful support.',
      'Her dedication to excellence in patient care is central to the outstanding experience the clinic is known for.',
    ],
  },
  {
    slug: 'charley',
    name: 'Charley',
    credentials: '',
    initials: 'CH',
    image: '/images/Charley.png',
    role: 'Patient Care Team',
    bio: [
      'Charley is a committed member of The One Clinic\'s front-of-house and patient care team, playing a key role in creating a welcoming and professional environment.',
      'Her passion for patient wellbeing ensures every visit begins and ends on a positive note.',
    ],
  },
  {
    slug: 'mr-ashish-kelkar',
    name: 'Mr Ashish Kelkar',
    credentials: 'MBBS, MS',
    initials: 'AK',
    image: '/images/team-placeholder.jpg',
    role: 'Consultant General and Colorectal Surgeon',
    profileUrl: '/team/mr-ashish-kelkar',
    yearQualified: 1991,
    specialtyMemberships: ['Royal College of Surgeons of Edinburgh'],
    bio: [
      'Mr Ashish Kelkar is a mightily experienced and highly regarded consultant general and colorectal surgeon who specialises in colorectal cancer, rectal bleeding, haemorrhoids, hernias and hernia surgery, anal fissures, and gallbladder surgery. He is currently practising at the Woodlands Hospital in Kettering.',
      'Mr Kelkar, who also possesses expertise in inflammatory bowel disease, rectal prolapse surgery, and pelvic floor function, successfully completed an MBBS in medicine at the Seth GS Medical College and King Edward Memorial Hospital in Mumbai in 1991, and shortly afterwards followed this up by obtaining a masters in surgery from the King Edward Memorial Hospital in 1995.',
      'Mr Kelkar is also an expert when it comes to performing both laparoscopic surgery and open cholecystectomies. He is a member of the Royal College of Surgeons of Edinburgh and has published an extensive amount of peer-reviewed articles in well-established medical journals, with a particular focus on colorectal cancer and lymph node retrieval in colorectal cancer patients.',
    ],
  },
  {
    slug: 'dr-veena-patel',
    name: 'Dr Veena Patel',
    credentials: 'MBBS, MEd, FHEA, FRCP',
    initials: 'VP',
    image: '/images/team-placeholder.jpg',
    role: 'Consultant Rheumatologist',
    profileUrl: '/team/dr-veena-patel',
    specialtyMemberships: ['FRCP'],
    bio: [
      'Dr Veena Patel is a Consultant Rheumatologist at Nuffield Health Leicester Hospital and also works at the University Hospital of Leicester.',
      'As a specialist, she has extensive experience in managing conditions such as rheumatoid arthritis, psoriatic arthritis, ankylosing spondylitis (commonly presenting as back pains), soft tissue rheumatism, connective tissue diseases, metabolic bone disorders, osteoporosis, muscle disorders and osteoarthritis.',
      'She regularly teaches both undergraduate and postgraduate medical students. She has published many papers in peer-reviewed journals and has the title of Senior Lecturer (Honorary) at the University of Leicester.',
    ],
  },
  {
    slug: 'professor-prashanth-patel',
    name: 'Professor Prashanth Patel',
    credentials: 'MBBS, MSc, FRCPath, FRCP Edin',
    initials: 'PP',
    image: '/images/team-placeholder.jpg',
    role: 'Consultant Metabolic Physician & Chemical Pathologist',
    profileUrl: '/team/professor-prashanth-patel',
    specialtyMemberships: ['FRCPath', 'FRCP'],
    bio: [
      'Professor Prashanth Patel is a Consultant Metabolic Physician and Chemical Pathologist at the University Hospitals of Leicester. His clinical interests are in the management of metabolic bone disease, osteoporosis, vitamin D disorders, parathyroid disorders and the management of health cholesterol and other lipid disorders.',
      'He is Head of Service for the Department of Chemical Pathology and Metabolic Medicine at UHL. He is Chair of the Leicester Osteoporosis Group and the Clinical lead for Metabolic Bone Disease at UHL.',
      'In addition to his clinical work, he also works as an honorary senior lecturer in Cardiovascular Science and is a Clinical Teacher in Metabolic Medicine and Chemical Pathology at the University of Leicester. His research interests include metabolic bone disorders, cholesterol, hypertension and prevention of cardiovascular diseases. He has published numerous papers in these fields and holds an honorary senior lecturer position in the Department of Cardiovascular Science at the University of Leicester.',
    ],
  },
  {
    slug: 'mr-randeep-aujla',
    name: 'Mr Randeep S. Aujla',
    credentials: 'MBChB',
    initials: 'RA',
    image: '/images/team-placeholder.jpg',
    role: 'Consultant Orthopaedic Surgeon',
    profileUrl: '/team/mr-randeep-aujla',
    specialtyMemberships: ['Royal College of Surgeons'],
    bio: [
      'Mr Randeep Aujla is an Internationally fellowship-trained Consultant Orthopaedic Surgeon with a specialist interest in knee conditions and lower limb sporting injuries. His NHS practice is based at the University Hospitals of Leicester and private practice at Spire (Leicester) and Nuffield Health (Leicester).',
      'Specialising in ACL and multi-ligament knee reconstructions, meniscal tears, knee preservation surgery, knee osteoarthritis, hip arthroscopy, Achilles tendon issues, and tendinopathy, Mr Aujla has worked within elite sport since 2014. He has worked with many professional clubs including a 5-year stint as lead club doctor for Coventry City Football Club.',
      'His medical sporting involvement also includes professional cricket (Loughborough Lightning), professional rugby (Coventry Rugby), mixed martial arts, and multi-sport games (European Games; BUCS; School Games). Mr Aujla relishes the opportunity to treat athletes, is very rehabilitation-focused, and works hard to maximise patient function through many treatment modalities including liaising closely with physiotherapists.',
    ],
  },
];

/**
 * Get team member by name
 */
export function getTeamMemberByName(name: string): TeamMember | null {
  return TEAM_MEMBERS.find((member) => member.name === name) || null;
}
