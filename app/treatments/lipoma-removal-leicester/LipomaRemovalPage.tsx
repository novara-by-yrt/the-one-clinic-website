'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Section            from '@/components/ui/Section';
import Container          from '@/components/ui/Container';
import Accordion          from '@/components/ui/Accordion';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import TrustBadges        from '@/components/ui/TrustBadges';
import Breadcrumb         from '@/components/ui/Breadcrumb';
import LeadForm           from '@/components/sections/LeadForm';
import MeetTheExperts     from '@/components/sections/MeetTheExperts';
import Testimonials       from '@/components/sections/Testimonials';
import FinalCTA           from '@/components/sections/FinalCTA';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './page.module.css';

/* ── Static data ──────────────────────────────────────────────── */
const AT_A_GLANCE = [
  {
    label: 'Procedure Time',
    value: '15 to 60 minutes',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: 'Anaesthetic',
    value: 'Local',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    label: 'Removal Method',
    value: 'Surgical Excision',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    label: 'Downtime',
    value: '3 to 7 days',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: 'Stitches',
    value: 'Usually Required',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    label: 'Cost',
    value: 'From £350',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
];

const JOURNEY_STEPS = [
  {
    n: '01',
    title: 'Clinical Assessment',
    desc: 'Your lipoma is examined by our doctor to confirm it is benign and suitable for removal. Full medical history is taken to ensure safe treatment under local anaesthetic.',
  },
  {
    n: '02',
    title: 'Surgical Excision',
    desc: 'A small incision is made under local anaesthetic. The lipoma is carefully removed using precise surgical technique, minimising trauma to surrounding tissue.',
  },
  {
    n: '03',
    title: 'Wound Closure & Aftercare',
    desc: 'The wound is carefully closed with sutures and dressed. You receive detailed aftercare instructions to promote optimal healing and minimise scarring.',
  },
  {
    n: '04',
    title: 'Healing & Follow-up',
    desc: 'Stitches are removed at 7 to 14 days. Most patients resume normal activities within 3 to 7 days. Your doctor will review your scar appearance at follow-up.',
  },
];

const APPROACH_STEPS = [
  {
    eyebrow: '01',
    title: 'Clinical Assessment',
    desc: 'Every lipoma is evaluated by our experienced doctors to confirm benignity and rule out any suspicious features requiring specialist referral.',
  },
  {
    eyebrow: '02',
    title: 'Surgical Excision',
    desc: 'Under local anaesthetic, the lipoma is removed via a carefully planned small incision, with attention to preserving the surrounding tissue and minimising scarring.',
  },
  {
    eyebrow: '03',
    title: 'Wound Closure & Aftercare',
    desc: 'Primary closure is performed with sutures. Histology may be sent to confirm benignity. Detailed aftercare instructions ensure smooth healing.',
  },
];

const ELIGIBILITY = [
  'Adults with benign lipomas causing concern or discomfort',
  'Seeking cosmetic removal of unsightly fatty lumps',
  'Ready to understand the procedure and follow aftercare instructions',
  'Free from bleeding disorders or severe immunosuppression',
  'Willing to attend a consultation for proper assessment',
];

const TREATED_BENEFITS = [
  {
    title: 'Fast & Minimally Invasive',
    desc: 'Lipoma removal is a straightforward minor surgical procedure. Most are removed in a single short session under local anaesthetic with minimal discomfort.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Minimal Scarring',
    desc: 'Our surgeons use precise technique to minimise incision size. Careful wound closure and expert suturing ensure the best possible cosmetic outcome.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Peace of Mind',
    desc: 'Having a lump medically assessed and removed by a doctor provides reassurance. Every lipoma is clinically evaluated to confirm benignity.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    title: 'Expert Medical Team',
    desc: 'All removals at The One Clinic are performed by experienced GMC-registered doctors. No waiting lists, no GP referral required, just expert care.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: 'Permanent Removal',
    desc: 'Once a lipoma is surgically removed, it does not grow back. You achieve permanent resolution of the problem lump.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    title: 'Single-Session Treatment',
    desc: 'Most lipomas are removed in one appointment. Quick procedure, rapid recovery, and swift return to normal life.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
];

const OTHER_LUMPS = [
  {
    title: 'Sebaceous Cysts',
    desc: 'Benign skin cysts that can become inflamed or infected. Safe surgical removal under local anaesthetic.',
  },
  {
    title: 'Skin Tags',
    desc: 'Small benign growths, usually on the neck, armpits, or groin. Easily removed for cosmetic reasons.',
  },
  {
    title: 'Moles',
    desc: 'Pigmented lesions evaluated for benignity. Removed for cosmetic improvement or if changing in appearance.',
  },
  {
    title: 'Dermatofibromas',
    desc: 'Common benign skin nodules. Can be removed if bothersome or for aesthetic reasons.',
  },
  {
    title: 'Warts',
    desc: 'Benign viral growths. Surgical excision offered when other treatments have failed or for quick definitive removal.',
  },
  {
    title: 'Ganglion Cysts',
    desc: 'Non-cancerous lumps typically on the wrist or hand. Removed if painful or affecting function.',
  },
  {
    title: 'Fibromas',
    desc: 'Benign fibrous tissue growths. Safe surgical removal under local anaesthetic with excellent cosmetic results.',
  },
];

const BODY_AREAS_COMMON = [
  'Back & shoulders',
  'Arms',
  'Neck',
  'Abdomen',
  'Legs',
  'Groin',
];

const BODY_AREAS_CHARACTERISTICS = [
  'Soft moveable lump',
  'Painless',
  'Multiple lipomas',
  'Large lipomas',
  'Growing lipoma',
  'Bothersome location',
];

const CLINIC_REASONS = [
  { n: '01', text: 'All-in-one clinic with medical & aesthetic services.' },
  { n: '02', text: 'Highly trained, compassionate doctors.' },
  { n: '03', text: 'Customised treatments based on listening & expertise.' },
  { n: '04', text: 'State-of-the-art facilities & modern equipment.' },
  { n: '05', text: 'Strong reputation & excellent reviews.' },
  { n: '06', text: 'Comprehensive care and referrals with specialists.' },
];

const FAQS = [
  {
    question: 'What is a lipoma?',
    answer:
      'A lipoma is a benign (non-cancerous) soft tissue tumour made up of fatty tissue that grows just beneath the skin. They are very common, typically soft and moveable when pressed. While generally harmless, many people choose removal for cosmetic reasons or if they become uncomfortable or change in appearance.',
  },
  {
    question: 'How is a lipoma removed?',
    answer:
      'Lipoma removal is a minor surgical procedure performed under local anaesthetic. A small incision is made over the lump, the fatty tissue is carefully removed using precise dissection, and the wound is closed with sutures. The procedure typically takes 15 to 60 minutes depending on size and location.',
  },
  {
    question: 'How quickly can I get an appointment?',
    answer:
      'Same-day and next-day appointments are often available at The One Clinic. Contact us and our team will arrange a consultation at the earliest convenient time for you, without needing a GP referral.',
  },
  {
    question: 'Do I need a GP referral for lipoma removal?',
    answer:
      'No referral is needed. You can book directly with The One Clinic. A full medical assessment of the lump is included at your consultation before any treatment takes place to confirm it is suitable for surgical removal.',
  },
  {
    question: 'What is the downtime after lipoma removal?',
    answer:
      'Most patients resume normal, non-strenuous activities within 3 to 7 days. You should avoid heavy lifting and intense exercise for about a week. Stitches are removed at 7 to 14 days depending on location.',
  },
  {
    question: 'What should I expect during healing?',
    answer:
      'You may experience mild discomfort, swelling, and bruising for the first few days, managed with simple analgesia. Keep the wound clean and dry. Discomfort usually settles within 3 to 5 days. The scar fades over weeks to months, with complete healing taking 4 to 6 weeks.',
  },
];

const EXPERTS = [
  {
    name: 'Dr Sumit Virmani',
    credentials: ['MBBS', 'MRCGP', 'Co-Founder'],
    image: '/images/imgi_20_team-thumb-VIRMANI.jpg',
    alt: 'Dr Sumit Virmani, Co-Founder, The One Clinic',
    bio: [
      'Dr Sumit Virmani, the co-founder of The One Clinic, brings over 15 years of medical expertise, including more than a decade as a trusted local GP. With advanced skills in minor surgery and a keen eye for detail, Dr Virmani is passionate about patient care and achieving outstanding results.',
      'His growing interest in aesthetic medicine, particularly body contouring and minor surgical procedures, reflects his commitment to helping patients look and feel their best. Alongside his ongoing GP practice, Dr Virmani continues to offer safe, effective, and transformative treatments at The One Clinic.',
    ],
  },
  {
    name: 'Dr Gunjan Bedi',
    credentials: ['MBBS', 'MRCpsych', 'MRCGP', 'BCAM'],
    image: '/DR-GUNJAN.jpg',
    alt: 'Dr Gunjan Bedi, General Practitioner and Aesthetics Practitioner, The One Clinic',
    bio: [
      'Dr Gunjan Bedi is a highly skilled, advanced aesthetics practitioner at The One Clinic. She is a highly experienced doctor, having worked in the medical sector for over 20 years, with over 10 years service as a GP.',
      'Dr Bedi brings a unique and comprehensive perspective to patient care, combining qualifications in General Practice, Psychiatry, and Aesthetic Medicine. Her breadth of expertise allows her to take a truly holistic approach, addressing both the physical and psychological dimensions of each patient\'s wellbeing.',
    ],
  },
];

const RELATED = [
  { title: 'Skin Lesion Removal',         href: '/treatments/skin-lesion-removal',  desc: 'Removal of benign skin growths with expert precision.' },
  { title: 'Minor Surgery',                href: '/treatments/minor-surgery-leicester',         desc: 'Wide range of minor surgical procedures in-clinic.' },
  { title: 'Body Contouring',              href: '/treatments/body-contouring-leicester',       desc: 'Shape and define your body with precision.' },
  { title: 'Liposuction',                  href: '/treatments/liposuction',           desc: 'Fat reduction and body sculpting for larger areas.' },
];

/* ── Page component ───────────────────────────────────────────── */
export default function LipomaRemovalPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Lipoma Removal Leicester, hero"
        data-section-theme="dark"
      >
        {/* Breadcrumb, pinned to top of hero */}
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Treatments', href: '/treatments' },
                { label: 'Lipoma Removal' },
              ]}
            />
          </Container>
        </div>

        <Container>
          <motion.div
            className={styles.heroInner}
            variants={stagger(0.12)}
            initial="hidden"
            animate="show"
          >
            {/* Left: text */}
            <div className={styles.heroLeft}>
              <motion.span className={styles.heroCategory} variants={fadeUp}>
                Minor Surgical Procedures
              </motion.span>

              <motion.h1 className={styles.heroTitle} variants={fadeUp}>
                Lipoma Removal in Leicester
              </motion.h1>

              <motion.p className={styles.heroDesc} variants={fadeUp}>
                Safe and minimally invasive removal of fatty lumps under local anaesthetic,
                with expert technique and minimal downtime.
              </motion.p>

              <motion.div className={styles.heroCtas} variants={fadeUp}>
                <BookConsultationButton className={styles.heroCtaPrimary}>
                  Book Appointment
                </BookConsultationButton>
              </motion.div>

              {/* Review badges */}
              <motion.div variants={fadeUp}>
                <TrustBadges theme="dark" />
              </motion.div>

              {/* Trust items */}
              <motion.div className={styles.heroTrust} variants={fadeUp}>
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
                    <path d="M4.5 20.118a7.5 7.5 0 0115 0"/>
                    <path d="M18.5 15v5M16 17.5h5"/>
                  </svg>
                  Led by highly trained doctors
                </span>
                <span className={styles.heroTrustDivider} aria-hidden="true" />
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                  </svg>
                  Trusted by patients in Leicester
                </span>
                <span className={styles.heroTrustDivider} aria-hidden="true" />
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="9.5"/>
                    <path d="M12 7.5v9M7.5 12h9"/>
                  </svg>
                  Comprehensive medical care
                </span>
              </motion.div>
            </div>

            {/* Right: image */}
            <motion.div className={styles.heroImageWrap} variants={fadeUp}>
              <Image
                src="/images/Hero Section Lipoma Removal.jpg"
                alt="Lipoma removal surgical procedure at The One Clinic Leicester"
                fill
                priority
                className={styles.heroImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Subtle bottom-fade to blend with section */}
              <div className={styles.heroImageFade} aria-hidden="true" />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          3A. WHAT IS LIPOMA REMOVAL?
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.sectionGray}>
        <Container>
          <motion.div
            className={styles.whatIsGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Left: text */}
            <motion.div className={styles.whatIsContent} variants={stagger(0.12)}>
              <motion.div className={styles.whatIsTextGroup} variants={fadeUp}>
                <p className={styles.eyebrowDark}>About This Treatment</p>
                <h2 className={styles.combinedHeading}>What is a Lipoma?</h2>
                <p className={styles.combinedDesc}>
                  A lipoma is a benign soft tissue tumour, commonly known as a fatty lump, that grows
                  just beneath the skin. These growths are harmless but can be uncomfortable, cosmetically
                  bothersome, or located in inconvenient places. Lipomas are easily removed via minor
                  surgical excision under local anaesthetic with minimal downtime and excellent cosmetic results.
                </p>
              </motion.div>
              <motion.div className={styles.combinedCtaWrapper} variants={fadeUp}>
                <BookConsultationButton className={styles.combinedCta}>
                  Book Your Consultation
                </BookConsultationButton>
              </motion.div>
            </motion.div>

            {/* Right: image panel */}
            <motion.div className={styles.whatIsVideoWrap} variants={fadeUp}>
              <Image
                src="/images/What is Lipoma Removal.jpg"
                alt="Lipoma removal consultation at The One Clinic Leicester"
                fill
                className={styles.whatIsVideoFrame}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          3B. AT A GLANCE
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.whiteBgSection}>
        <div className={styles.whiteBgWrap} aria-hidden="true">
          <Image src="/bg-image-white.png" alt="" fill className={styles.whiteBgImg} sizes="100vw" />
        </div>
        <Container className={styles.whiteBgContent}>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>Quick Facts</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Lipoma Removal at a Glance
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.glanceStandaloneGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {AT_A_GLANCE.map((item) => (
              <motion.div key={item.label} className={styles.glanceCard} variants={fadeUp}>
                <span className={styles.glanceIcon}>{item.icon}</span>
                <span className={styles.glanceLabel}>{item.label}</span>
                <span className={styles.glanceValue}>{item.value}</span>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          OUR APPROACH
      ════════════════════════════════════════ */}
      <Section variant="dark" data-section-theme="dark">
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>
              Our Approach
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Our Lipoma Removal Approach
            </motion.h2>
            <motion.p className={styles.combinationIntroText} variants={fadeUp}>
              At The One Clinic, we combine clinical expertise, surgical precision, and compassionate care
              to deliver safe, effective lipoma removal with minimal scarring and rapid recovery.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.techCardsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {APPROACH_STEPS.map((card) => (
              <motion.div
                key={card.title}
                className={styles.techCard}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
              >
                <span className={styles.techCardEyebrow}>{card.eyebrow}</span>
                <h3 className={styles.techCardTitle}>{card.title}</h3>
                <p className={styles.techCardDesc}>{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className={styles.finalResultsBanner}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <p className={styles.finalResultsEyebrow}>The Result</p>
            <p className={styles.finalResultsText}>
              When performed by an experienced doctor, lipoma removal provides permanent resolution of the
              problem lump, minimal scarring, and rapid return to normal activities, all in a single session.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          4. TREATMENT JOURNEY
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.journeySection}>
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>
              What to Expect
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Your Treatment Journey
            </motion.h2>
          </motion.div>

          <motion.ol
            className={styles.journeyList}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            aria-label="Lipoma removal treatment journey steps"
          >
            {JOURNEY_STEPS.map((step) => (
              <motion.li key={step.n} className={styles.journeyStep} variants={fadeUp}>
                <div className={styles.stepLeft}>
                  <div className={styles.stepNumCircle} aria-hidden="true">{step.n}</div>
                  <div className={styles.stepConnector} aria-hidden="true" />
                </div>
                <div className={styles.stepBody}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          BENEFITS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.whiteBgSection}>
        <div className={styles.whiteBgWrap} aria-hidden="true">
          <Image src="/bg-image-white.png" alt="" fill className={styles.whiteBgImg} sizes="100vw" />
        </div>
        <Container className={styles.whiteBgContent}>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Benefits of Lipoma Removal
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.treatedBenefitsGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {TREATED_BENEFITS.map((b) => (
              <motion.div
                key={b.title}
                className={styles.treatedBenefitCard}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
              >
                <span className={styles.treatedBenefitIconWrap} aria-hidden="true">
                  {b.icon}
                </span>
                <h3 className={styles.treatedBenefitTitle}>{b.title}</h3>
                <p className={styles.treatedBenefitDesc}>{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          5. WHO IS SUITABLE
      ════════════════════════════════════════ */}
      <Section variant="dark" data-section-theme="dark">
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>
              Is This Right for You?
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Who is Suitable for Lipoma Removal?
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.eligibilityWrap}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eligibilityIntro} variants={fadeUp}>
              Lipoma removal is suitable for:
            </motion.p>
            <motion.ul className={styles.eligibilityList} role="list" variants={stagger(0.1)}>
              {ELIGIBILITY.map((item) => (
                <motion.li key={item} className={styles.eligibilityItem} variants={fadeUp}>
                  <span className={styles.eligibilityCheck} aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <polyline points="2,7 5.5,10.5 12,3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div className={styles.eligibilityClosingWrap} variants={stagger(0.1)}>
              <motion.p className={styles.eligibilityClosing} variants={fadeUp}>
                <strong>Not suitable:</strong> Lesions with features suspicious for liposarcoma or other malignancy (requiring specialist referral), patients with bleeding disorders, or those who are severely immunosuppressed (discuss with your doctor).
              </motion.p>
              <motion.div variants={fadeUp}>
                <BookConsultationButton className={`${styles.combinedCta} ${styles.ctaWhiteInvert}`}>
                  Book Your Consultation
                </BookConsultationButton>
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          6. HOW IT WORKS (THE SCIENCE)
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.howSection}>
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              How Lipoma Removal Works
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.howTextGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.howPara} variants={fadeUp}>
              Lipoma removal is performed via surgical excision under local anaesthetic. A small incision is made
              over the lipoma, and careful dissection is used to separate the fatty tumour from surrounding tissue
              with minimal trauma. Tumescent infiltration (dilute anaesthetic solution) may be injected to ease
              removal and reduce bleeding.
            </motion.p>
            <motion.p className={styles.howPara} variants={fadeUp}>
              Once fully removed, the incision is closed with primary sutures using meticulous wound closure technique
              to minimise scarring. The specimen may be sent for histology to confirm benignity and provide you with
              complete peace of mind. Local anaesthetic ensures comfort throughout, and most patients resume normal
              activities within a few days.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.howCoversWrap}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.howCoversLabel} variants={fadeUp}>Why Choose Surgical Excision</motion.p>
            <motion.ul className={styles.howCoversList} role="list" variants={stagger(0.08)}>
              {[
                'Permanent removal , lipoma cannot regrow',
                'Complete histology , confirmation of benignity',
                'Minimal trauma , careful surgical technique',
                'Quick procedure , 15 to 60 minutes',
                'Excellent cosmetic results , expert suturing',
                'Minimal downtime , return to normal quickly',
              ].map((item) => (
                <motion.li key={item} className={styles.howCoversItem} variants={fadeUp}>
                  <span className={styles.howCoversCheck} aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <polyline points="2,6 5,9 10,3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          RESULTS & AFTERCARE
      ════════════════════════════════════════ */}
      <Section variant="dark" data-section-theme="dark">
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>
              Post-Treatment
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              What to Expect: Results &amp; Aftercare
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.resultsAfterGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Card 1, Discomfort */}
            <motion.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>What You May Experience</h3>
              </div>
              <p className={styles.resultsAfterCardBody}>
                Mild discomfort for the first 3 to 5 days, managed easily with over-the-counter analgesia.
                Swelling and bruising typically appear and then resolve within 5 to 10 days.
              </p>
              <ul className={styles.resultsAfterCardList} role="list">
                {[
                  'Mild swelling and tenderness',
                  'Possible bruising around the wound',
                  'Minor oozing the first 24 hours',
                  'Suture line may feel firm initially',
                ].map((item) => (
                  <li key={item} className={styles.resultsAfterCardListItem}>
                    <span className={styles.resultsAfterDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                These effects are normal and expected. Contact us if symptoms worsen or persist beyond expected timeframes.
              </p>
            </motion.div>

            {/* Card 2, Wound Care */}
            <motion.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>Wound Care &amp; Healing</h3>
              </div>
              <ul className={styles.resultsAfterCardList} role="list">
                {[
                  'Keep the wound clean and dry',
                  'Follow dressing change instructions from your doctor',
                  'Stitches are removed at 7 to 14 days depending on location',
                  'Avoid heavy lifting and intense exercise for 7 days',
                  'Scarring is minimal with expert closure',
                ].map((item) => (
                  <li key={item} className={styles.resultsAfterCardListItem}>
                    <span className={styles.resultsAfterDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                Complete healing typically takes 4 to 6 weeks. The scar fades over subsequent months, becoming
                increasingly inconspicuous with time.
              </p>
            </motion.div>

            {/* Card 3, Scar Management */}
            <motion.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                    <polyline points="17 6 23 6 23 12"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>Scar Development</h3>
              </div>
              <p className={styles.resultsAfterCardBody}>
                Scars evolve over time. Initially red or pink, they gradually fade to white or skin-coloured
                and flatten over 12 to 18 months.
              </p>
              <ul className={styles.resultsAfterCardList} role="list">
                {[
                  'Weeks 1,2: Pink or red, raised suture line',
                  'Weeks 2,6: Gradually flattens, colour begins to fade',
                  'Months 3,6: Significant fading and maturation',
                  'Months 6,18: Continued improvement and fading',
                ].map((item) => (
                  <li key={item} className={styles.resultsAfterCardListItem}>
                    <span className={styles.resultsAfterDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                Our expert surgical technique and meticulous wound closure ensure the best possible cosmetic outcome.
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          2. PATIENT REVIEWS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════════ */}
      <section className={styles.ctaBanner} data-section-theme="dark" aria-label="Book lipoma removal consultation">
        {/* Watermark logo */}
        <div className={styles.ctaBannerLogoWrap} aria-hidden="true">
          <Image
            src="/images/Background-logo.png"
            alt=""
            fill
            className={styles.ctaBannerLogo}
            sizes="100vw"
          />
        </div>
        <Container>
          <motion.div
            className={styles.ctaBannerContent}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.h2 className={styles.ctaBannerHeading} variants={fadeUp}>
              Get That Lump Checked.<br />Remove It Today.
            </motion.h2>
            <motion.p className={styles.ctaBannerSub} variants={fadeUp}>
              Book a lipoma removal consultation with our expert doctors.
            </motion.p>
            <motion.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBannerBtn}>
                Book Consultation
              </BookConsultationButton>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          OTHER LUMPS & BUMPS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.whiteBgSection}>
        <div className={styles.whiteBgWrap} aria-hidden="true">
          <Image src="/bg-image-white.png" alt="" fill className={styles.whiteBgImg} sizes="100vw" />
        </div>
        <Container className={styles.whiteBgContent}>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>
              Other Skin Lesions
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Other Lumps &amp; Bumps We Remove
            </motion.h2>
            <motion.p className={styles.beforeAfterSubheading} variants={fadeUp}>
              Beyond lipomas, we safely remove a wide range of benign skin growths at The One Clinic.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.relatedGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {OTHER_LUMPS.map((lump) => (
              <motion.div
                key={lump.title}
                className={styles.relatedCard}
                variants={fadeUp}
              >
                <h3 className={styles.relatedTitle}>{lump.title}</h3>
                <p className={styles.relatedDesc}>{lump.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          BODY AREAS WE TREAT
      ════════════════════════════════════════ */}
      <Section variant="dark" data-section-theme="dark" className={styles.conditionsSection}>
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>
              Treatable Areas
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Body Areas We Treat
            </motion.h2>
            <motion.p className={styles.conditionsIntro} variants={fadeUp}>
              Lipomas can appear anywhere on the body. We treat lipomas on all common sites with expert precision.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.areasColumns}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div
              className={styles.areasGroup}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
            >
              <p className={styles.areasGroupLabel}>Common Sites</p>
              <ul className={styles.areasGroupList} role="list">
                {BODY_AREAS_COMMON.map((area) => (
                  <li key={area} className={styles.areasGroupItem}>
                    <span className={styles.areasItemDot} aria-hidden="true" />
                    {area}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className={styles.areasGroup}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
            >
              <p className={styles.areasGroupLabel}>Lipoma Characteristics</p>
              <ul className={styles.areasGroupList} role="list">
                {BODY_AREAS_CHARACTERISTICS.map((char) => (
                  <li key={char} className={styles.areasGroupItem}>
                    <span className={styles.areasItemDot} aria-hidden="true" />
                    {char}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          BEST LEICESTER EXPERIENCE
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.clinicIntroSection}>
        <Container>
          <motion.div
            className={styles.clinicIntroBody}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div className={styles.clinicIntroLeft} variants={fadeUp}>
              <p className={styles.eyebrowDark}>Lipoma Treatment</p>
              <h2 className={styles.combinedHeading}>
                Best Lipoma Removal<br />Leicester Experience
              </h2>
            </motion.div>
            <motion.p className={styles.clinicIntroDesc} variants={fadeUp}>
              Experience expert lipoma removal in Leicester at our clinic. Our experienced doctors provide safe,
              minimally invasive removal of fatty lumps with meticulous surgical technique, excellent cosmetic outcomes,
              and personalised care. We take time to understand your concerns and deliver the best possible results
              with minimal downtime and minimal scarring.
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          COST BANNER
      ════════════════════════════════════════ */}
      <section className={styles.costBanner} data-section-theme="dark" aria-label="Lipoma removal cost">
        <Container>
          <motion.div
            className={styles.costBannerInner}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.costBannerEyebrow} variants={fadeUp}>
              Lipoma Removal Pricing at The One Clinic
            </motion.p>
            <motion.p className={styles.costBannerPrice} variants={fadeUp}>
              Lipoma Removal From £350
            </motion.p>
            <motion.p className={styles.costBannerNote} variants={fadeUp}>
              Size and location affect final pricing. Full details and a personalised quote will be provided
              during your consultation with our expert.
            </motion.p>
            <motion.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBannerBtn}>
                Book A Consultation
              </BookConsultationButton>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          WHY CHOOSE THE ONE CLINIC
      ════════════════════════════════════════ */}
      <Section variant="dark" data-section-theme="dark">
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Why Choose The One Clinic For Lipoma Removal
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.clinicReasonsGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {CLINIC_REASONS.map((r) => (
              <motion.div
                key={r.n}
                className={styles.clinicReasonCard}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
              >
                <span className={styles.clinicReasonNumber}>{r.n}</span>
                <p className={styles.clinicReasonText}>{r.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          8. MEET THE EXPERTS
      ════════════════════════════════════════ */}
      <MeetTheExperts />

      {/* ════════════════════════════════════════
          9. FAQ
      ════════════════════════════════════════ */}
      <section className={styles.faqSection} data-section-theme="dark">
        <div className={styles.faqInner}>
          <Container>
            <motion.div
              className={styles.sectionHeaderCentre}
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              <motion.p className={styles.eyebrowLight} variants={fadeUp}>FAQ</motion.p>
              <motion.h2 className={styles.headingLight} variants={fadeUp}>
                Frequently Asked Questions
              </motion.h2>
            </motion.div>

            <motion.div
              className={styles.faqBody}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              <Accordion items={showAllFaqs ? FAQS : FAQS.slice(0, 5)} theme="dark" />

              {FAQS.length > 5 && (
                <div className={styles.faqToggleWrap}>
                  <button
                    className={styles.faqToggleBtn}
                    onClick={() => setShowAllFaqs((v) => !v)}
                    aria-expanded={showAllFaqs}
                  >
                    {showAllFaqs ? (
                      <>
                        Show Less
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M4 10l4-4 4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </>
                    ) : (
                      <>
                        Show More
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </Container>
        </div>
      </section>

      {/* ════════════════════════════════════════
          10. BOOKING FORM
      ════════════════════════════════════════ */}
      <LeadForm />

      {/* ════════════════════════════════════════
          11. RELATED TREATMENTS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.sectionGray}>
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>
              Explore More
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Related Treatments
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.relatedGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {RELATED.map((r) => (
              <motion.div key={r.title} variants={fadeUp}>
                <Link href={r.href} className={styles.relatedCard}>
                  <h3 className={styles.relatedTitle}>{r.title}</h3>
                  <p className={styles.relatedDesc}>{r.desc}</p>
                  <span className={styles.relatedArrow} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════ */}
      <FinalCTA />
    </>
  );
}
