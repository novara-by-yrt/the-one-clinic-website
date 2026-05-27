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
    value: '30 to 60 minutes',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: 'Anaesthetic',
    value: 'Local anaesthetic',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 14l-7 7-7-7"/>
        <path d="M12 3v18"/>
      </svg>
    ),
  },
  {
    label: 'Histology',
    value: 'Sent for analysis',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        <line x1="11" y1="8" x2="11" y2="14"/>
        <line x1="8" y1="11" x2="14" y2="11"/>
      </svg>
    ),
  },
  {
    label: 'Recovery',
    value: '5 to 14 days',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: 'Stitches',
    value: 'Removed at 7 to 14 days',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 12h18"/>
        <path d="M6 9l-3 3 3 3"/>
        <path d="M18 9l3 3-3 3"/>
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
    title: 'Initial Consultation & Assessment',
    desc: 'A thorough dermatological assessment of your lesion, including a review of your skin history, sun exposure, and any prior biopsy results, so your doctor can confirm diagnosis and plan the most appropriate excision.',
  },
  {
    n: '02',
    title: 'Surgical Excision',
    desc: 'Under local anaesthetic, the BCC is removed with a defined margin of healthy tissue to ensure complete clearance. The wound is closed in layers using fine sutures, with meticulous attention to cosmetic outcome.',
  },
  {
    n: '03',
    title: 'Histology & Wound Care',
    desc: 'All excised tissue is sent for histological analysis to confirm complete removal. You will receive clear written wound-care instructions, dressings, and direct access to our team for any concerns during healing.',
  },
  {
    n: '04',
    title: 'Follow-Up Review',
    desc: 'Sutures are removed between 7 and 14 days, with a follow-up review to discuss histology results, assess healing, and provide guidance on scar care and ongoing skin surveillance.',
  },
];

const TECH_CARDS = [
  {
    eyebrow: '01',
    title: 'Assessment & Diagnosis',
    desc: 'A comprehensive clinical examination and dermoscopy by our GMC-registered doctors confirms the presence of a basal cell carcinoma and rules out other lesions. Where indicated, a diagnostic biopsy is arranged before definitive surgery.',
  },
  {
    eyebrow: '02',
    title: 'Surgical Excision',
    desc: 'Precise surgical excision is performed under local anaesthetic with an appropriate margin of healthy tissue around the tumour. Layered closure techniques are used to minimise tension, optimise healing, and produce the finest possible scar.',
  },
  {
    eyebrow: '03',
    title: 'Histology & Follow-Up',
    desc: 'Every excised specimen is sent for independent histopathological analysis to confirm complete removal. A structured follow-up review covers your results, suture removal, scar care, and a plan for ongoing skin surveillance.',
  },
];

const ELIGIBILITY = [
  'Noticed a suspicious lesion, pearly bump, or non-healing sore on sun-exposed skin',
  'Had a biopsy confirming a basal cell carcinoma that now requires removal',
  'Concerned about a recurrence of a previously treated BCC or other skin lesion',
  'Have significant sun-damaged skin or a personal history of non-melanoma skin cancer',
  'Have a strong family history of skin cancer and prefer prompt private assessment',
  'Want to avoid lengthy NHS waiting lists for skin cancer removal and follow-up',
];

const TREATED_BENEFITS = [
  {
    title: 'Prompt Treatment',
    desc: 'Avoid lengthy NHS waiting lists with prompt private appointments. Early removal of BCC reduces local tissue damage and the risk of recurrence.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'GMC-Registered Surgeons',
    desc: 'Procedures are performed by experienced GMC-registered doctors with advanced skills in minor surgery, dermoscopy, and skin cancer management.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    title: 'Minimal Scarring',
    desc: 'Careful planning, fine layered closure, and meticulous suturing produce the best possible cosmetic outcome and a discreet, gradually fading scar.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    title: 'Histology Confirmation',
    desc: 'All excised tissue is sent for independent histopathological analysis to confirm complete removal and verify diagnosis, giving you full peace of mind.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    title: 'Local Anaesthetic',
    desc: 'Performed under local anaesthetic in our comfortable Leicester clinic, avoiding general anaesthesia, hospital stays, and prolonged recovery.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    title: 'Same-Clinic Follow-Up',
    desc: 'Suture removal, histology results, wound checks, and scar care all happen with the same trusted team who performed your surgery, ensuring continuity of care.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

const CONDITIONS_FACE = [
  'Nose',
  'Forehead',
  'Cheeks',
  'Ears',
  'Eyelids',
  'Lips',
];

const CONDITIONS_BODY = [
  'Chest',
  'Back',
  'Shoulders',
  'Arms',
  'Legs',
  'Scalp',
];

const CLINIC_REASONS = [
  { n: '01', text: 'GMC-registered doctors with extensive minor surgery and skin cancer experience.' },
  { n: '02', text: 'Prompt private appointments with no GP referral required.' },
  { n: '03', text: 'Independent histology on every excision for complete diagnostic certainty.' },
  { n: '04', text: 'Layered closure techniques designed for the best possible cosmetic outcome.' },
  { n: '05', text: 'Continuity of care, with surgery, suture removal, and follow-up all in one clinic.' },
  { n: '06', text: 'Trusted Leicester clinic with strong reviews and a calm, modern environment.' },
];

const OTHER_LESIONS = [
  {
    title: 'Basal Cell Carcinoma (BCC)',
    desc: 'Surgical excision of the most common non-melanoma skin cancer, with histological confirmation of complete removal.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    title: 'Squamous Cell Carcinoma (SCC)',
    desc: 'Prompt assessment and surgical removal of SCC lesions, with histology to confirm clear margins and inform follow-up surveillance.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Moles',
    desc: 'Removal of suspicious, changing, or cosmetically concerning moles, with all specimens sent for routine histology where clinically appropriate.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="4" fill="currentColor"/>
      </svg>
    ),
  },
  {
    title: 'Cysts',
    desc: 'Complete excision of epidermoid, pilar, and sebaceous cysts, including the cyst wall, to minimise the risk of recurrence and inflammation.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="12" rx="9" ry="6"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    ),
  },
  {
    title: 'Lipomas',
    desc: 'Surgical removal of benign fatty lumps from the trunk, limbs, and shoulders under local anaesthetic, with discreet, well-planned scars.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 14c0-5 4-9 8-9s8 4 8 9-4 5-8 5-8 0-8-5z"/>
      </svg>
    ),
  },
  {
    title: 'Skin Tags',
    desc: 'Fast, comfortable removal of skin tags around the neck, underarms, and eyelids, restoring smooth skin with minimal downtime.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2v6"/>
        <circle cx="12" cy="14" r="6"/>
      </svg>
    ),
  },
  {
    title: 'Seborrhoeic Keratoses',
    desc: 'Treatment of these common, benign, often pigmented lesions that can mimic skin cancers, with histology where diagnosis needs to be confirmed.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 12c2-4 6-6 9-6s7 2 9 6c-2 4-6 6-9 6s-7-2-9-6z"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    ),
  },
];

const FAQS = [
  {
    question: 'What is a basal cell carcinoma (BCC)?',
    answer:
      'A basal cell carcinoma (BCC) is the most common form of non-melanoma skin cancer, arising from the basal cells in the deepest layer of the epidermis. BCCs are typically slow-growing and locally invasive but rarely spread to other parts of the body. They are usually caused by long-term sun or ultraviolet exposure and most commonly appear on sun-exposed areas such as the face, ears, neck, scalp, and upper trunk.',
  },
  {
    question: 'Is a BCC dangerous and does it count as skin cancer?',
    answer:
      'Yes, a BCC is a form of skin cancer, but it is the least aggressive type. It rarely spreads to lymph nodes or distant organs. However, if left untreated, a BCC can grow deeper and damage surrounding tissue, including cartilage, muscle, and bone in advanced cases. For this reason, prompt removal and histological confirmation are strongly recommended.',
  },
  {
    question: 'How is BCC removal performed?',
    answer:
      'BCC removal is performed as a minor surgical procedure in our Leicester clinic under local anaesthetic. The lesion is excised along with a defined margin of healthy tissue to ensure complete removal, and the wound is closed in layers using fine sutures. The excised specimen is then sent to an independent histopathology laboratory to confirm clear margins and verify the diagnosis.',
  },
  {
    question: 'Will I have a scar after BCC removal?',
    answer:
      'Any surgical excision will leave a scar, but our team take great care to plan the incision along natural skin tension lines and use layered closure with fine sutures to minimise its appearance. Most scars settle and fade significantly over 6 to 12 months. You will receive detailed scar-care advice at your follow-up review.',
  },
  {
    question: 'Why is histology important after BCC excision?',
    answer:
      'Histology is the microscopic examination of the excised tissue by a specialist histopathologist. It confirms that the lesion is a BCC, identifies its subtype, and crucially verifies that the surgical margins are clear of tumour. This is the gold-standard way to ensure complete removal and decide whether any further treatment or surveillance is needed.',
  },
  {
    question: 'Can a BCC come back after it is removed?',
    answer:
      'When a BCC is excised with clear histological margins, the risk of recurrence at the same site is low. However, anyone who has had one BCC has a higher chance of developing further BCCs elsewhere on sun-damaged skin. We recommend regular skin checks and prompt review of any new or changing lesions.',
  },
  {
    question: 'How long is recovery after BCC removal?',
    answer:
      'Most patients recover quickly. Wounds typically heal over 5 to 14 days, with sutures removed at 7 to 14 days depending on the location. Bruising and swelling settle within a week or two, and the scar continues to fade and remodel over several months. You will receive written aftercare instructions and access to our team for any concerns.',
  },
  {
    question: 'How much does BCC removal cost at The One Clinic?',
    answer:
      'BCC removal at The One Clinic starts from £350. The final cost depends on the size and location of the lesion and the complexity of closure. A full quote will be provided at your consultation, and pricing includes the procedure, histology, suture removal, and follow-up review.',
  },
  {
    question: 'Do I need a GP referral for BCC removal?',
    answer:
      'No referral is required. You can book a private consultation directly with our team at The One Clinic. Our doctors will examine the lesion, discuss your history, and recommend the most appropriate course of action. If surgical removal is indicated, this can usually be arranged promptly without further referral.',
  },
  {
    question: 'How do I look after my skin after BCC removal?',
    answer:
      'After your procedure, keep the wound clean and dry as advised, avoid swimming and strenuous exercise until sutures are removed, and protect the area from sun exposure during healing. Long-term, daily SPF, regular self-checks, and routine clinical skin reviews are strongly recommended to reduce the risk of further BCCs.',
  },
];

const RELATED = [
  { title: 'Mole Removal',              href: '/treatments/mole-removal-leicester', desc: 'Safe surgical removal of suspicious or cosmetically concerning moles with histology where indicated.' },
  { title: 'Skin Lesion Removal',       href: '/treatments/skin-lesions-leicester',            desc: 'Expert excision of cysts, lumps, and benign skin lesions under local anaesthetic.' },
  { title: 'Lipoma Removal',            href: '/treatments/lipoma-removal-leicester',         desc: 'Minor surgical removal of fatty lumps with discreet, well-planned scarring.' },
  { title: 'Dermatologist Consultation', href: '/treatments/dermatologist',          desc: 'Private dermatology assessment for skin concerns, lesions, and long-term skin health.' },
];

/* ── Page component ───────────────────────────────────────────── */
export default function BCCRemovalPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Basal Cell Carcinoma Removal Leicester, hero"
        data-section-theme="dark"
      >
        {/* Breadcrumb, pinned to top of hero */}
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Treatments', href: '/treatments' },
                { label: 'BCC Removal Leicester' },
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
                Skin Cancer Treatment
              </motion.span>

              <motion.h1 className={styles.heroTitle} variants={fadeUp}>
                Basal Cell Carcinoma Removal Leicester
              </motion.h1>

              <motion.p className={styles.heroDesc} variants={fadeUp}>
                Private, prompt removal of basal cell carcinoma by our GMC-registered doctors,
                with full histological confirmation and meticulous attention to minimal scarring.
              </motion.p>

              <motion.div className={styles.heroCtas} variants={fadeUp}>
                <BookConsultationButton className={styles.heroCtaPrimary}>
                  Book Consultation
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
                  GMC-registered doctors
                </span>
                <span className={styles.heroTrustDivider} aria-hidden="true" />
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  Prompt appointments, no GP referral
                </span>
                <span className={styles.heroTrustDivider} aria-hidden="true" />
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                  </svg>
                  Trusted by Leicester patients
                </span>
              </motion.div>
            </div>

            {/* Right: image */}
            <motion.div className={styles.heroImageWrap} variants={fadeUp}>
              <Image
                src="/images/endolift-work.jpg"
                alt="Basal cell carcinoma removal at The One Clinic Leicester"
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
          3A. WHAT IS BASAL CELL CARCINOMA?
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
                <h2 className={styles.combinedHeading}>What is Basal Cell Carcinoma?</h2>
                <p className={styles.combinedDesc}>
                  Basal cell carcinoma (BCC) is the most common form of non-melanoma skin cancer.
                  It arises from the basal cells of the epidermis and is typically slow-growing,
                  locally invasive, and very rarely spreads to other parts of the body. The
                  definitive treatment for most BCCs is surgical excision under local anaesthetic,
                  followed by histological confirmation that the lesion has been completely removed.
                </p>
              </motion.div>
              <motion.div className={styles.combinedCtaWrapper} variants={fadeUp}>
                <BookConsultationButton className={styles.combinedCta}>
                  Book Your Consultation
                </BookConsultationButton>
              </motion.div>
            </motion.div>

            {/* Right: Wistia video */}
            <motion.div className={styles.whatIsVideoWrap} variants={fadeUp}>
              <Image
                src="/images/Doctor2.jpg"
                alt="Basal cell carcinoma treatment at The One Clinic Leicester"
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
              BCC Removal at a Glance
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
          COMPREHENSIVE BCC APPROACH
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
              A Comprehensive BCC Approach
            </motion.h2>
            <motion.p className={styles.combinationIntroText} variants={fadeUp}>
              At The One Clinic, our BCC removal pathway brings together expert diagnosis, precise
              surgery, and independent histology, giving you complete clinical certainty alongside
              the best possible cosmetic outcome.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.techCardsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {TECH_CARDS.map((card) => (
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
            <p className={styles.finalResultsEyebrow}>Complete Care</p>
            <p className={styles.finalResultsText}>
              When combined, careful assessment, precise surgical excision, and independent
              histology deliver complete BCC care, with definitive removal, clear diagnosis,
              and a planned pathway for follow-up and long-term skin health.
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
              Your BCC Removal Journey
            </motion.h2>
          </motion.div>

          <motion.ol
            className={styles.journeyList}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            aria-label="BCC removal treatment journey steps"
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
          TREATED BENEFITS
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
              Benefits of BCC Removal With Us
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
          5. WHY CHOOSE BCC REMOVAL
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
              Who Is BCC Removal For?
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
              Private BCC removal at The One Clinic may be the right choice if you have:
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
            <motion.p className={styles.eligibilityClosing} variants={fadeUp}>
              If any of these apply to you, private BCC removal with our team could be the right
              next step. A consultation will confirm the diagnosis and the most suitable plan.
            </motion.p>
            <motion.div variants={fadeUp}>
              <BookConsultationButton className={`${styles.combinedCta} ${styles.ctaWhiteInvert}`}>
                Book Your Consultation
              </BookConsultationButton>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          6. HOW DOES BCC REMOVAL WORK
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
              How Does BCC Removal Work?
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
              BCC removal is a precise minor surgical procedure. After the diagnosis is confirmed,
              your doctor maps out a planned excision around the lesion, including an appropriate
              margin of healthy tissue based on its size, location, and subtype. The area is
              cleansed and infiltrated with local anaesthetic so the procedure itself is
              comfortable and painless.
            </motion.p>
            <motion.p className={styles.howPara} variants={fadeUp}>
              The tumour is then excised in a controlled, elliptical pattern that respects the
              skin&apos;s natural tension lines. The wound is closed in layers using fine absorbable
              and non-absorbable sutures, optimising healing and minimising scarring. Every
              specimen is sent for independent histopathological analysis to confirm complete
              removal and inform any future surveillance.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.howCoversWrap}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.howCoversLabel} variants={fadeUp}>Your BCC Procedure Covers</motion.p>
            <motion.ul className={styles.howCoversList} role="list" variants={stagger(0.08)}>
              {[
                'Local anaesthetic',
                'Tumour excision with margins',
                'Layered wound closure',
                'Histology analysis',
                'Aftercare advice',
                'Suture removal',
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
          RESULTS, AFTERCARE & SIDE EFFECTS
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
              Results, Aftercare &amp; Side Effects
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.resultsAfterGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* Card 1, Results */}
            <motion.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                    <polyline points="17 6 23 6 23 12"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>What Results Can You Expect?</h3>
              </div>
              <p className={styles.resultsAfterCardBody}>
                The primary result is complete removal of the BCC, confirmed by independent
                histology. Once the wound has healed, you are left with a discreet linear scar
                that continues to fade and remodel over the following months.
              </p>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                Histology results are typically discussed at your follow-up review, alongside any
                advice on long-term skin surveillance for new or changing lesions.
              </p>
            </motion.div>

            {/* Card 2, Side Effects */}
            <motion.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>Side Effects</h3>
              </div>
              <p className={styles.resultsAfterCardBody}>
                BCC excision is generally very safe when performed by experienced doctors. Most
                patients experience only mild, temporary effects:
              </p>
              <ul className={styles.resultsAfterCardList} role="list">
                {[
                  'Bruising and mild swelling around the wound',
                  'Tightness or pulling sensation at the suture line',
                  'A red or pink scar that gradually fades over months',
                ].map((item) => (
                  <li key={item} className={styles.resultsAfterCardListItem}>
                    <span className={styles.resultsAfterDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                More significant complications, such as infection or wound separation, are
                uncommon. You will receive clear written advice on warning signs to look out for.
              </p>
            </motion.div>

            {/* Card 3, Aftercare */}
            <motion.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>Aftercare Tips</h3>
              </div>
              <ul className={styles.resultsAfterCardList} role="list">
                {[
                  'Keep the wound clean and dry as advised by your doctor',
                  'Avoid swimming, saunas, and strenuous exercise until sutures are removed',
                  'Sutures are typically removed at 7 to 14 days, depending on the site',
                  'Protect the scar from direct sun and apply SPF once healed',
                ].map((item) => (
                  <li key={item} className={styles.resultsAfterCardListItem}>
                    <span className={styles.resultsAfterDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          OTHER SKIN LESIONS WE REMOVE
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
              Beyond BCC
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Other Skin Lesions We Remove
            </motion.h2>
            <motion.p className={styles.beforeAfterSubheading} variants={fadeUp}>
              Alongside BCC removal, our minor surgery team safely treat a wide range of skin
              lumps, bumps, and lesions in our Leicester clinic, with histology where indicated.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.treatedBenefitsGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {OTHER_LESIONS.map((l) => (
              <motion.div
                key={l.title}
                className={styles.treatedBenefitCard}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
              >
                <span className={styles.treatedBenefitIconWrap} aria-hidden="true">
                  {l.icon}
                </span>
                <h3 className={styles.treatedBenefitTitle}>{l.title}</h3>
                <p className={styles.treatedBenefitDesc}>{l.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          PATIENT REVIEWS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════════ */}
      <section className={styles.ctaBanner} data-section-theme="dark" aria-label="Book BCC removal consultation">
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
              Don&apos;t Wait With A BCC,<br />Book Prompt Expert Removal Today.
            </motion.h2>
            <motion.p className={styles.ctaBannerSub} variants={fadeUp}>
              Our GMC-registered team will assess your lesion, plan the safest excision, and
              guide you through histology and follow-up, all under one roof in Leicester.
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
          7. COMMON BCC LOCATIONS
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
              Common BCC Locations
            </motion.h2>
            <motion.p className={styles.conditionsIntro} variants={fadeUp}>
              BCCs most often appear on areas of skin with long-term sun exposure. Our team can
              safely remove BCCs across the following common locations on the face and body.
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
              <p className={styles.areasGroupLabel}>Face &amp; Head</p>
              <ul className={styles.areasGroupList} role="list">
                {CONDITIONS_FACE.map((area) => (
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
              <p className={styles.areasGroupLabel}>Body</p>
              <ul className={styles.areasGroupList} role="list">
                {CONDITIONS_BODY.map((area) => (
                  <li key={area} className={styles.areasGroupItem}>
                    <span className={styles.areasItemDot} aria-hidden="true" />
                    {area}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          BEST BCC REMOVAL LEICESTER EXPERIENCE
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
              <p className={styles.eyebrowDark}>BCC Removal</p>
              <h2 className={styles.combinedHeading}>
                Best BCC Removal<br />Leicester Experience
              </h2>
            </motion.div>
            <motion.p className={styles.clinicIntroDesc} variants={fadeUp}>
              Experience the best BCC removal in Leicester at our clinic. Our GMC-registered doctors
              combine careful assessment, precise surgical excision, and independent histology to
              deliver complete care under one roof. From your first consultation to suture removal
              and ongoing skin checks, you stay with the same trusted team every step of the way.
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          COST BANNER
      ════════════════════════════════════════ */}
      <section className={styles.costBanner} data-section-theme="dark" aria-label="BCC removal cost">
        <Container>
          <motion.div
            className={styles.costBannerInner}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.costBannerEyebrow} variants={fadeUp}>
              BCC Removal Cost at The One Clinic
            </motion.p>
            <motion.p className={styles.costBannerPrice} variants={fadeUp}>
              BCC Removal Starts From £350
            </motion.p>
            <motion.p className={styles.costBannerNote} variants={fadeUp}>
              The final price depends on the size, location, and complexity of the lesion and is
              discussed transparently at your consultation. Pricing includes the procedure,
              histology, suture removal, and follow-up review.
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
              Why Choose The One Clinic For BCC Removal
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
