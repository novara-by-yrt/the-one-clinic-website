'use client';

import { motion } from 'framer-motion';
import Script from 'next/script';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './LeadForm.module.css';

const ADDRESS   = '36 De Montfort St, Leicester LE1 7GS, United Kingdom';
const PHONE     = '+44 7429 954195';
const MAPS_URL  = 'https://www.google.com/maps/search/?api=1&query=36+De+Montfort+St,+Leicester+LE1+7GS,+United+Kingdom';
const EMBED_URL = 'https://maps.google.com/maps?q=36+De+Montfort+St,+Leicester+LE1+7GS,+United+Kingdom&output=embed';

export default function LeadForm() {
  return (
    <Section variant="light" data-section-theme="light" id="contact">
      <Script src="https://link.leadpipeline.ai/js/form_embed.js" strategy="lazyOnload" />

      <Container>
        <motion.div
          className={styles.inner}
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {/* ── Header ───────────────────────────────────────── */}
          <motion.div className={styles.header} variants={fadeUp}>
            <p className={styles.eyebrow}>Get Started</p>
            <h2 className={styles.heading}>Start Your Journey Today</h2>
            <p className={styles.subtext}>
              Book a consultation with our expert team and discover
              the right treatment for you.
            </p>
          </motion.div>

          {/* ── LeadPipeline form iframe ──────────────────────── */}
          <motion.div className={styles.formWrap} variants={fadeUp}>
            <iframe
              src="https://link.leadpipeline.ai/widget/form/Az3D8kxDVBz2diDQJ3uY"
              style={{ width: '100%', height: '509px', border: 'none', borderRadius: '0px' }}
              id="inline-Az3D8kxDVBz2diDQJ3uY"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Book Consultation"
              data-height="509"
              data-layout-iframe-id="inline-Az3D8kxDVBz2diDQJ3uY"
              data-form-id="Az3D8kxDVBz2diDQJ3uY"
              title="Book Consultation"
            />
          </motion.div>

          {/* ── Contact + map below the form ─────────────────── */}
          <motion.div className={styles.mapSection} variants={fadeUp}>
            {/* Contact rows */}
            <div className={styles.contactInfo}>
              <div className={styles.contactRow}>
                <span className={styles.contactIcon} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1.5C5.515 1.5 3.5 3.515 3.5 6c0 3.75 4.5 8.5 4.5 8.5s4.5-4.75 4.5-8.5C12.5 3.515 10.485 1.5 8 1.5zm0 6.25a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5z" fill="currentColor"/>
                  </svg>
                </span>
                <div>
                  <p className={styles.contactLabel}>Address</p>
                  <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={styles.contactValue}>
                    {ADDRESS}
                  </a>
                </div>
              </div>

              <div className={styles.contactRow}>
                <span className={styles.contactIcon} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13.5 10.5l-2-2a1 1 0 00-1.4 0l-.9.9a8.2 8.2 0 01-3.1-3.1l.9-.9a1 1 0 000-1.4l-2-2A1 1 0 003.6 2L2.5 3.1C1.8 3.8 1.7 4.9 2.3 5.8a15.5 15.5 0 008 8c.9.5 2 .4 2.7-.3l1.1-1.1a1 1 0 00-.6-1.9z" fill="currentColor"/>
                  </svg>
                </span>
                <div>
                  <p className={styles.contactLabel}>Phone</p>
                  <a href={`tel:${PHONE.replace(/\s/g, '')}`} className={styles.contactValue}>
                    {PHONE}
                  </a>
                </div>
              </div>
            </div>

            {/* Map embed */}
            <div className={styles.mapWrap}>
              <iframe
                src={EMBED_URL}
                title="The One Clinic location"
                className={styles.mapIframe}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Map showing clinic location"
              />
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapOverlay}
                aria-label="Open in Google Maps"
              >
                <span className={styles.mapCta}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 2h10M12 2v10M2 12L12 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Open in Google Maps
                </span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
