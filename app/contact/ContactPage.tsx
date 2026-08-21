'use client';

import { useRef, useEffect } from 'react';
import { m } from 'framer-motion';
import { CLINIC_INFO, getMapsEmbedUrl, getMapsSearchUrl } from '@/lib/clinic-info';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './page.module.css';

const HOURS = CLINIC_INFO.hours.map(h => ({
  day: h.day,
  hours: h.open && h.close ? `${h.open}, ${h.close}` : 'Closed',
}));

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

const FORM_ID = '0tX56kJTWOHkgkZ6UYno';

export default function ContactPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const lock = () => {
      if (iframe.getAttribute('scrolling') !== 'no') iframe.setAttribute('scrolling', 'no');
      iframe.style.overflow = 'hidden';
    };
    lock();
    const observer = new MutationObserver(lock);
    observer.observe(iframe, { attributes: true, attributeFilter: ['scrolling', 'style'] });
    return () => observer.disconnect();
  }, []);

  return (
    <>
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
          <m.div
            className={styles.heroContent}
            variants={stagger(0.15)}
            initial="hidden"
            animate="show"
          >
            <m.h1 className={styles.heroTitle} variants={fadeUp}>
              Get in Touch
            </m.h1>
            <m.p className={styles.heroDesc} variants={fadeUp}>
              Book a consultation or ask a question by simply filling in the form below,
              and one of our team will be in touch.
            </m.p>
          </m.div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          2. CONTACT INFO + FORM
      ══════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <div className={styles.mainGrid}>

            {/* Left, contact details */}
            <m.div
              className={styles.infoCol}
              variants={stagger(0.12)}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              {/* Contact details card */}
              <m.div className={styles.infoCard} variants={fadeUp}>
                <h2 className={styles.infoHeading}>Contact Details</h2>

                <a href={`tel:${CLINIC_INFO.phone.tel}`} className={styles.contactRow}>
                  <span className={styles.contactIcon} aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                    </svg>
                  </span>
                  <span className={styles.contactText}>{CLINIC_INFO.phone.display}</span>
                </a>

                <a href={`mailto:${CLINIC_INFO.email}`} className={styles.contactRow}>
                  <span className={styles.contactIcon} aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </span>
                  <span className={styles.contactText}>{CLINIC_INFO.email}</span>
                </a>

                <a
                  href={getMapsSearchUrl()}
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
                    {CLINIC_INFO.address.street}<br />{CLINIC_INFO.address.locality} {CLINIC_INFO.address.postalCode}
                  </span>
                </a>

                {/* Parking & Accessibility */}
                <div className={styles.contactRow} style={{ pointerEvents: 'none' }}>
                  <span className={styles.contactIcon} aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <line x1="9" y1="9" x2="15" y2="9"/>
                      <line x1="9" y1="15" x2="15" y2="15"/>
                    </svg>
                  </span>
                  <div className={styles.contactText}>
                    <strong>Parking &amp; Accessibility</strong><br />Disabled parking at the rear of the building
                  </div>
                </div>

                {/* Social */}
                <div className={styles.socialRow}>
                  <a
                    href={CLINIC_INFO.social.facebook}
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
                    href={CLINIC_INFO.social.instagram}
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
              </m.div>

              {/* Opening hours card */}
              <m.div className={styles.infoCard} variants={fadeUp}>
                <h2 className={styles.infoHeading}>Opening Hours</h2>
                <ul className={styles.hoursList}>
                  {HOURS.map(({ day, hours }) => (
                    <li key={day} className={styles.hoursRow}>
                      <span className={styles.hoursDay}>{day}</span>
                      <span className={styles.hoursTime}>{hours}</span>
                    </li>
                  ))}
                </ul>
              </m.div>
            </m.div>

            {/* Right, form */}
            <m.div
              className={styles.formCol}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              <div className={styles.formCard}>
                <p className={styles.formEyebrow}>Book a Consultation</p>
                <h2 className={styles.formHeading}>Get in Touch with Us</h2>
                <div className={styles.formWrap}>
                  <iframe
                    ref={iframeRef}
                    src={`https://link.leadpipeline.ai/widget/form/${FORM_ID}`}
                    style={{ width: '100%', height: '505px', minHeight: '505px', border: 'none', borderRadius: '0px', display: 'block', overflow: 'hidden' }}
                    id={`inline-${FORM_ID}`}
                    data-layout="{'id':'INLINE'}"
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="Contact Us New Form"
                    data-height="505"
                    data-layout-iframe-id={`inline-${FORM_ID}`}
                    data-form-id={FORM_ID}
                    title="Contact Us New Form"
                    scrolling="no"
                  />
                </div>
              </div>
            </m.div>
          </div>
        </Container>
      </Section>

      {/* ══════════════════════════════════════
          3. FACILITIES
      ══════════════════════════════════════ */}
      <Section variant="dark" data-section-theme="dark">
        <Container>
          <m.div
            className={styles.facilitiesGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.div variants={fadeUp}>
              <p className={styles.eyebrowLight}>Our Clinic</p>
              <h2 className={styles.headingLight}>Purpose-Built Facilities</h2>
            </m.div>
            <m.p className={styles.facilitiesText} variants={fadeUp}>
              Visit our state-of-the-art purpose-built clinic in Leicester. Our clinic has been
              carefully designed to deliver a premium experience from the moment you arrive. With
              dedicated treatment rooms, a welcoming reception area, and a discreet, private
              environment, every detail has been considered with your comfort in mind.
            </m.p>
          </m.div>
        </Container>
      </Section>

      {/* ══════════════════════════════════════
          4. MAP
      ══════════════════════════════════════ */}
      <section className={styles.mapSection} aria-label="Clinic location map" data-section-theme="light">
        <Container>
          <m.div
            className={styles.locationCard}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {/* ── Map panel ── */}
            <m.div className={styles.mapPanel} variants={fadeUp}>
              <iframe
                src={getMapsEmbedUrl()}
                className={styles.mapFrame}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The One Clinic location map"
              />
              <a
                href={getMapsSearchUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapAddressChip}
                aria-label="Open clinic address in Google Maps"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{CLINIC_INFO.address.display}</span>
              </a>
            </m.div>

            {/* ── Info panel ── */}
            <div className={styles.mapContent}>
              <m.div variants={fadeUp}>
                <p className={styles.eyebrowDark}>Getting Here</p>
                <h2 className={styles.headingDark}>About the Area</h2>
              </m.div>

              <m.p className={styles.mapText} variants={fadeUp}>
                Our clinic sits in the heart of Leicester on DeMontfort Street, moments from
                the city centre and easily reached by public transport. Whether you arrive by
                bus, car, or on foot, we are simple to find.
              </m.p>

              <m.ul className={styles.travelList} variants={fadeUp}>
                <li className={styles.travelItem}>
                  <span className={styles.travelIcon} aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </span>
                  <span className={styles.travelBody}>
                    <span className={styles.travelTitle}>Central Location</span>
                    <span className={styles.travelDesc}>Heart of Leicester, near the city centre</span>
                  </span>
                </li>
                <li className={styles.travelItem}>
                  <span className={styles.travelIcon} aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 16V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10"/>
                      <path d="M4 11h16"/>
                      <path d="M4 16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2"/>
                      <circle cx="8" cy="18" r="1.4"/>
                      <circle cx="16" cy="18" r="1.4"/>
                    </svg>
                  </span>
                  <span className={styles.travelBody}>
                    <span className={styles.travelTitle}>Public Transport</span>
                    <span className={styles.travelDesc}>Well connected by local bus routes</span>
                  </span>
                </li>
                <li className={styles.travelItem}>
                  <span className={styles.travelIcon} aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="4" width="16" height="16" rx="3"/>
                      <path d="M9 16V8h3.2a2.4 2.4 0 0 1 0 4.8H9"/>
                    </svg>
                  </span>
                  <span className={styles.travelBody}>
                    <span className={styles.travelTitle}>Parking Nearby</span>
                    <span className={styles.travelDesc}>Pay-and-display parking close by</span>
                  </span>
                </li>
              </m.ul>

              <m.a
                href={getMapsSearchUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.directionsBtn}
                variants={fadeUp}
              >
                Get Directions
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </m.a>
            </div>
          </m.div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          5. AREAS / TREATMENTS
      ══════════════════════════════════════ */}
      <Section variant="light" data-section-theme="light">
        <Container>
          <m.div
            className={styles.areasHeader}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <m.p className={styles.eyebrowDark} variants={fadeUp}>What We Offer</m.p>
            <m.h2 className={styles.headingDark} variants={fadeUp}>Treatments &amp; Areas We Cover</m.h2>
            <m.p className={styles.areasIntro} variants={fadeUp}>
              The One Clinic offers a comprehensive range of medical and aesthetic treatments
              for patients across Leicester and the surrounding areas. Our team of GMC-registered
              doctors and trained practitioners deliver care across two key specialities.
            </m.p>
          </m.div>

          <m.div
            className={styles.categoriesGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {CATEGORIES.map((cat) => (
              <m.a
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
              </m.a>
            ))}
          </m.div>

          <div className={styles.ageDisclaimerWrap}>
            <p className={styles.ageDisclaimer}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Please note: The One Clinic does not provide treatments or consultations to individuals under the age of 13.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
