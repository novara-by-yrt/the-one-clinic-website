'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Section           from '@/components/ui/Section';
import Container         from '@/components/ui/Container';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import MeetTheExperts    from '@/components/sections/MeetTheExperts';
import LeadForm          from '@/components/sections/LeadForm';
import VideoSection      from '@/components/sections/VideoSection';
import Testimonials      from '@/components/sections/Testimonials';
import FinalCTA          from '@/components/sections/FinalCTA';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './page.module.css';

/* ── Related data ──────────────────────────────────────────────── */
const RELATED_TREATMENTS = [
  {
    title: 'Dermal Fillers',
    desc:  'Restore volume and smooth the under-eye area with precision-placed hyaluronic acid filler.',
    href:  '/treatments/dermal-fillers',
    tag:   'Medical Aesthetics',
  },
];

const RELATED_CONDITIONS = [
  {
    title: 'Thin Lips',
    desc:  'Restore youthful lip volume and definition with subtle, natural-looking enhancement.',
    href:  '/conditions/thin-lips',
    tag:   'Face',
  },
];

/* ── Page ──────────────────────────────────────────────────────── */
export default function EyeBagsPage() {
  return (
    <>
      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Eye Bags – hero"
        data-section-theme="dark"
      >
        <div className={styles.heroGrid} aria-hidden="true" />

        <Container>
          <motion.div
            className={styles.heroContent}
            variants={stagger(0.15)}
            initial="hidden"
            animate="show"
          >
            {/* ── Left column ─────────────────────────────── */}
            <div className={styles.heroLeft}>
              <motion.span className={styles.heroCategory} variants={fadeUp}>
                Conditions · Face
              </motion.span>

              <motion.h1 className={styles.heroTitle} variants={fadeUp}>
                Eye Bags
              </motion.h1>

              <motion.p className={styles.heroDesc} variants={fadeUp}>
                Restore a refreshed, youthful appearance around the eyes
              </motion.p>

              <motion.div className={styles.heroCtas} variants={fadeUp}>
                <BookConsultationButton className={styles.heroCtaPrimary}>
                  Book Consultation
                </BookConsultationButton>
                <Link href="#contact" className={styles.heroCtaSecondary}>
                  Contact Us
                </Link>
              </motion.div>

              {/* Review badges */}
              <motion.div className={styles.reviewBadges} variants={fadeUp}>
                <div className={styles.reviewBadge}>
                  <span className={`${styles.reviewBadgeIcon} ${styles.reviewBadgeGoogle}`}>G</span>
                  <div className={styles.reviewBadgeText}>
                    <span className={styles.reviewStars}>★★★★★</span>
                    <span className={styles.reviewLabel}>Google Reviews</span>
                  </div>
                </div>
                <div className={styles.reviewBadge}>
                  <span className={`${styles.reviewBadgeIcon} ${styles.reviewBadgeTrustpilot}`}>★</span>
                  <div className={styles.reviewBadgeText}>
                    <span className={styles.reviewStars}>★★★★★</span>
                    <span className={styles.reviewLabel}>Trustpilot</span>
                  </div>
                </div>
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
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          2. UNDERSTANDING EYE BAGS
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
                Understanding Eye Bags
              </motion.h2>
              <motion.p className={styles.overviewPara} variants={fadeUp}>
                Eye bags are a common concern that develops with age, often creating a tired
                appearance. They occur when fat pads beneath the eyes begin to shift, causing a
                puffy or sagging look in the under-eye area.
              </motion.p>
              <motion.p className={styles.overviewPara} variants={fadeUp}>
                The skin around the eyes is delicate and naturally loses collagen over time,
                reducing firmness and elasticity. This process varies depending on genetics,
                lifestyle, and environmental factors.
              </motion.p>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          3. OPTIONS TO TREAT
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
              Treatment Options
            </motion.p>
            <motion.h2 className={styles.headingLight} variants={fadeUp}>
              Options to Treat Eye Bags
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.treatGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div className={styles.treatCard} variants={fadeUp}>
              <span className={styles.treatNum} aria-hidden="true">01</span>
              <p className={styles.treatText}>
                While creams and topical products may offer minimal improvement, cosmetic
                treatments provide more effective and longer-lasting results for those seeking
                a meaningful change.
              </p>
            </motion.div>
            <motion.div className={styles.treatCard} variants={fadeUp}>
              <span className={styles.treatNum} aria-hidden="true">02</span>
              <p className={styles.treatText}>
                At The One Clinic, injectable hyaluronic acid dermal fillers are used to restore
                volume and smooth the under-eye area. In mild cases, skin-strengthening treatments
                may be used to improve skin quality and slow progression.
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          3. WHAT TO KNOW
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
              Key Information
            </motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>
              What to Know About Eye Bags
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.knowLayout}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.knowIntro} variants={fadeUp}>
              Eye bags are a natural part of ageing but can be significantly improved with the
              right treatment approach. Early intervention can help maintain skin quality and
              prevent further development.
            </motion.p>

            <motion.div className={styles.knowCard} variants={fadeUp}>
              <h3 className={styles.knowH3}>Is Eye Bags Curable?</h3>
              <p className={styles.knowPara}>
                Eye bags cannot be permanently cured, but their appearance can be effectively
                reduced and managed with appropriate treatments. With the right approach,
                most patients achieve a noticeably refreshed and rested appearance that can
                be maintained over time.
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          4. MEET THE EXPERTS
      ════════════════════════════════════════ */}
      <MeetTheExperts />

      {/* ════════════════════════════════════════
          5. CONSULTATION CTA
      ════════════════════════════════════════ */}
      <Section variant="dark" data-section-theme="dark" className={styles.ctaBand}>
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
              Book your consultation today and explore{' '}
              <em className={styles.ctaAccent}>personalised treatment options.</em>
            </motion.h2>
            <motion.p className={styles.ctaSubtext} variants={fadeUp}>
              Our team of experts will assess your concerns and recommend the most suitable
              approach for a natural, refreshed result.
            </motion.p>
            <motion.div className={styles.ctaBtns} variants={fadeUp}>
              <BookConsultationButton className={styles.ctaBtnPrimary}>
                Book Consultation
              </BookConsultationButton>
              <Link href="#contact" className={styles.ctaBtnSecondary}>
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          6. FORM
      ════════════════════════════════════════ */}
      <div id="contact">
        <LeadForm />
      </div>

      {/* ════════════════════════════════════════
          7. RELATED TREATMENTS
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
          8. RELATED CONDITIONS
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

      {/* ════════════════════════════════════════
          GLOBAL SECTIONS
      ════════════════════════════════════════ */}
      <VideoSection />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
