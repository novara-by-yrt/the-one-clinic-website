'use client';

import { m } from 'framer-motion';
import {
  CLINIC_INFO,
  getMapsEmbedUrl,
  getMapsSearchUrl,
  getHoursDisplay,
} from '@/lib/clinic-info';
import { useTilt } from './useTilt';
import styles from './V1Contact.module.css';

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, margin: '-70px 0px' };
const HOURS = getHoursDisplay();

const PinIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </svg>
);

export default function V1Contact() {
  const panel = useTilt<HTMLDivElement>({ max: 3, lift: 14 });
  const map = useTilt<HTMLDivElement>({ max: 3, lift: 14 });

  return (
    <div className={styles.layout}>
      {/* ── Details ── */}
      <m.div
        initial={{ opacity: 0, y: 40, rotateX: -8 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={VIEW}
        transition={{ duration: 0.85, ease: EASE }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div ref={panel.ref} className={styles.panel} {...panel.tiltProps}>
          <div className={styles.rows}>
            <a
              className={styles.row}
              href={getMapsSearchUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.icon}><PinIcon /></span>
              <span className={styles.rowBody}>
                <span className={styles.rowLabel}>Visit us</span>
                <span className={styles.rowValue}>{CLINIC_INFO.address.display}</span>
              </span>
            </a>

            <a className={styles.row} href={`tel:${CLINIC_INFO.phone.tel}`}>
              <span className={styles.icon}><PhoneIcon /></span>
              <span className={styles.rowBody}>
                <span className={styles.rowLabel}>Call us</span>
                <span className={styles.rowValue}>{CLINIC_INFO.phone.display}</span>
              </span>
            </a>

            <a className={styles.row} href={`mailto:${CLINIC_INFO.email}`}>
              <span className={styles.icon}><MailIcon /></span>
              <span className={styles.rowBody}>
                <span className={styles.rowLabel}>Email us</span>
                <span className={styles.rowValue}>{CLINIC_INFO.email}</span>
              </span>
            </a>
          </div>

          <div className={styles.hours}>
            <p className={styles.hoursTitle}>Opening hours</p>
            {HOURS.map((h) => (
              <div key={h.days} className={styles.hourRow}>
                <span className={styles.hourDay}>{h.days}</span>
                <span className={styles.hourTime}>{h.time}</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            className={styles.cta}
            onClick={() =>
              window.dispatchEvent(new CustomEvent('openBookConsultationModal'))
            }
          >
            Book Your Consultation
            <svg className={styles.ctaArrow} width="16" height="16" viewBox="0 0 16 16"
                 fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </m.div>

      {/* ── Map ── */}
      <m.div
        initial={{ opacity: 0, y: 40, rotateX: -8 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={VIEW}
        transition={{ duration: 0.85, delay: 0.12, ease: EASE }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div ref={map.ref} className={styles.mapCard} {...map.tiltProps}>
          <iframe
            className={styles.mapFrame}
            src={getMapsEmbedUrl()}
            title={`Map showing ${CLINIC_INFO.name}, ${CLINIC_INFO.address.display}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a
            className={styles.mapBadge}
            href={getMapsSearchUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get directions
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </m.div>
    </div>
  );
}
