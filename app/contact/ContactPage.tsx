'use client';

import Script from 'next/script';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './page.module.css';

const PHONE = '07481342374';
const PHONE_DISPLAY = '07481 342374';
const EMAIL = 'info@the-oneclinic.net';
const ADDRESS_LINE1 = '36 DeMontfort Street';
const ADDRESS_LINE2 = 'Leicester LE1 7GS';
const FACEBOOK = 'https://www.facebook.com/theoneclinic.uk';
const INSTAGRAM = 'https://www.instagram.com/theoneclinic.uk/';
const MAPS_EMBED = 'https://maps.google.com/maps?q=36+De+Montfort+St,+Leicester+LE1+7GS,+United+Kingdom&output=embed';
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=36+De+Montfort+St,+Leicester+LE1+7GS,+United+Kingdom';

const HOURS = [
  { day: 'Monday',    hours: '09:00, 18:00' },
  { day: 'Tuesday',   hours: '09:00, 18:00' },
  { day: 'Wednesday', hours: '09:00, 18:00' },
  { day: 'Thursday',  hours: '09:00, 18:00' },
  { day: 'Friday',    hours: '09:00, 18:00' },
  { day: 'Saturday',  hours: '09:00, 16:00' },
  { day: 'Sunday',    hours: '09:00, 18:00' },
];

const CATEGORIES = [
  {
    title: 'Health & Wellbeing',
    href: '/treatments',
    desc: 'Health screening, blood tests, lifestyle assessments, and preventive care tailored to your needs.',
  },
  {
    title: 'Medical Aesthetics',
    href: '/treatments',
    desc: 'Anti-wrinkle treatments, dermal fillers, skin rejuvenation, and more, delivered by GMC-registered doctors.',
  },
];

export default function ContactPage() {
  return (
    <>
      <Script src="https://link.leadpipeline.ai/js/form_embed.js" strategy="lazyOnload" />

      {/* ══════════════════════════════════════
          1. HERO
      ══════════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Contact, hero"
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
            <motion.h1 className={styles.heroTitle} variants={fadeUp}>
              Get in Touch
            </motion.h1>
            <motion.p className={styles.heroDesc} variants={fadeUp}>
              Book a consultation or ask a question by simply filling in the form below,
              and one of our team will be in touch.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          2. CONTACT INFO + FORM
      ══════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <div className={styles.mainGrid}>

            {/* Left, contact details */}
            <motion.div
              className={styles.infoCol}
              variants={stagger(0.12)}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              {/* Contact details card */}
              <motion.div className={styles.infoCard} variants={fadeUp}>
                <h2 className={styles.infoHeading}>Contact Details</h2>

                <a href={`tel:${PHONE}`} className={styles.contactRow}>
                  <span className={styles.contactIcon} aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                    </svg>
                  </span>
                  <span className={styles.contactText}>{PHONE_DISPLAY}</span>
                </a>

                <a href={`mailto:${EMAIL}`} className={styles.contactRow}>
                  <span className={styles.contactIcon} aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </span>
                  <span className={styles.contactText}>{EMAIL}</span>
                </a>

                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactRow}
                >
                  <span className={styles.contactIcon} aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </span>
                  <span className={styles.contactText}>
                    {ADDRESS_LINE1}<br />{ADDRESS_LINE2}
                  </span>
                </a>

                {/* Social */}
                <div className={styles.socialRow}>
                  <a
                    href={FACEBOOK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialBtn}
                    aria-label="Facebook"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                    </svg>
                    <span>Facebook</span>
                  </a>
                  <a
                    href={INSTAGRAM}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialBtn}
                    aria-label="Instagram"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                    <span>Instagram</span>
                  </a>
                </div>
              </motion.div>

              {/* Opening hours card */}
              <motion.div className={styles.infoCard} variants={fadeUp}>
                <h2 className={styles.infoHeading}>Opening Hours</h2>
                <ul className={styles.hoursList}>
                  {HOURS.map(({ day, hours }) => (
                    <li key={day} className={styles.hoursRow}>
                      <span className={styles.hoursDay}>{day}</span>
                      <span className={styles.hoursTime}>{hours}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* Right, form */}
            <motion.div
              className={styles.formCol}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              <div className={styles.formCard}>
                <p className={styles.formEyebrow}>Book a Consultation</p>
                <h2 className={styles.formHeading}>Request a Call Back</h2>
                <iframe
                  src="https://link.leadpipeline.ai/widget/form/Az3D8kxDVBz2diDQJ3uY"
                  style={{ width: '100%', height: '509px', border: 'none' }}
                  id="contact-form-Az3D8kxDVBz2diDQJ3uY"
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="Book Consultation"
                  data-height="509"
                  data-layout-iframe-id="contact-form-Az3D8kxDVBz2diDQJ3uY"
                  data-form-id="Az3D8kxDVBz2diDQJ3uY"
                  title="Request a Call Back"
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ══════════════════════════════════════
          3. FACILITIES
      ══════════════════════════════════════ */}
      <Section variant="dark" data-section-theme="dark">
        <Container>
          <motion.div
            className={styles.facilitiesGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div variants={fadeUp}>
              <p className={styles.eyebrowLight}>Our Clinic</p>
              <h2 className={styles.headingLight}>Purpose-Built Facilities</h2>
            </motion.div>
            <motion.p className={styles.facilitiesText} variants={fadeUp}>
              Visit our state-of-the-art purpose-built clinic in Leicester. Our clinic has been
              carefully designed to deliver a premium experience from the moment you arrive. With
              dedicated treatment rooms, a welcoming reception area, and a discreet, private
              environment, every detail has been considered with your comfort in mind.
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      {/* ══════════════════════════════════════
          4. MAP
      ══════════════════════════════════════ */}
      <section className={styles.mapSection} aria-label="Clinic location map" data-section-theme="light">
        <div className={styles.mapWrapper}>
          <iframe
            src={MAPS_EMBED}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="The One Clinic location map"
          />
        </div>
        <Container>
          <motion.div
            className={styles.mapInfo}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div variants={fadeUp}>
              <p className={styles.eyebrowDark}>Getting Here</p>
              <h2 className={styles.headingDark}>About the Area</h2>
            </motion.div>
            <motion.p className={styles.mapText} variants={fadeUp}>
              Our clinic is conveniently located in the heart of Leicester on DeMontfort Street,
              close to the city centre and easily accessible by public transport. There is also
              pay-and-display parking available nearby. Whether you are travelling by bus, car,
              or on foot, we are easy to find.
            </motion.p>
            <motion.a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.directionsBtn}
              variants={fadeUp}
            >
              Get Directions
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </motion.div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          5. AREAS / TREATMENTS
      ══════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <motion.div
            className={styles.areasHeader}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.p className={styles.eyebrowDark} variants={fadeUp}>What We Offer</motion.p>
            <motion.h2 className={styles.headingDark} variants={fadeUp}>Treatments &amp; Areas We Cover</motion.h2>
            <motion.p className={styles.areasIntro} variants={fadeUp}>
              The One Clinic offers a comprehensive range of medical and aesthetic treatments
              for patients across Leicester and the surrounding areas. Our team of GMC-registered
              doctors and trained practitioners deliver care across two key specialities.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.categoriesGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {CATEGORIES.map((cat) => (
              <motion.a
                key={cat.title}
                href={cat.href}
                className={styles.categoryCard}
                variants={fadeUp}
              >
                <h3 className={styles.categoryTitle}>{cat.title}</h3>
                <p className={styles.categoryDesc}>{cat.desc}</p>
                <span className={styles.categoryArrow} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </motion.a>
            ))}
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
