'use client';

import { m } from 'framer-motion';
import { CLINIC_INFO } from '@/lib/clinic-info';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './FinalCTA.module.css';

export default function FinalCTA() {
  return (
    <Section variant="light" data-section-theme="light" className={styles.section}>
      <Container className={styles.container}>
        <m.div
          className={styles.card}
          variants={stagger(0.18)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <m.p className={styles.eyebrow} variants={fadeUp}>
            Take the First Step
          </m.p>

          <m.h2 className={styles.heading} variants={fadeUp}>
            Ready to Feel Your Best?
          </m.h2>

          <m.div className={styles.rule} variants={fadeUp} aria-hidden="true" />

          <m.p className={styles.subtext} variants={fadeUp}>
            Our team is here to help. Book your consultation today and take
            control of your health and confidence.
          </m.p>

          <m.div className={styles.buttons} variants={fadeUp}>
            <button
              className={styles.btnPrimary}
              onClick={() => window.dispatchEvent(new CustomEvent('openBookConsultationModal'))}
            >
              Book Your Consultation
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <a href={`tel:${CLINIC_INFO.phone.tel}`} className={styles.btnOutline}>
              Call {CLINIC_INFO.phone.display}
            </a>
          </m.div>
        </m.div>
      </Container>
    </Section>
  );
}
