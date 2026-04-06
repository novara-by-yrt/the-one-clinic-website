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
    bio: [
      'Dr Gunjan Bedi brings a unique and comprehensive perspective to patient care, combining qualifications in General Practice, Psychiatry, and Aesthetic Medicine.',
      'Her breadth of expertise allows her to take a truly holistic approach — addressing both the physical and psychological dimensions of each patient\'s health and wellbeing.',
    ],
  },
  {
    slug: 'dr-mahesh-kodivalasa',
    name: 'Dr Mahesh Kodivalasa',
    credentials: '',
    initials: 'MK',
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
    role: 'Doctor',
    bio: [
      'Dr Ralph Mitchell is a dedicated member of The One Clinic\'s medical team, bringing clinical expertise and a compassionate approach to every consultation.',
      'He is committed to delivering personalised, high-quality care across a range of medical and aesthetic services.',
    ],
  },
  {
    slug: 'mr-thangasamy-sankar',
    name: 'Mr Thangasamy Sankar',
    credentials: 'FRCS',
    initials: 'TS',
    role: 'Consultant Plastic Surgeon & Laser Specialist',
    bio: [
      'Mr Thangasamy Sankar is a highly skilled Consultant Plastic Surgeon holding the prestigious FRCS qualification, with specialist expertise in both surgical aesthetics and laser treatments.',
      'His surgical precision and in-depth knowledge of laser technology make him an invaluable member of The One Clinic team, offering patients access to world-class interventional care.',
    ],
  },
  {
    slug: 'nurse-sanj',
    name: 'Nurse Sanj',
    credentials: '',
    initials: 'NS',
    role: 'Clinical Nurse',
    bio: [
      'Nurse Sanj is an integral part of the clinical team at The One Clinic, providing expert nursing care and ensuring every patient feels comfortable and well-supported throughout their treatment.',
      'Her professionalism, warmth, and clinical expertise contribute greatly to the premium patient experience at the clinic.',
    ],
  },
  {
    slug: 'sam',
    name: 'Sam',
    credentials: '',
    initials: 'S',
    role: 'Patient Coordinator',
    bio: [
      'Sam is a dedicated Patient Coordinator at The One Clinic, ensuring every patient journey runs seamlessly from the first point of contact through to aftercare.',
      'With a friendly, professional manner, Sam helps patients feel informed and at ease at every step.',
    ],
  },
  {
    slug: 'chloe',
    name: 'Chloe',
    credentials: '',
    initials: 'C',
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
    role: 'Patient Care Team',
    bio: [
      'Charley is a committed member of The One Clinic\'s front-of-house and patient care team, playing a key role in creating a welcoming and professional environment.',
      'Her passion for patient wellbeing ensures every visit begins and ends on a positive note.',
    ],
  },
];
