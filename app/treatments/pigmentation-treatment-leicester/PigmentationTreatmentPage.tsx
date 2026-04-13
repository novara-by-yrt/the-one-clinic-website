'use client';

import Image from 'next/image';
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
import FinalCTA               from '@/components/sections/FinalCTA';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './page.module.css';

const BENEFITS = [
  {
    title: 'Targeted Precision',
    desc: 'Advanced laser and IPL technology selectively targets melanin deposits in the skin — breaking down dark spots and discolouration without affecting the surrounding tissue.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="4"/>
        <line x1="12" y1="2" x2="12" y2="4"/>
        <line x1="12" y1="20" x2="12" y2="22"/>
        <line x1="2" y1="12" x2="4" y2="12"/>
        <line x1="20" y1="12" x2="22" y2="12"/>
      </svg>
    ),
  },
  {
    title: 'Treats Multiple Causes',
    desc: 'Whether your pigmentation is caused by sun damage, hormonal changes (melasma), post-inflammatory marks, or ageing, our team selects the most appropriate treatment for the specific type and depth of discolouration.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Even, Radiant Skin Tone',
    desc: 'Treatment progressively lightens and fades areas of discolouration, restoring a more uniform, luminous complexion — with continued improvement as the skin renews over several weeks.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    title: 'Expert Skin Assessment',
    desc: 'Our clinical team carry out a thorough skin analysis before recommending a treatment plan — ensuring the right approach is taken for your skin type, tone, and the nature of your pigmentation.',
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

const OVERVIEW_POINTS = [
  'Treats sun spots, melasma, post-inflammatory marks, and age spots',
  'Laser, IPL, and chemical peel options tailored to your skin type',
  'Progressive results with continued improvement over several weeks',
  'No GP referral required — book directly with our team',
];

const FAQS = [
  {
    question: 'What causes skin pigmentation?',
    answer:
      'Pigmentation occurs when melanin — the pigment responsible for skin colour — is produced unevenly. Common causes include sun exposure (sun spots, freckles), hormonal changes (melasma), post-inflammatory hyperpigmentation following acne or injury, and the natural ageing process. The type and cause of pigmentation determines the most appropriate treatment approach.',
  },
  {
    question: 'How many sessions will I need?',
    answer:
      'The number of sessions depends on the type, depth, and extent of the pigmentation being treated. Superficial sun spots may respond well after 1–2 sessions, while conditions such as melasma typically require a course of treatments alongside ongoing sun protection. Your clinician will outline a personalised plan at your consultation.',
  },
  {
    question: 'Is pigmentation treatment suitable for all skin tones?',
    answer:
      'Many pigmentation treatments can be adapted for a wide range of skin tones, but careful assessment is essential — particularly for deeper skin tones where certain laser wavelengths carry a higher risk of post-inflammatory hyperpigmentation. Our team will assess your skin thoroughly and recommend only treatments that are safe and appropriate for you.',
  },
  {
    question: 'Do I need a referral for pigmentation treatment?',
    answer:
      'No referral is needed. You can book directly with The One Clinic. A comprehensive skin assessment is carried out before treatment begins to identify the type of pigmentation present and determine the safest, most effective treatment protocol.',
  },
];

export default function PigmentationTreatmentPage() {
  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Pigmentation Treatment Leicester, hero"
        data-section-theme="dark"
      >
        <div className={styles.heroBreadcrumb}>
          <Container>
            <Breadcrumb
              theme="dark"
              items={[
                { label: 'Treatments', href: '/treatments' },
                { label: 'Pigmentation Treatment Leicester' },
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
                Skin Treatments
              </motion.span>

              <motion.h1 className={styles.heroTitle} variants={fadeUp}>
                Pigmentation Treatment in Leicester
              </motion.h1>

              <motion.p className={styles.heroDesc} variants={fadeUp}>
                Advanced laser and light-based treatments to reduce dark spots, sun damage, and uneven skin tone — restoring a clear, radiant complexion.
              </motion.p>

              <motion.div className={styles.heroCtas} variants={fadeUp}>
                <BookConsultationButton className={styles.heroCtaPrimary}>
                  Book Consultation
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
                  Expert clinical team
                </span>
                <span className={styles.heroTrustDivider} aria-hidden="true" />
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  Same-day appointments available
                </span>
                <span className={styles.heroTrustDivider} aria-hidden="true" />
                <span className={styles.heroTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                  </svg>
                  Trusted by patients across Leicester
                </span>
              </motion.div>
            </div>

            <motion.div className={styles.heroImageWrap} variants={fadeUp}>
              <Image
                src="/images/Dermatologist.jpg"
                alt="Pigmentation treatment at The One Clinic Leicester"
                fill
                priority
                className={styles.heroImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className={styles.heroImageFade} aria-hidden="true" />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          2. GOOGLE REVIEWS
      ════════════════════════════════════════ */}
      <Testimonials />

      {/* ════════════════════════════════════════
          3. WHAT IS PIGMENTATION TREATMENT?
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
            <motion.div className={styles.whatIsContent} variants={stagger(0.12)}>
              <motion.div className={styles.whatIsTextGroup} variants={fadeUp}>
                <p className={styles.eyebrowDark}>About This Treatment</p>
                <h2 className={styles.combinedHeading}>What is Pigmentation Treatment?</h2>
                <p className={styles.combinedDesc}>
                  Pigmentation treatment uses advanced laser, IPL (intense pulsed light), or
                  chemical peel technology to break down excess melanin deposits in the skin.
                  The approach is carefully matched to the type and depth of discolouration —
                  whether sun spots, post-inflammatory marks, or melasma — delivering a
                  progressively clearer, more even skin tone.
                </p>
              </motion.div>

              <motion.ul className={styles.eligibilityList} role="list" variants={stagger(0.1)}>
                {OVERVIEW_POINTS.map((point) => (
                  <motion.li key={point} className={styles.eligibilityItem} variants={fadeUp}>
                    <span className={styles.eligibilityCheck} aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <polyline points="2,7 5.5,10.5 12,3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span>{point}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div className={styles.combinedCtaWrapper} variants={fadeUp}>
                <BookConsultationButton className={styles.combinedCta}>
                  Book Your Consultation
                </BookConsultationButton>
              </motion.div>
            </motion.div>

            <motion.div className={styles.whatIsVideoWrap} variants={fadeUp}>
              <Image
                src="/images/Doctor1.jpg"
                alt="Pigmentation treatment consultation at The One Clinic"
                fill
                className={styles.whatIsVideoFrame}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          4. BENEFITS
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
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>Why Choose Us</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              The Benefits of Pigmentation Treatment at The One Clinic
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.treatedBenefitsGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {BENEFITS.map((b) => (
              <motion.div
                key={b.title}
                className={styles.treatedBenefitCard}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
              >
                <span className={styles.treatedBenefitIconWrap} aria-hidden="true">{b.icon}</span>
                <h3 className={styles.treatedBenefitTitle}>{b.title}</h3>
                <p className={styles.treatedBenefitDesc}>{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          5. CTA BANNER
      ════════════════════════════════════════ */}
      <section className={styles.ctaBanner} data-section-theme="dark" aria-label="Book pigmentation treatment">
        <div className={styles.ctaBannerLogoWrap} aria-hidden="true">
          <Image src="/images/Background-logo.png" alt="" fill className={styles.ctaBannerLogo} sizes="100vw" />
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
              Clearer Skin.<br />Renewed Confidence.
            </motion.h2>
            <motion.p className={styles.ctaBannerSub} variants={fadeUp}>
              Book a pigmentation treatment consultation with our expert team in Leicester.
            </motion.p>
            <motion.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBannerBtn}>Book Consultation</BookConsultationButton>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          6. COST BANNER
      ════════════════════════════════════════ */}
      <section className={styles.costBanner} data-section-theme="dark" aria-label="Pigmentation treatment cost">
        <Container>
          <motion.div
            className={styles.costBannerInner}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.costBannerEyebrow} variants={fadeUp}>Pigmentation Treatment Pricing at The One Clinic</motion.p>
            <motion.p className={styles.costBannerPrice} variants={fadeUp}>From £100</motion.p>
            <motion.p className={styles.costBannerNote} variants={fadeUp}>
              Pricing varies by treatment type and the area being treated. Full details at your consultation.
            </motion.p>
            <motion.div variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBannerBtn}>Book A Consultation</BookConsultationButton>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          7. MEET THE EXPERTS
      ════════════════════════════════════════ */}
      <MeetTheExperts />

      {/* ════════════════════════════════════════
          8. FAQ
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
            <motion.h2 className={styles.headingLight} variants={fadeUp}>Frequently Asked Questions</motion.h2>
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

      <LeadForm />
      <FinalCTA />
    </>
  );
}
