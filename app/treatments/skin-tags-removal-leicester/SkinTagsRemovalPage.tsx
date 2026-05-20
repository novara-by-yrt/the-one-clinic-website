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
    label: 'Session Time',
    value: '15 to 30 minutes',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: 'Treatment Type',
    value: 'Cryotherapy / Excision / Electrocautery',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/>
        <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/>
        <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/>
        <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/>
        <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/>
        <path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/>
        <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/>
      </svg>
    ),
  },
  {
    label: 'Downtime',
    value: 'Minimal',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: 'Tags Per Visit',
    value: 'Multiple',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 .49-3.1"/>
      </svg>
    ),
  },
  {
    label: 'Results',
    value: 'Immediate',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    label: 'Treatment Cost',
    value: 'From £95',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
];

const APPROACH_CARDS = [
  {
    eyebrow: '01',
    title: 'Clinical Assessment',
    desc: 'Every lesion is examined by our medical team before any procedure begins. We confirm the growth is a benign skin tag and check its size, location, and characteristics, ensuring nothing is missed and the safest approach is selected.',
  },
  {
    eyebrow: '02',
    title: 'Removal Technique Selection',
    desc: 'Based on the assessment, we choose the most appropriate method , cryotherapy, surgical excision under local anaesthetic, or electrocautery. Larger or more complex tags benefit from excision, while smaller ones respond well to freezing or heat-based removal.',
  },
  {
    eyebrow: '03',
    title: 'Aftercare & Healing',
    desc: 'Following removal you receive clear aftercare guidance. The treatment site is kept clean and protected. Most patients heal within one to two weeks with minimal marks that fade naturally over time.',
  },
];

const JOURNEY_STEPS = [
  {
    n: '01',
    title: 'Initial Consultation',
    desc: 'Our clinical team reviews your skin tags, discusses your concerns, and confirms the lesions are benign. A personalised treatment plan is prepared during this visit.',
  },
  {
    n: '02',
    title: 'Assessment & Method Selection',
    desc: 'Each tag is assessed individually for size, location, and type. The most appropriate removal technique is selected and explained to you before proceeding.',
  },
  {
    n: '03',
    title: 'Same-Day Removal',
    desc: 'Where suitable, removal is carried out in the same appointment. The procedure is quick and precise, typically taking 15 to 30 minutes depending on the number and location of tags.',
  },
  {
    n: '04',
    title: 'Healing & Aftercare',
    desc: 'Following treatment you receive written aftercare instructions. The site heals within one to two weeks. New tags elsewhere can be reviewed at a follow-up appointment if needed.',
  },
];

const TREATED_BENEFITS = [
  {
    title: 'Fast & Effective',
    desc: 'Skin tags are removed quickly and cleanly in a single session using the method best suited to the size and location of the tag, delivering immediate, visible results.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Minimal Discomfort',
    desc: 'Procedures are performed with local anaesthetic or topical numbing as needed. Most patients experience only mild sensation during treatment and very little discomfort afterwards.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Multiple Tags in One Visit',
    desc: 'Whether you have one skin tag or several, our team assesses and treats multiple tags in a single appointment, saving you time and giving you immediate results.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    title: 'Clinically Assessed',
    desc: 'Every lesion is examined by our clinical team before removal to confirm it is benign. If any concern is noted, appropriate advice and onward referral is provided without delay.',
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
    title: 'No Scarring',
    desc: 'Our experienced practitioners use techniques that minimise trauma to the surrounding skin, leaving only a small mark that fades naturally within a few weeks in the majority of cases.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    title: 'Permanent Removal',
    desc: 'Once a skin tag is properly removed it will not grow back at the same site. New tags may develop elsewhere over time and can be treated at a future appointment as needed.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
];

const ELIGIBILITY_SUITABLE = [
  'Adults with one or more benign skin tags confirmed by clinical assessment',
  'Those experiencing cosmetic concern from skin tags on visible areas such as the neck or eyelids',
  'Patients whose skin tags cause physical irritation from rubbing against clothing or jewellery',
  'Anyone who wants quick, permanent removal without a GP referral or long wait',
];

const ELIGIBILITY_NOT_SUITABLE = [
  'Lesions that appear atypical, irregular, or suspicious , these will be referred appropriately',
  'Patients with known bleeding disorders without prior medical clearance',
  'Immunosuppressed individuals should discuss suitability with our team before booking',
];

const HOW_CARDS = [
  {
    eyebrow: '01',
    title: 'Cryotherapy',
    desc: 'Liquid nitrogen is applied precisely to the skin tag, freezing the tissue. The frozen cells die and the tag falls off naturally within one to two weeks. This method is ideal for smaller, superficial tags and requires no incision.',
  },
  {
    eyebrow: '02',
    title: 'Surgical Excision',
    desc: 'The tag is numbed with a local anaesthetic and then cleanly removed using fine surgical scissors or a scalpel. This is the preferred approach for larger tags or those in sensitive locations, giving an immediate, precise result.',
  },
  {
    eyebrow: '03',
    title: 'Electrocautery',
    desc: 'A fine probe delivers a controlled electrical current to the base of the tag, using heat to destroy the tissue and simultaneously seal the wound. This method is particularly effective for multiple smaller tags and minimises bleeding.',
  },
];

const LESIONS_REMOVED = [
  {
    title: 'Moles',
    desc: 'Benign pigmented lesions clinically assessed before removal by excision or shave biopsy.',
  },
  {
    title: 'Sebaceous Cysts',
    desc: 'Enclosed sacs of keratin beneath the skin surface, removed by surgical excision under local anaesthetic.',
  },
  {
    title: 'Lipomas',
    desc: 'Soft, fatty lumps that develop under the skin, removed surgically through a small incision.',
  },
  {
    title: 'Warts & Verrucae',
    desc: 'HPV-related growths treated by cryotherapy, electrocautery, or surgical removal depending on size and site.',
  },
  {
    title: 'Dermatofibromas',
    desc: 'Firm, benign nodules in the skin that can be excised when causing cosmetic concern or discomfort.',
  },
  {
    title: 'Seborrhoeic Keratosis',
    desc: 'Rough, waxy, non-cancerous growths removed by cryotherapy, curettage, or electrocautery.',
  },
  {
    title: 'Milia',
    desc: 'Tiny keratin-filled cysts, commonly around the eyes, removed by careful extraction or superficial excision.',
  },
];

const CONDITIONS_BODY = [
  'Neck',
  'Armpits',
  'Groin',
  'Eyelids / periorbital area',
  'Under breasts',
  'Back & torso',
];

const CONDITIONS_TYPES = [
  'Pedunculated tags',
  'Sessile tags',
  'Small thread-like tags',
  'Large tags',
  'Clustered tags',
  'Irritated or inflamed tags',
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
    question: 'What are skin tags and are they harmful?',
    answer:
      'Skin tags (acrochordons) are small, soft growths of skin that hang off the body, typically on the neck, armpits, groin, eyelids, or under the breasts. They are entirely benign and pose no medical risk, but many people find them cosmetically bothersome or physically irritating, particularly if they catch on clothing or jewellery.',
  },
  {
    question: 'How are skin tags removed at The One Clinic?',
    answer:
      'Depending on the size and location of the tag, we use cryotherapy (liquid nitrogen freezing), surgical excision under local anaesthetic, or electrocautery (heat). Your clinician will assess each tag at your appointment and recommend the most appropriate and effective method.',
  },
  {
    question: 'Will skin tags grow back after removal?',
    answer:
      'Once a skin tag is properly removed, it will not grow back at the same site. However, new skin tags may develop elsewhere on the body over time, particularly if you are genetically predisposed to them. These can be treated at a future appointment.',
  },
  {
    question: 'Do I need a GP referral for skin tag removal?',
    answer:
      'No referral is needed. You can book directly with The One Clinic. Our team will assess the lesion at your appointment, confirm it is a benign skin tag, and carry out removal in the same visit where appropriate.',
  },
  {
    question: 'Is skin tag removal painful?',
    answer:
      'Most patients experience minimal discomfort. Local anaesthetic or topical numbing is used where necessary. Cryotherapy may cause a brief cold sting, while excision is performed under local anaesthetic so the area is numb throughout.',
  },
  {
    question: 'How long does healing take after skin tag removal?',
    answer:
      'Most treated sites heal within one to two weeks. A small mark may remain initially but fades naturally. Keeping the area clean and dry and avoiding picking at the site helps ensure the best healing outcome.',
  },
];

const RELATED = [
  { title: 'Skin Lesion Removal',  href: '/treatments/skin-lesion-removal',   desc: 'Expert clinical removal of a wide range of benign skin lesions.' },
  { title: 'Mole Removal',         href: '/treatments/mole-removal',           desc: 'Safe, precise mole assessment and removal by our medical team.' },
  { title: 'Wart Removal',         href: '/treatments/wart-removal',           desc: 'Effective removal of warts and verrucae using cryotherapy and more.' },
  { title: 'Minor Surgery',        href: '/treatments/minor-surgery',          desc: 'Minor surgical procedures carried out by our experienced doctors.' },
];

/* ── Page component ───────────────────────────────────────────── */
export default function SkinTagsRemovalPage() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Skin Tags Removal Leicester, hero"
        data-section-theme="dark"
      >
        {/* Breadcrumb, pinned to top of hero */}
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Treatments', href: '/treatments' },
                { label: 'Skin Tags Removal Leicester' },
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
                Minor Surgery
              </motion.span>

              <motion.h1 className={styles.heroTitle} variants={fadeUp}>
                Skin Tags Removal Leicester
              </motion.h1>

              <motion.p className={styles.heroDesc} variants={fadeUp}>
                Fast, safe &amp; permanent removal of skin tags by our expert medical team,
                with minimal discomfort and immediate results.
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
                  Comprehensive medical &amp; aesthetic care
                </span>
              </motion.div>
            </div>

            {/* Right: image */}
            <motion.div className={styles.heroImageWrap} variants={fadeUp}>
              <Image
                src="/images/Hero Section Skin Tag Removal.jpg"
                alt="Skin tags removal treatment in progress at The One Clinic"
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
          2. WHAT ARE SKIN TAGS?
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
                <h2 className={styles.combinedHeading}>What are Skin Tags?</h2>
                <p className={styles.combinedDesc}>
                  Skin tags (acrochordons) are small, benign soft growths that hang off the skin
                  on a thin stalk. They most commonly appear on the neck, armpits, groin, eyelids,
                  and under the breasts , anywhere skin rubs against skin or clothing. They are
                  entirely harmless, but many people find them cosmetically bothersome or
                  physically irritating when they catch on jewellery or clothing.
                </p>
                <p className={styles.combinedDesc}>
                  At The One Clinic, our medical team assesses every lesion before proceeding and
                  selects the most appropriate removal method , cryotherapy, surgical excision, or
                  electrocautery , to achieve a clean result with minimal discomfort and downtime.
                </p>
              </motion.div>
              <motion.div className={styles.combinedCtaWrapper} variants={fadeUp}>
                <BookConsultationButton className={styles.combinedCta}>
                  Book Your Consultation
                </BookConsultationButton>
              </motion.div>
            </motion.div>

            {/* Right: image */}
            <motion.div className={styles.whatIsVideoWrap} variants={fadeUp}>
              <Image
                src="/images/What is Skin Tag Removal.jpg"
                alt="Doctor reviewing skin tag at The One Clinic Leicester"
                fill
                className={styles.whatIsVideoFrame}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          3. AT A GLANCE
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
              Skin Tags Removal at a Glance
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
          4. OUR APPROACH
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
              Our Skin Tag Removal Approach
            </motion.h2>
            <motion.p className={styles.combinationIntroText} variants={fadeUp}>
              At The One Clinic, every skin tag removal begins with a proper clinical assessment.
              We select the most appropriate technique for your skin type, tag location, and
              personal preference , then guide you through healing with clear aftercare support.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.techCardsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {APPROACH_CARDS.map((card) => (
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
            <p className={styles.finalResultsEyebrow}>The Outcome</p>
            <p className={styles.finalResultsText}>
              Our structured approach , assess, select the right technique, then support your
              healing , means you leave the clinic with clear skin and the confidence that each
              tag has been permanently removed by a trained medical professional.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          5. TREATMENT JOURNEY
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
            aria-label="Skin tags removal treatment journey steps"
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
          6. BENEFITS
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
              Skin Tags Removal Benefits
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
          7. WHO IS ELIGIBLE?
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
              Who is Suitable for Skin Tag Removal?
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
              Skin tag removal is suitable for:
            </motion.p>
            <motion.ul className={styles.eligibilityList} role="list" variants={stagger(0.1)}>
              {ELIGIBILITY_SUITABLE.map((item) => (
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

            <motion.p className={styles.eligibilityIntro} variants={fadeUp} style={{ marginTop: '2rem' }}>
              Treatment may not be suitable if:
            </motion.p>
            <motion.ul className={styles.eligibilityList} role="list" variants={stagger(0.1)}>
              {ELIGIBILITY_NOT_SUITABLE.map((item) => (
                <motion.li key={item} className={styles.eligibilityItem} variants={fadeUp}>
                  <span className={styles.eligibilityCheck} aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <line x1="3" y1="3" x2="11" y2="11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                      <line x1="11" y1="3" x2="3" y2="11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.p className={styles.eligibilityClosing} variants={fadeUp}>
              Not sure if you are suitable? Book a consultation and our clinical team will advise you in person.
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
          8. HOW IT WORKS , THE SCIENCE
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
              How Does Skin Tag Removal Work?
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
              The removal method is chosen based on the size, location, and characteristics of each
              tag, as well as patient preference. Cryotherapy uses liquid nitrogen to freeze the tag
              tissue, causing it to die and fall away naturally. Surgical excision involves numbing
              the area with a local anaesthetic and cleanly cutting the tag away at its base.
            </motion.p>
            <motion.p className={styles.howPara} variants={fadeUp}>
              Electrocautery uses a controlled electrical current to generate heat that destroys
              the tag tissue and seals the wound simultaneously, which is particularly effective
              for multiple smaller tags. All methods leave only a small mark that fades
              progressively over the following weeks.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.howCoversWrap}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.howCoversLabel} variants={fadeUp}>Methods We Use</motion.p>
            <motion.ul className={styles.howCoversList} role="list" variants={stagger(0.08)}>
              {[
                'Cryotherapy (liquid nitrogen)',
                'Surgical excision under local anaesthetic',
                'Electrocautery (heat-based removal)',
                'Method chosen by tag size & location',
                'Patient preference always considered',
                'Multiple tags treated in one session',
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
          9. RESULTS, AFTERCARE & SIDE EFFECTS
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
            {/* Card 1: Results Timeline */}
            <motion.div className={styles.resultsAfterCard} variants={fadeUp}>
              <div className={styles.resultsAfterCardHead}>
                <span className={styles.resultsAfterCardIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                    <polyline points="17 6 23 6 23 12"/>
                  </svg>
                </span>
                <h3 className={styles.resultsAfterCardTitle}>What to Expect</h3>
              </div>
              <p className={styles.resultsAfterCardBody}>
                For surgical excision, the tag is removed immediately and completely. With
                cryotherapy, the tag typically falls off within one to two weeks. Electrocautery
                delivers an immediate result similar to excision.
              </p>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                A small mark remains at the site but fades naturally over several weeks.
                Healing is typically complete within one to two weeks, depending on tag
                size and location.
              </p>
            </motion.div>

            {/* Card 2: Side Effects */}
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
                Skin tag removal is a minor procedure with a very low risk of complications.
                Most patients experience only:
              </p>
              <ul className={styles.resultsAfterCardList} role="list">
                {[
                  'Mild redness or soreness at the treated site',
                  'Small blister or scab with cryotherapy',
                  'Minor swelling that settles within a day or two',
                ].map((item) => (
                  <li key={item} className={styles.resultsAfterCardListItem}>
                    <span className={styles.resultsAfterDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className={styles.resultsAfterCardSpacer} />
              <p className={styles.resultsAfterCardNote}>
                Serious complications are rare when the procedure is performed by a
                trained clinician. Any concerns following treatment can be raised with
                our team directly.
              </p>
            </motion.div>

            {/* Card 3: Aftercare */}
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
                  'Keep the area clean and dry for the first 48 hours',
                  'Avoid picking at any scab or blister that forms',
                  'Do not apply make-up or perfumed products directly to the site',
                  'Follow any specific aftercare instructions provided at your appointment',
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
          10. OTHER LESIONS WE REMOVE (replaces B&A)
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
              Minor Surgery
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Other Lesions We Remove
            </motion.h2>
            <motion.p className={styles.beforeAfterSubheading} variants={fadeUp}>
              In addition to skin tags, our clinical team is experienced in the assessment
              and removal of a wide range of benign skin lesions.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.relatedGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {LESIONS_REMOVED.map((lesion) => (
              <motion.div
                key={lesion.title}
                className={styles.relatedCard}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
              >
                <h3 className={styles.relatedTitle}>{lesion.title}</h3>
                <p className={styles.relatedDesc}>{lesion.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          11. PATIENT REVIEWS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          12. CTA BANNER
      ════════════════════════════════════════ */}
      <section className={styles.ctaBanner} data-section-theme="dark" aria-label="Book skin tags removal consultation">
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
              Clear Skin Starts Here.
            </motion.h2>
            <motion.p className={styles.ctaBannerSub} variants={fadeUp}>
              Let our expert medical team remove your skin tags quickly and permanently.
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
          13. TREATMENT LOCATIONS
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
              Treatment Locations
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Where Can Skin Tags Be Removed?
            </motion.h2>
            <motion.p className={styles.conditionsIntro} variants={fadeUp}>
              Our team treats skin tags across a wide range of body areas and handles all
              common tag types, from small thread-like growths to larger or clustered tags.
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
              <p className={styles.areasGroupLabel}>Body Areas</p>
              <ul className={styles.areasGroupList} role="list">
                {CONDITIONS_BODY.map((area) => (
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
              <p className={styles.areasGroupLabel}>Skin Tag Types</p>
              <ul className={styles.areasGroupList} role="list">
                {CONDITIONS_TYPES.map((type) => (
                  <li key={type} className={styles.areasGroupItem}>
                    <span className={styles.areasItemDot} aria-hidden="true" />
                    {type}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          14. BEST LEICESTER EXPERIENCE
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
              <p className={styles.eyebrowDark}>Skin Tag Removal</p>
              <h2 className={styles.combinedHeading}>
                Best Skin Tag Removal<br />Leicester Experience
              </h2>
            </motion.div>
            <motion.p className={styles.clinicIntroDesc} variants={fadeUp}>
              Experience safe, effective skin tag removal in Leicester at The One Clinic. Our
              experienced medical doctors perform every procedure with clinical precision,
              ensuring thorough assessment, the right technique for your skin, and clear
              aftercare guidance. Enjoy clear, smooth skin with minimal downtime and care
              tailored specifically to you.
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          15. COST BANNER
      ════════════════════════════════════════ */}
      <section className={styles.costBanner} data-section-theme="dark" aria-label="Skin tags removal cost">
        <Container>
          <motion.div
            className={styles.costBannerInner}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.costBannerEyebrow} variants={fadeUp}>
              Skin Tags Removal Cost at The One Clinic
            </motion.p>
            <motion.p className={styles.costBannerPrice} variants={fadeUp}>
              Skin Tag Removal From £95
            </motion.p>
            <motion.p className={styles.costBannerNote} variants={fadeUp}>
              The final price depends on the number and size of tags being treated and will be
              confirmed during your consultation with our clinical team.
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
          16. WHY CHOOSE THE ONE CLINIC
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
              Why Choose The One Clinic For Skin Tags Removal
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
          17. MEET THE EXPERTS
      ════════════════════════════════════════ */}
      <MeetTheExperts />

      {/* ════════════════════════════════════════
          18. FAQ
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
          19. BOOKING FORM
      ════════════════════════════════════════ */}
      <LeadForm />

      {/* ════════════════════════════════════════
          20. RELATED TREATMENTS
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
