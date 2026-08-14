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
  /** True while a member has no dedicated profile page yet — hides profile links and skips page generation */
  noProfilePage?: boolean;

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
  /** Key areas of expertise shown as tags on the profile page */
  specialties?: string[];
  /** Three headline stats for the profile hero strip, e.g. [{value:'15+', label:'Years in Medicine'}] */
  stats?: Array<{ value: string; label: string }>;
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
    stats: [
      { value: '15+', label: 'Years in Medicine' },
      { value: '12+', label: 'Years as a GP' },
      { value: 'MRCGP', label: 'Royal College Qualified' },
    ],
    specialties: ['Minor Surgery', 'Skin Lesion Excision', 'Body Contouring', 'Hair Rejuvenation', 'GP Services', 'Aesthetic Medicine'],
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
    image: '/DR-GUNJAN.jpg',
    role: 'General Practitioner & Psychiatrist',
    profileUrl: '/team/dr-gunjan-bedi',
    stats: [
      { value: '20+', label: 'Years in Medicine' },
      { value: '10+', label: 'Years as a GP' },
      { value: 'BCAM', label: 'Aesthetic Medicine Qualified' },
    ],
    specialties: ['Aesthetic Medicine', 'Dermal Fillers', 'General Practice', 'Psychiatry', 'Wrinkle Relaxing', 'Skin Treatments'],
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
    image: '/images/MR-SANKAR-updated.jpg',
    role: 'Medical Director & Consultant Plastic Surgeon',
    stats: [
      { value: 'Medical', label: 'Director' },
      { value: 'FRCS', label: 'Fellowship Qualified' },
      { value: 'Plastic', label: 'Surgery Specialist' },
    ],
    specialties: ['Plastic Surgery', 'Laser Treatments', 'Aesthetic Surgery', 'Skin Rejuvenation', 'Scar Revision'],
    bio: [
      'Mr Thangasamy Sankar is a highly skilled Consultant Plastic Surgeon holding the prestigious FRCS qualification, with specialist expertise in both surgical aesthetics and laser treatments.',
      'His surgical precision and in-depth knowledge of laser technology make him an invaluable member of The One Clinic team, offering patients access to world-class interventional care.',
    ],
  },
  {
    slug: 'dr-hari-subramaniam',
    name: 'Dr Hari Subramaniam',
    credentials: 'MSc, MD, DPM, DNB, FRCPsych',
    initials: 'HS',
    image: '/DR-HARI.jpg',
    role: 'Consultant Psychiatrist',
    stats: [
      { value: 'FRCPsych', label: 'Psychiatry Qualified' },
      { value: 'DNB', label: 'National Board Certified' },
      { value: 'MSc MD', label: 'Advanced Qualifications' },
    ],
    specialties: ['Psychiatry', 'Mental Health', 'Complex Clinical Cases', 'Psychological Assessment', 'Wellbeing'],
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
    image: '/DR-AMOL.jpg',
    role: 'Doctor',
    stats: [
      { value: 'GMC', label: 'Registered Practitioner' },
      { value: 'NHS', label: 'Trained Doctor' },
      { value: 'CQC', label: 'Registered Clinic' },
    ],
    specialties: ['General Medicine', 'Evidence-Based Care', 'Patient Health', 'Clinical Assessment', 'Aesthetic Medicine'],
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
    image: '/DR-RALPH.jpg',
    role: 'Doctor',
    stats: [
      { value: 'GMC', label: 'Registered Practitioner' },
      { value: 'NHS', label: 'Trained Doctor' },
      { value: 'CQC', label: 'Registered Clinic' },
    ],
    specialties: ['General Medicine', 'Aesthetic Medicine', 'Patient Care', 'Clinical Consultation'],
    bio: [
      'Dr Ralph Mitchell is a dedicated member of The One Clinic\'s medical team, bringing clinical expertise and a compassionate approach to every consultation.',
      'He is committed to delivering personalised, high-quality care across a range of medical and aesthetic services.',
    ],
  },
  {
    slug: 'mr-ashish-kelkar',
    name: 'Mr Ashish Kelkar',
    credentials: 'MBBS, MS',
    initials: 'AK',
    image: '/DR-ASHISH.jpg',
    role: 'Consultant General and Colorectal Surgeon',
    profileUrl: '/team/mr-ashish-kelkar',
    yearQualified: 1991,
    specialtyMemberships: ['Royal College of Surgeons of Edinburgh'],
    stats: [
      { value: '30+', label: 'Years in Surgery' },
      { value: 'MBBS MS', label: 'Dual Qualified' },
      { value: 'RCS Ed', label: 'College Member' },
    ],
    specialties: ['Colorectal Cancer', 'Haemorrhoid Removal', 'Hernia Surgery', 'Laparoscopic Surgery', 'Gallbladder Surgery', 'Bowel Surgery'],
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
    image: '/DR-VEENA-PATEL.jpg',
    role: 'Consultant Rheumatologist',
    profileUrl: '/team/dr-veena-patel',
    specialtyMemberships: ['FRCP'],
    stats: [
      { value: 'FRCP', label: 'Royal College Fellow' },
      { value: 'FHEA', label: 'Higher Education Fellow' },
      { value: 'UHL', label: 'Senior Lecturer' },
    ],
    specialties: ['Rheumatoid Arthritis', 'Psoriatic Arthritis', 'Osteoporosis', 'Metabolic Bone Disease', 'Connective Tissue Disorders', 'Osteoarthritis'],
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
    image: '/PROFESSOR-PRASHANTH-PATEL.jpg',
    role: 'Consultant Metabolic Physician & Chemical Pathologist',
    profileUrl: '/team/professor-prashanth-patel',
    specialtyMemberships: ['FRCPath', 'FRCP'],
    stats: [
      { value: 'FRCPath', label: 'Pathology Fellow' },
      { value: 'FRCP', label: 'Physicians Fellow' },
      { value: 'UHL', label: 'Head of Service' },
    ],
    specialties: ['Metabolic Bone Disease', 'Osteoporosis', 'Vitamin D Disorders', 'Cholesterol Management', 'Parathyroid Disorders', 'Chemical Pathology'],
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
    image: '/MR-RANDEEP-S.-AUJLA.jpg',
    role: 'Consultant Orthopaedic Surgeon',
    profileUrl: '/team/mr-randeep-aujla',
    specialtyMemberships: ['Royal College of Surgeons'],
    stats: [
      { value: "Int'l", label: 'Fellowship Trained' },
      { value: '2014', label: 'Elite Sport Since' },
      { value: 'RCS', label: 'College Member' },
    ],
    specialties: ['ACL Reconstruction', 'Knee Surgery', 'Hip Arthroscopy', 'Sports Injuries', 'Meniscal Repair', 'Tendinopathy'],
    bio: [
      'Mr Randeep Aujla is an Internationally fellowship-trained Consultant Orthopaedic Surgeon with a specialist interest in knee conditions and lower limb sporting injuries. His NHS practice is based at the University Hospitals of Leicester and private practice at Spire (Leicester) and Nuffield Health (Leicester).',
      'Specialising in ACL and multi-ligament knee reconstructions, meniscal tears, knee preservation surgery, knee osteoarthritis, hip arthroscopy, Achilles tendon issues, and tendinopathy, Mr Aujla has worked within elite sport since 2014. He has worked with many professional clubs including a 5-year stint as lead club doctor for Coventry City Football Club.',
      'His medical sporting involvement also includes professional cricket (Loughborough Lightning), professional rugby (Coventry Rugby), mixed martial arts, and multi-sport games (European Games; BUCS; School Games). Mr Aujla relishes the opportunity to treat athletes, is very rehabilitation-focused, and works hard to maximise patient function through many treatment modalities including liaising closely with physiotherapists.',
    ],
  },
  {
    slug: 'nurse-sanj',
    name: 'Nurse Sanj',
    credentials: '',
    initials: 'NS',
    image: '/NURSE-SANJ.png',
    role: 'Clinical Nurse',
    stats: [
      { value: 'Expert', label: 'Treatment Care' },
      { value: 'CQC', label: 'Registered Clinic' },
      { value: 'Skilled', label: 'Clinical Nursing' },
    ],
    specialties: ['Clinical Nursing', 'Patient Support', 'Treatment Care', 'Post-Treatment Recovery'],
    bio: [
      'Nurse Sanj is an integral part of the clinical team at The One Clinic, providing expert nursing care and ensuring every patient feels comfortable and well-supported throughout their treatment.',
      'Her professionalism, warmth, and clinical expertise contribute greatly to the premium patient experience at the clinic.',
    ],
  },
  {
    slug: 'laylah',
    name: 'Laylah',
    credentials: '',
    initials: 'L',
    image: '/images/team-member-placeholder.jpg',
    role: 'Skin Therapist',
    stats: [
      { value: '5+', label: 'Years\' Experience' },
      { value: 'Skin', label: 'Health Specialist' },
      { value: '5★', label: 'Client Care' },
    ],
    specialties: ['Skin Health', 'Aesthetic Treatments', 'Personalised Skincare', 'Client Confidence'],
    bio: [
      'Laylah is an Aesthetic Practitioner with five years of experience in the beauty industry and a real passion for skin health.',
      'I love helping people feel confident and comfortable in their skin, and I take pride in creating personalised treatment experiences that make every client feel listened to, cared for and at ease.',
    ],
  },
  {
    slug: 'bhavin-vadhia',
    name: 'Bhavin Vadhia',
    credentials: '',
    initials: 'BV',
    image: '/images/team-member-placeholder.jpg',
    role: 'Clinic Manager',
    noProfilePage: true,
    bio: [
      'Bhavin Vadhia is the Clinic Manager at The One Clinic, overseeing the day-to-day running of the clinic and ensuring every patient receives a smooth, well-organised experience from booking through to aftercare.',
    ],
  },
  {
    slug: 'hollie',
    name: 'Hollie',
    credentials: '',
    initials: 'H',
    image: '/HOLLIE.jpg',
    role: 'Patient Care Team',
    stats: [
      { value: 'Caring', label: 'Patient Support' },
      { value: 'Passionate', label: 'Patient Support' },
      { value: '5★', label: 'Patient Satisfaction' },
    ],
    specialties: ['Patient Experience', 'Appointment Coordination', 'Front of House', 'Patient Wellbeing'],
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
    image: '/CHARLEY.jpg',
    role: 'Patient Care Team',
    stats: [
      { value: 'Dedicated', label: 'Patient Care' },
      { value: 'Seamless', label: 'Patient Journey' },
      { value: '5★', label: 'Patient Satisfaction' },
    ],
    specialties: ['Patient Experience', 'Clinic Coordination', 'Front of House', 'Patient Wellbeing'],
    bio: [
      'Charley is a committed member of The One Clinic\'s front-of-house and patient care team, playing a key role in creating a welcoming and professional environment.',
      'Her passion for patient wellbeing ensures every visit begins and ends on a positive note.',
    ],
  },
];

/**
 * Get team member by name
 */
export function getTeamMemberByName(name: string): TeamMember | null {
  return TEAM_MEMBERS.find((member) => member.name === name) || null;
}
