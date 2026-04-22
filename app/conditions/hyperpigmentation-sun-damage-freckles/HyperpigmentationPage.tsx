'use client';

import Image from 'next/image';
import Link  from 'next/link';
import { motion } from 'framer-motion';
import Section                from '@/components/ui/Section';
import Container              from '@/components/ui/Container';
import Accordion              from '@/components/ui/Accordion';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import TrustBadges            from '@/components/ui/TrustBadges';
import Breadcrumb             from '@/components/ui/Breadcrumb';
import LeadForm               from '@/components/sections/LeadForm';
import MeetTheExperts         from '@/components/sections/MeetTheExperts';
import Testimonials           from '@/components/sections/Testimonials';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './page.module.css';

/* ── Causes ───────────────────────────────────────────────────── */
const CAUSES = [
  {
    title: 'Sun Exposure',
    desc: 'UV radiation stimulates excess melanin production, leading to sunspots, freckles, and broader areas of uneven darkening, particularly on the face, hands, shoulders, and décolletage.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    ),
  },
  {
    title: 'Hormonal Changes',
    desc: 'Pregnancy, the menopause, and hormonal contraceptives can trigger melasma, symmetrical patches of deeper pigmentation on the cheeks, forehead, and upper lip.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    title: 'Post-Inflammatory Response',
    desc: 'Skin trauma from acne, eczema, cuts, or cosmetic procedures triggers excess melanin production during healing, leaving behind persistent dark marks known as post-inflammatory hyperpigmentation (PIH).',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
  },
  {
    title: 'Ageing',
    desc: 'Decades of cumulative UV exposure cause melanin to distribute unevenly, producing age spots and liver spots on sun-exposed areas. Slower cell turnover means these marks persist for longer.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Genetics',
    desc: 'Some people are genetically predisposed to freckle easily or develop melasma, particularly those with lighter skin tones. Inherited melanocyte sensitivity amplifies pigmentation responses to UV and hormones.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 3c0 4.5 6 4.5 6 9s-6 4.5-6 9"/>
        <path d="M18 3c0 4.5-6 4.5-6 9s6 4.5 6 9"/>
        <line x1="3" y1="9" x2="21" y2="9"/>
        <line x1="3" y1="15" x2="21" y2="15"/>
      </svg>
    ),
  },
  {
    title: 'Skin Inflammation',
    desc: 'Chronic inflammatory conditions such as rosacea or contact dermatitis disrupt the normal melanin distribution process, resulting in patches of uneven discolouration as the skin attempts to repair itself.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
];

/* ── Treatments ───────────────────────────────────────────────── */
const TREATMENTS = [
  {
    title: 'Lumecca IPL',
    desc:  'Intense Pulsed Light precisely targets excess melanin, breaking down sunspots, freckles, and areas of uneven pigmentation for a noticeably clearer and more even complexion.',
    href:  '/treatments/lumecca-ipl',
  },
  {
    title: 'Laser Resurfacing',
    desc:  'Targeted laser energy penetrates deeper pigmentation, stimulating cell renewal and collagen production to reduce sun damage, age spots, and uneven skin tone.',
    href:  '/treatments/laser-resurfacing',
  },
  {
    title: 'Chemical Peel',
    desc:  'Exfoliating peels remove pigmented surface skin cells, accelerate cell turnover, and progressively lighten dark patches and uneven discolouration across the face and body.',
    href:  '/treatments/chemical-peels',
  },
  {
    title: 'Polynucleotides',
    desc:  'Stimulates deep skin regeneration, improving overall skin quality and tone, reducing post-inflammatory marks and supporting a healthier, more even complexion over time.',
    href:  '/treatments/polynucleotides-leicester',
  },
];

/* ── Risk factors ─────────────────────────────────────────────── */
const RISK_FACTORS = [
  'People with a history of prolonged or unprotected sun exposure.',
  'Those with lighter skin tones, which produce freckles more readily.',
  'Women during pregnancy or those using hormonal contraceptives.',
  'Adults over 40 with accumulated UV damage from years of sun exposure.',
  'Those with a history of acne, eczema, or inflammatory skin conditions.',
  'Individuals with a family history of melasma or hyperpigmentation.',
];

/* ── Results timeline ─────────────────────────────────────────── */
const RESULTS_TIMELINE = [
  {
    phase: 'Immediately',
    title: 'Brighter Skin',
    desc:  'Improved skin brightness and clarity visible following initial treatment.',
  },
  {
    phase: '2 to 4 Weeks',
    title: 'Spots Fading',
    desc:  'Sunspots and freckles continue to fade as the skin renews itself.',
  },
  {
    phase: '6 to 8 Weeks',
    title: 'Even Tone',
    desc:  'Noticeably more uniform skin tone and improved overall complexion.',
  },
  {
    phase: 'Long-term',
    title: 'Maintained Results',
    desc:  'Daily SPF and maintenance treatments sustain a clear, even complexion.',
  },
];

/* ── Why choose ───────────────────────────────────────────────── */
const CLINIC_REASONS = [
  { n: '01', text: 'All-in-one clinic with medical and aesthetic services.' },
  { n: '02', text: 'Highly trained, compassionate, GMC-registered doctors.' },
  { n: '03', text: 'Customised treatment plans based on your skin type and goals.' },
  { n: '04', text: 'State-of-the-art facilities and modern equipment.' },
  { n: '05', text: 'Strong reputation with excellent patient reviews.' },
  { n: '06', text: 'Comprehensive aftercare and follow-up support.' },
];

/* ── FAQs ─────────────────────────────────────────────────────── */
const FAQS = [
  {
    question: 'What is the difference between hyperpigmentation, sun damage, and freckles?',
    answer:
      'Hyperpigmentation is an umbrella term for any darkening of the skin caused by excess melanin. Sun damage refers specifically to discolouration caused by UV exposure, including sunspots and age spots. Freckles are small, concentrated deposits of melanin, often genetically inherited but intensified by sun exposure. All three share the same underlying mechanism and respond well to similar treatments.',
  },
  {
    question: 'Can hyperpigmentation be permanently treated?',
    answer:
      'Many forms of hyperpigmentation can be significantly reduced or cleared with the right treatment. IPL and laser are highly effective for sunspots, freckles, and age spots. However, melasma and post-inflammatory pigmentation can recur without ongoing sun protection. Our doctors will advise on the most appropriate plan for your skin type and pigmentation pattern.',
  },
  {
    question: 'How many sessions will I need?',
    answer:
      'The number of sessions depends on the type, depth, and extent of the pigmentation. Sunspots and freckles often respond well after one to three IPL sessions. Deeper or more widespread hyperpigmentation may benefit from a course of chemical peels or combined treatments. Your doctor will outline a personalised plan during consultation.',
  },
  {
    question: 'Is hyperpigmentation treatment safe for all skin tones?',
    answer:
      'Yes, with the right treatment selection. Some lasers and IPL devices carry a higher risk of post-inflammatory pigmentation in darker skin tones if used incorrectly. At The One Clinic, our GMC-registered doctors assess your Fitzpatrick skin type and choose treatments that are both safe and effective for your skin.',
  },
  {
    question: 'What is the recovery time?',
    answer:
      'Recovery varies by treatment. IPL may cause temporary darkening of spots and mild redness for a few days. Chemical peels can result in flaking for 3 to 7 days depending on depth. Most patients return to normal activities the same day or within 24 to 48 hours, with results continuing to improve over the following weeks.',
  },
];

/* ── Related ──────────────────────────────────────────────────── */
const RELATED_TREATMENTS = [
  {
    title: 'Lumecca IPL',
    desc:  'Break down sunspots and freckles with targeted Intense Pulsed Light therapy.',
    href:  '/treatments/lumecca-ipl',
    tag:   'Medical Aesthetics',
  },
  {
    title: 'Laser Resurfacing',
    desc:  'Reduce deeper sun damage and uneven tone with precision laser treatment.',
    href:  '/treatments/laser-resurfacing',
    tag:   'Medical Aesthetics',
  },
  {
    title: 'Chemical Peel',
    desc:  'Resurface and brighten pigmented skin with exfoliating, skin-renewing peels.',
    href:  '/treatments/chemical-peels',
    tag:   'Medical Aesthetics',
  },
];

const RELATED_CONDITIONS = [
  {
    title: 'Pigmentation',
    desc:  'Treat dark spots, patches, and uneven skin tone with personalised care.',
    href:  '/conditions/pigmentation',
    tag:   'Skin',
  },
  {
    title: 'Facial Redness / Rosacea',
    desc:  'Calm persistent redness and restore an even, clear complexion.',
    href:  '/conditions/rosacea',
    tag:   'Face',
  },
];

/* ════════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════════ */
export default function HyperpigmentationPage() {
  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Hyperpigmentation, sun damage and freckles, hero"
        data-section-theme="dark"
      >
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Conditions', href: '/conditions' },
                { label: 'Hyperpigmentation / Sun Damage / Freckles' },
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
            <div className={styles.heroLeft}>
              <motion.span className={styles.heroCategory} variants={fadeUp}>
                Conditions · Skin
              </motion.span>

              <motion.h1 className={styles.heroTitle} variants={fadeUp}>
                Hyperpigmentation, Sun Damage &amp; Freckles
              </motion.h1>

              <motion.p className={styles.heroDesc} variants={fadeUp}>
                Restore a clear, even-toned complexion with personalised,
                clinically proven treatments for all forms of skin pigmentation.
              </motion.p>

              <motion.div className={styles.heroCtas} variants={fadeUp}>
                <BookConsultationButton className={styles.heroCtaPrimary}>
                  Book A Consultation
                </BookConsultationButton>
              </motion.div>

              <motion.div variants={fadeUp}>
                <TrustBadges theme="dark" />
              </motion.div>

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

            <motion.div className={styles.heroImageWrap} variants={fadeUp}>
              <Image
                src="/images/Hyperpigmentation.png"
                alt="Hyperpigmentation and sun damage treatment at The One Clinic Leicester"
                fill
                className={styles.heroImage}
                sizes="(max-width: 900px) 100vw, 50vw"
                priority
              />
              <div className={styles.heroImageFade} aria-hidden="true" />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          2. WHAT IS HYPERPIGMENTATION?
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <motion.div
            className={styles.overviewGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div className={styles.overviewLabel} variants={fadeUp}>
              <p className={styles.eyebrowDark}>About This Condition</p>
            </motion.div>

            <div className={styles.overviewBody}>
              <motion.h2 className={styles.overviewHeading} variants={fadeUp}>
                What Is Hyperpigmentation?
              </motion.h2>
              <motion.p className={styles.overviewPara} variants={fadeUp}>
                Hyperpigmentation is the darkening of areas of skin caused by an excess
                production of melanin, the pigment responsible for skin colour. It
                encompasses a broad range of concerns including sun damage, age spots,
                freckles, melasma, and post-inflammatory marks, and can affect the face,
                hands, neck, or body.
              </motion.p>
              <motion.p className={styles.overviewPara} variants={fadeUp}>
                Although largely harmless, these concerns are a common source of
                self-consciousness. With the right professional treatment, most forms of
                hyperpigmentation can be significantly reduced or cleared, restoring a
                clearer and more even complexion.
              </motion.p>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          3. TYPES
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
              How It Presents
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Types of Hyperpigmentation
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.typesCardsRow}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {[
              {
                num: '01',
                title: 'Sun Damage & Age Spots',
                desc: 'Flat, well-defined dark spots that develop on sun-exposed areas such as the face, hands, and shoulders from years of cumulative UV exposure.',
              },
              {
                num: '02',
                title: 'Freckles & Melasma',
                desc: 'Small concentrated melanin deposits (freckles) and larger, hormonally triggered patches of deeper pigmentation (melasma) typically appearing on the cheeks and forehead.',
              },
              {
                num: '03',
                title: 'Post-Inflammatory Marks',
                desc: 'Dark spots left behind after skin inflammation, acne, eczema, or injury, as the healing skin produces excess melanin in the affected area.',
              },
            ].map((type) => (
              <motion.div key={type.num} className={styles.typeCard} variants={fadeUp}>
                <span className={styles.typeNum} aria-hidden="true">{type.num}</span>
                <div className={styles.typeCardBody}>
                  <h3 className={styles.typeTitle}>{type.title}</h3>
                  <p className={styles.typeDesc}>{type.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          4. CAUSES
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.causesSection}>
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>
              Root Causes
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              What Causes Hyperpigmentation?
            </motion.h2>
            <motion.p className={styles.sectionSubtext} variants={fadeUp}>
              Understanding the underlying cause helps determine the most effective
              treatment approach for your skin.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.causesGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {CAUSES.map((cause) => (
              <motion.div
                key={cause.title}
                className={styles.causeCard}
                variants={fadeUp}
                whileHover={{
                  y: -6,
                  transition: { type: 'spring', stiffness: 280, damping: 18 },
                }}
              >
                <span className={styles.causeIcon}>{cause.icon}</span>
                <h3 className={styles.causeTitle}>{cause.title}</h3>
                <p className={styles.causeDesc}>{cause.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          5. RISK FACTORS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <motion.div
            className={styles.riskGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div className={styles.riskLeft} variants={stagger(0.1)}>
              <motion.p className={styles.eyebrowDark} variants={fadeUp}>
                Risk Factors
              </motion.p>
              <motion.h2 className={styles.riskHeading} variants={fadeUp}>
                Who Is More Likely to Develop Hyperpigmentation?
              </motion.h2>
              <motion.p className={styles.riskIntro} variants={fadeUp}>
                Several skin types, lifestyle habits, and health factors increase
                susceptibility to hyperpigmentation and sun damage.
              </motion.p>
            </motion.div>

            <motion.ul
              className={styles.riskList}
              role="list"
              variants={stagger(0.08)}
            >
              {RISK_FACTORS.map((item) => (
                <motion.li key={item} className={styles.riskItem} variants={fadeUp}>
                  <span className={styles.riskCheck} aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <polyline points="2,7 5.5,10.5 12,3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          6. TREATMENTS
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
              Your Options
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Treatments for Hyperpigmentation &amp; Sun Damage
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.treatmentsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {TREATMENTS.map((t) => (
              <motion.div
                key={t.title}
                className={styles.treatmentCard}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
              >
                <div className={styles.treatmentCardBody}>
                  <Link href={t.href} className={styles.treatmentTitleLink}>
                    <h3 className={styles.treatmentTitle}>{t.title}</h3>
                    <span className={styles.treatmentArrow} aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </Link>
                  <p className={styles.treatmentDesc}>{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          7. RESULTS & EXPECTATIONS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>
              What To Expect
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Results &amp; Expectations
            </motion.h2>
            <motion.p className={styles.sectionSubtext} variants={fadeUp}>
              After treatment, here is what you can typically expect at each stage.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.resultsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {RESULTS_TIMELINE.map((item) => (
              <motion.div
                key={item.phase}
                className={styles.resultCard}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
              >
                <span className={styles.resultPhase}>{item.phase}</span>
                <h3 className={styles.resultTitle}>{item.title}</h3>
                <p className={styles.resultDesc}>{item.desc}</p>
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
          9. GOOGLE REVIEWS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          10. WHY CHOOSE THE ONE CLINIC
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
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>Why Us</motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Why Choose The One Clinic For Hyperpigmentation Treatment
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.whyGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {CLINIC_REASONS.map((r) => (
              <motion.div
                key={r.n}
                className={styles.whyCard}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
              >
                <span className={styles.whyNumber}>{r.n}</span>
                <p className={styles.whyText}>{r.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          11. FAQ
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
            <Accordion items={FAQS} theme="dark" />
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          12. CTA BAND
      ════════════════════════════════════════ */}
      <section
        className={styles.ctaBand}
        data-section-theme="dark"
        aria-label="Hyperpigmentation consultation CTA"
      >
        <div className={styles.ctaBandBgWrap} aria-hidden="true">
          <Image
            src="/images/Background section image new1.jpg"
            alt=""
            fill
            className={styles.ctaBandBgImg}
            sizes="100vw"
          />
          <div className={styles.ctaBandOverlay} />
        </div>

        <Container>
          <motion.div
            className={styles.ctaContent}
            variants={stagger(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>
              Take the First Step
            </motion.p>
            <motion.h2 className={styles.ctaHeading} variants={fadeUp}>
              Ready for Clearer,{' '}
              <span className={styles.ctaAccent}>More Even Skin?</span>
            </motion.h2>
            <motion.p className={styles.ctaSubtext} variants={fadeUp}>
              Speak to our specialists today to find the most effective treatment
              for your pigmentation and restore a naturally clear, radiant complexion.
            </motion.p>
            <motion.div className={styles.ctaBtns} variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBtnPrimary}>
                Book a Consultation
              </BookConsultationButton>
              <Link href="#contact" className={styles.ctaBtnSecondary}>
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          13. COST BAND
      ════════════════════════════════════════ */}
      <section
        className={styles.costBand}
        data-section-theme="dark"
        aria-label="Hyperpigmentation treatment cost"
      >
        <Container>
          <motion.div
            className={styles.costBandInner}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.costBandEyebrow} variants={fadeUp}>
              Pricing
            </motion.p>
            <motion.h2 className={styles.costBandHeading} variants={fadeUp}>
              Hyperpigmentation Treatment Cost
            </motion.h2>
            <motion.p className={styles.costBandNote} variants={fadeUp}>
              Contact us to enquire
            </motion.p>
            <motion.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBtnPrimary}>
                Book A Consultation
              </BookConsultationButton>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          14. LEAD FORM
      ════════════════════════════════════════ */}
      <div id="contact">
        <LeadForm />
      </div>

      {/* ════════════════════════════════════════
          15. RELATED TREATMENTS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>Explore</motion.p>
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
            {RELATED_TREATMENTS.map((item) => (
              <motion.div key={item.title} className={styles.relatedCell} variants={fadeUp}>
                <Link href={item.href} className={styles.relatedCard}>
                  <span className={styles.relatedTag}>{item.tag}</span>
                  <h3 className={styles.relatedTitle}>{item.title}</h3>
                  <p className={styles.relatedDesc}>{item.desc}</p>
                  <span className={styles.relatedArrow} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          16. RELATED CONDITIONS
      ════════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light" className={styles.relatedConditionsSection}>
        <Container>
          <motion.div
            className={styles.sectionHeaderCentre}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>Similar Concerns</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              Related Conditions
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.relatedGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {RELATED_CONDITIONS.map((item) => (
              <motion.div key={item.title} className={styles.relatedCell} variants={fadeUp}>
                <Link href={item.href} className={styles.relatedCard}>
                  <span className={styles.relatedTag}>{item.tag}</span>
                  <h3 className={styles.relatedTitle}>{item.title}</h3>
                  <p className={styles.relatedDesc}>{item.desc}</p>
                  <span className={styles.relatedArrow} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
