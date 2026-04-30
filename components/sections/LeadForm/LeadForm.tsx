'use client';

import { motion } from 'framer-motion';
import Script from 'next/script';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './LeadForm.module.css';

const SLIDE_EASE = [0.25, 0.1, 0.25, 1] as const;

const MAPS_URL  = 'https://www.google.com/maps/place/The+One+Clinic+-+Leicester/@52.6272773,-1.1274381,17z';
const EMBED_URL = 'https://maps.google.com/maps?q=36+De+Montfort+St,+Leicester+LE1+7GS,+United+Kingdom&output=embed';

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="M22 7l-10 7L2 7"/>
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
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
  {
    icon: <PhoneIcon />,
    label: 'Phone Number',
    value: '07481 342 374',
    href: 'tel:07481342374',
  },
  {
    icon: <EmailIcon />,
    label: 'Email Address',
    value: 'info@the-oneclinic.net',
    href: 'mailto:info@the-oneclinic.net',
  },
  {
    icon: <LocationIcon />,
    label: 'Our Clinic',
    value: '36 DeMontfort Street, Leicester LE1 7GS',
    href: MAPS_URL,
  },
];

const SOCIAL_LINKS = [
  {
    icon: <InstagramIcon />,
    label: 'Instagram',
    handle: '@theoneclinic.uk',
    href: 'https://www.instagram.com/theoneclinic.uk/',
  },
  {
    icon: <FacebookIcon />,
    label: 'Facebook',
    handle: 'theoneclinic.uk',
    href: 'https://www.facebook.com/theoneclinic.uk',
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
                src="https://link.leadpipeline.ai/widget/form/Az3D8kxDVBz2diDQJ3uY"
                style={{ width: '100%', height: '509px', border: 'none', display: 'block' }}
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
              {/* Standard contact cards */}
              {CONTACT_ITEMS.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className={styles.contactItem}
                  variants={fadeUp}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <div className={styles.contactIcon}>{item.icon}</div>
                  <span className={styles.contactLabel}>{item.label}</span>
                  <span className={styles.contactValue}>{item.value}</span>
                </motion.a>
              ))}

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
