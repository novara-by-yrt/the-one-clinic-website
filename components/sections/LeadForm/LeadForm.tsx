'use client';

import { motion } from 'framer-motion';
import Script from 'next/script';
import { CLINIC_INFO, getMapsEmbedUrl, getMapsSearchUrl, getHoursDisplay } from '@/lib/clinic-info';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './LeadForm.module.css';

const SLIDE_EASE = [0.25, 0.1, 0.25, 1] as const;

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.03 1.17 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z"/>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="M2 7l10 7 10-7"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
    </svg>
  );
}

const CONTACT_ITEMS = [
  { icon: <PhoneIcon />, value: CLINIC_INFO.phone.display, href: `tel:${CLINIC_INFO.phone.tel}` },
  { icon: <EmailIcon />, value: CLINIC_INFO.email,        href: `mailto:${CLINIC_INFO.email}` },
];

const HOURS = getHoursDisplay();

const SOCIAL_LINKS = [
  {
    icon: <InstagramIcon />,
    label: 'Instagram',
    handle: '@theoneclinic.uk',
    href: CLINIC_INFO.social.instagram,
  },
  {
    icon: <FacebookIcon />,
    label: 'Facebook',
    handle: 'theoneclinic.uk',
    href: CLINIC_INFO.social.facebook,
  },
];

export default function LeadForm() {
  return (
    <Section variant="dark" data-section-theme="dark" className={styles.section} id="contact">
      <Script src="https://link.leadpipeline.ai/js/form_embed.js" strategy="lazyOnload" />

      <Container>
        <div className={styles.splitGrid}>

          {/* ── LEFT: Form column ───────────────────────── */}
          <motion.div
            className={styles.formCol}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.85, ease: SLIDE_EASE }}
          >
            <div className={styles.formCard}>
              <p className={styles.eyebrow}>Contact Us</p>
              <h2 className={styles.heading}>Get In Touch</h2>

              <div className={styles.formWrap}>
                <iframe
                src="https://link.leadpipeline.ai/widget/form/fegqbVjvGrZqMfbk64P4"
                style={{ width: '100%', height: '480px', border: 'none', display: 'block', borderRadius: '20px' }}
                id="inline-fegqbVjvGrZqMfbk64P4"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Request a Call Back Form"
                data-height="400"
                data-layout-iframe-id="inline-fegqbVjvGrZqMfbk64P4"
                data-form-id="fegqbVjvGrZqMfbk64P4"
                title="Request a Call Back"
                scrolling="no"
              />
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Info + Map column ─────────────────── */}
          <motion.div
            className={styles.infoCol}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.85, ease: SLIDE_EASE, delay: 0.12 }}
          >
            <p className={styles.infoDesc}>
              Reach us by phone, email, or visit us at the clinic. You can also
              follow us on social media for the latest treatments, patient results,
              and wellness tips from our team.
            </p>

            {/* Contact info grid */}
            <motion.div
              className={styles.contactGrid}
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              {/* Phone + Email */}
              {CONTACT_ITEMS.map((item) => (
                <motion.a
                  key={item.value}
                  href={item.href}
                  className={styles.contactItem}
                  variants={fadeUp}
                >
                  <div className={styles.contactIconWrap}>{item.icon}</div>
                  <span className={styles.contactValue}>{item.value}</span>
                </motion.a>
              ))}

              {/* Opening hours card */}
              <motion.div className={`${styles.contactItem} ${styles.hoursCard}`} variants={fadeUp}>
                <span className={styles.contactLabel}>Opening Hours</span>
                <div className={styles.hoursGrid}>
                  {HOURS.map((h) => (
                    <div key={h.days} className={styles.hoursRow}>
                      <span className={styles.hoursDay}>{h.days}</span>
                      <span className={styles.hoursTime}>{h.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Social media card */}
              <motion.div className={`${styles.contactItem} ${styles.socialCard}`} variants={fadeUp}>
                <span className={styles.contactLabel}>Follow Us</span>
                <div className={styles.socialLinks}>
                  {SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={`The One Clinic on ${s.label}`}
                    >
                      <div className={styles.socialIcon}>{s.icon}</div>
                      <div className={styles.socialMeta}>
                        <span className={styles.socialName}>{s.label}</span>
                        <span className={styles.socialHandle}>{s.handle}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Map embed */}
            <div className={styles.mapWrap}>
              <iframe
                src={getMapsEmbedUrl()}
                title="The One Clinic location"
                className={styles.mapIframe}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Map showing clinic location"
              />
              <a
                href={getMapsSearchUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapOverlay}
                aria-label="Open in Google Maps"
              >
                <span className={styles.mapCta}>
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 2h10M12 2v10M2 12L12 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Open in Google Maps
                </span>
              </a>
            </div>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
}
