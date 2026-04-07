'use client';

import { motion } from 'framer-motion';
import Script from 'next/script';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './LeadForm.module.css';

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
          {/* ── Header ──────────────────────────────────────── */}
          <motion.div className={styles.header} variants={fadeUp}>
            <p className={styles.eyebrow}>Get Started</p>
            <h2 className={styles.heading}>Start Your Journey Today</h2>
            <p className={styles.subtext}>
              Book a consultation with our expert team and discover
              the right treatment for you.
            </p>
          </motion.div>

          {/* ── Side-by-side: Map (left) | Form (right) ─────── */}
          <motion.div className={styles.sideGrid} variants={fadeUp}>

            {/* Left: Google Map */}
            <div className={styles.mapSide}>
              <iframe
                src={EMBED_URL}
                title="The One Clinic location"
                className={styles.mapIframe}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Map showing clinic location"
              />
              {/* Open in Google Maps overlay */}
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

            {/* Right: Form iframe */}
            <div className={styles.formSide}>
              <iframe
                src="https://link.leadpipeline.ai/widget/form/Az3D8kxDVBz2diDQJ3uY"
                style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
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
            </div>

          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
