'use client';

import { CLINIC_INFO, getMapsSearchUrl } from '@/lib/clinic-info';
import styles from './Footer.module.css';

/* ── Inline SVGs ──────────────────────────────────────────── */
function CircleArrow() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true" className={styles.circleArrow}>
      <circle cx="8.5" cy="8.5" r="7.75" stroke="currentColor" strokeWidth="1.25"/>
      <path d="M5.5 11.5L11.5 5.5M7 5.5h4.5v4.5" stroke="currentColor" strokeWidth="1.25"
        strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M18 10c0-4.418-3.582-8-8-8S2 5.582 2 10c0 3.993 2.925 7.307 6.75 7.903V12.375H6.813V10H8.75V8.313c0-1.912 1.139-2.969 2.88-2.969.835 0 1.707.149 1.707.149v1.876h-.962c-.947 0-1.242.587-1.242 1.19V10h2.11l-.337 2.375H11.133v5.528C14.926 17.307 18 13.993 18 10z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M10 2.163c2.604 0 2.914.01 3.942.057 2.654.121 3.888 1.374 4.009 4.009.047 1.027.057 1.337.057 3.942s-.01 2.914-.057 3.942c-.121 2.635-1.355 3.888-4.009 4.009-1.028.047-1.338.057-3.942.057s-2.914-.01-3.942-.057c-2.654-.121-3.888-1.374-4.009-4.009C2.002 12.914 2 12.604 2 10s.01-2.914.057-3.942C2.178 3.374 3.412 2.121 6.058 2.06 7.086 2.01 7.396 2 10 2zm0 1.802c-2.558 0-2.858.01-3.86.056-2.028.093-2.97 1.05-3.063 3.063C3.03 7.883 3.02 8.183 3.02 10c0 2.558.01 2.858.056 3.86.093 2.013 1.035 2.97 3.063 3.063 1.002.046 1.302.056 3.86.056s2.858-.01 3.86-.056c2.028-.093 2.97-1.05 3.063-3.063.046-1.002.056-1.302.056-3.86 0-2.558-.01-2.858-.056-3.86-.093-2.013-1.035-2.97-3.063-3.063C12.858 3.97 12.558 3.96 10 3.96zm0 3.07a2.97 2.97 0 100 5.94 2.97 2.97 0 000-5.94zm0 4.9a1.93 1.93 0 110-3.86 1.93 1.93 0 010 3.86zm3.8-5.04a.693.693 0 110 1.387.693.693 0 010-1.387z"/>
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      {/* ══════════════════════════════════════════════
          NEWSLETTER BAND
      ══════════════════════════════════════════════ */}
      <div className={styles.newsletterBand}>
        <div className={styles.newsletterInner}>

          {/* Left: copy */}
          <div className={styles.newsletterText}>
            <p className={styles.newsletterEyebrow}>Stay Informed</p>
            <h2 className={styles.newsletterTitle}>
              Keep me in the loop,<br />
              <span className={styles.newsletterTitleAccent}>The One Newsletter</span>
            </h2>
            <p className={styles.newsletterDesc}>
              Expert health insights, treatment updates, and exclusive offers from
              The One Clinic delivered straight to your inbox.
            </p>
          </div>

          {/* Right: form */}
          <div className={styles.newsletterFormWrap}>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore — scrolling is a valid iframe attr but deprecated in HTML spec */}
            <iframe
              src="https://link.leadpipeline.ai/widget/form/dViZEitr7fnCtl8rKT3Q"
              style={{ width: '100%', height: '560px', minHeight: '560px', border: 'none', borderRadius: '10px', display: 'block' }}
              id="inline-dViZEitr7fnCtl8rKT3Q"
              scrolling="no"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Newsletter Form"
              data-height="560"
              data-layout-iframe-id="inline-dViZEitr7fnCtl8rKT3Q"
              data-form-id="dViZEitr7fnCtl8rKT3Q"
              title="Newsletter Form"
            />
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════════
          CONTACT / LEGAL ROW
      ══════════════════════════════════════════════ */}
      <div className={styles.inner}>

        {/* Left zone: Contact + Connect */}
        <div className={styles.leftZone}>

          <div className={styles.col}>
            <p className={styles.colLabel}>Contact</p>
            <a href={`tel:${CLINIC_INFO.phone.tel}`} className={styles.contactItem}>
              {CLINIC_INFO.phone.display}
            </a>
            <a href={`mailto:${CLINIC_INFO.email}`} className={styles.contactItem}>
              {CLINIC_INFO.email}
            </a>
            <address className={styles.address}>
              {CLINIC_INFO.address.street}, {CLINIC_INFO.address.locality}<br />
              {CLINIC_INFO.address.postalCode}
            </address>
            <a
              href={getMapsSearchUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.viewMap}
            >
              View Map <CircleArrow />
            </a>
          </div>

          <div className={styles.col}>
            <p className={styles.colLabel}>Connect</p>
            <div className={styles.socials}>
              <a
                href={CLINIC_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="The One Clinic on Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href={CLINIC_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="The One Clinic on Instagram"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

        </div>

        {/* Centre: navigation */}
        <div className={styles.centerZone}>
          <nav className={styles.footerNav} aria-label="Footer navigation">
            <div className={styles.navCol}>
              <p className={styles.navLabel}>About</p>
              <ul className={styles.navList}>
                <li><a href="/our-team">Our Team</a></li>
                <li><a href="/our-facilities">Our Facilities</a></li>
                <li><a href="/what-we-do">What We Do</a></li>
              </ul>
            </div>

            <div className={styles.navCol}>
              <p className={styles.navLabel}>Services</p>
              <ul className={styles.navList}>
                <li><a href="/treatments">Treatments</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/results">Results</a></li>
              </ul>
            </div>

            <div className={styles.navCol}>
              <p className={styles.navLabel}>Info</p>
              <ul className={styles.navList}>
                <li><a href="/contact">Contact Us</a></li>
                <li><a href="/patient-experience">Patient Experience</a></li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Right zone: legal */}
        <div className={styles.rightZone}>
          <p className={styles.copyright}>
            &copy; THE ONE CLINIC {year}. ALL RIGHTS RESERVED.
          </p>
          <nav className={styles.legalLinks} aria-label="Legal links">
            <a href="/terms-conditions" className={styles.legalLink}>
              Terms &amp; Conditions <CircleArrow />
            </a>
            <a href="/privacy-policy" className={styles.legalLink}>
              Privacy Policy <CircleArrow />
            </a>
          </nav>
        </div>

      </div>

      {/* ══════════════════════════════════════════════
          CREDIT LINE
      ══════════════════════════════════════════════ */}
      <div className={styles.creditLine}>
        Design, Developed and Managed by <a href="https://mangoeyes.co" target="_blank" rel="noopener noreferrer" className={styles.creditLink}>mangoeyes.co</a>
      </div>

    </footer>
  );
}
