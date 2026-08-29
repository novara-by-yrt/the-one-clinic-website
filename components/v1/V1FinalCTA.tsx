'use client';

import { m } from 'framer-motion';
import { CLINIC_INFO } from '@/lib/clinic-info';
import { useTilt } from './useTilt';
import styles from './V1FinalCTA.module.css';

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, margin: '-70px 0px' };

export default function V1FinalCTA() {
  const { ref, tiltProps } = useTilt<HTMLDivElement>({ max: 4, lift: 20 });

  return (
    <m.div
      className={styles.stage}
      initial={{ opacity: 0, y: 48, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={VIEW}
      transition={{ duration: 0.95, ease: EASE }}
    >
      <div ref={ref} className={styles.card} {...tiltProps}>
        <div className={styles.glow} aria-hidden="true" />
        <div className={styles.grid} aria-hidden="true" />

        <p className={styles.eyebrow}>Take the First Step</p>

        <h2 className={styles.heading}>
          Ready to Feel <em className={styles.accent}>Your Best?</em>
        </h2>

        <div className={styles.rule} aria-hidden="true" />

        <p className={styles.sub}>
          Our team is here to help. Book your consultation today and take control
          of your health and confidence.
        </p>

        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.primary}
            onClick={() =>
              window.dispatchEvent(new CustomEvent('openBookConsultationModal'))
            }
          >
            <span>Book Your Consultation</span>
            <svg className={styles.arrow} width="16" height="16" viewBox="0 0 16 16"
                 fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <a href={`tel:${CLINIC_INFO.phone.tel}`} className={styles.outline}>
            Call {CLINIC_INFO.phone.display}
          </a>
        </div>
      </div>
    </m.div>
  );
}
