import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { CLINIC_INFO, getMapsEmbedUrl, getMapsSearchUrl, getHoursDisplay } from '@/lib/clinic-info';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Thank You for Subscribing | The One Clinic Leicester',
  description: 'Thank you for subscribing to The One Clinic newsletter. You will receive the latest treatments, patient results, and wellness tips from our team.',
  robots: { index: false, follow: false },
};

const HOURS = getHoursDisplay();

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.03 1.17 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z"/>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
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

function CheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="13" stroke="rgb(255 255 255 / 0.2)" strokeWidth="1.5"/>
      <path d="M8.5 14l4 4 7-8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function ThankYouNewsletterPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.hero} data-section-theme="dark" aria-label="Newsletter subscription confirmation">
        <div className={styles.heroGrid} aria-hidden="true" />
        <Container>
          <div className={styles.heroContent}>
            <div className={styles.checkWrap} aria-hidden="true">
              <CheckIcon />
            </div>
            <p className={styles.heroEyebrow}>Subscription Confirmed</p>
            <h1 className={styles.heroTitle}>Thank You for Subscribing!</h1>
            <p className={styles.heroSubtitle}>
              You&apos;re now subscribed to The One Clinic newsletter. Look out for the latest
              treatments, patient results, and wellness tips delivered straight to your inbox.
            </p>
            <Link href="/" className={styles.homeBtn}>
              Back to Home
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </Container>
      </section>

      {/* ── Contact info + Map ── */}
      <div className={styles.body} data-section-theme="dark">
        <Container>

          {/* 2×2 info grid */}
          <div className={styles.infoGrid}>

            {/* Phone */}
            <a href={`tel:${CLINIC_INFO.phone.tel}`} className={styles.infoCard}>
              <div className={styles.cardIcon}><PhoneIcon /></div>
              <span className={styles.cardValue}>{CLINIC_INFO.phone.display}</span>
            </a>

            {/* Email */}
            <a href={`mailto:${CLINIC_INFO.email}`} className={styles.infoCard}>
              <div className={styles.cardIcon}><EmailIcon /></div>
              <span className={styles.cardValue}>{CLINIC_INFO.email}</span>
            </a>

            {/* Opening hours */}
            <div className={`${styles.infoCard} ${styles.infoCardStatic}`}>
              <p className={styles.cardLabel}>Opening Hours</p>
              <div className={styles.hoursList}>
                {HOURS.map((h) => (
                  <div key={h.days} className={styles.hoursRow}>
                    <span className={styles.hoursDay}>{h.days}</span>
                    <span className={styles.hoursTime}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Follow us */}
            <div className={`${styles.infoCard} ${styles.infoCardStatic}`}>
              <p className={styles.cardLabel}>Follow Us</p>
              <div className={styles.socialRow}>
                <a
                  href={CLINIC_INFO.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label="The One Clinic on Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href={CLINIC_INFO.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label="The One Clinic on Facebook"
                >
                  <FacebookIcon />
                </a>
              </div>
            </div>

          </div>

          {/* Map */}
          <div className={styles.mapWrap}>
            <iframe
              src={getMapsEmbedUrl()}
              title="The One Clinic location"
              className={styles.mapIframe}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label="Map showing The One Clinic location"
            />
            <a
              href={getMapsSearchUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapCta}
              aria-label="Open in Google Maps"
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 2h10M12 2v10M2 12L12 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Open in Google Maps
            </a>
          </div>

        </Container>
      </div>
    </>
  );
}
