import { CLINIC_INFO, getMapsSearchUrl } from '@/lib/clinic-info';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import styles from './V5ClosingPanel.module.css';

/**
 * The last panel, which carries the closing call to action and the site
 * footer's content.
 *
 * A horizontal track has no bottom edge, so the site's own footer is
 * suppressed on this route (see components/layout/footer-mode.ts) and
 * its content lives here instead: contact details, the address, the
 * navigation columns and the legal links, all with the labels and
 * destinations the real footer uses.
 *
 * Copy is the live site's, unaltered: the heading block from the
 * homepage's closing call to action, the rest from the footer.
 */
const NAV = [
  {
    label: 'About',
    links: [
      { href: '/our-team', label: 'Our Team' },
      { href: '/our-facilities', label: 'Our Facilities' },
      { href: '/what-we-do', label: 'What We Do' },
    ],
  },
  {
    label: 'Services',
    links: [
      { href: '/treatments', label: 'Treatments' },
      { href: '/blog', label: 'Blog' },
      { href: '/results', label: 'Results' },
    ],
  },
  {
    label: 'Info',
    links: [
      { href: '/contact', label: 'Contact Us' },
      { href: '/patient-experience', label: 'Patient Experience' },
    ],
  },
];

const LEGAL = [
  { href: '/terms-conditions', label: 'Terms & Conditions' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/complaints-policy', label: 'Complaints Policy' },
];

export default function V5ClosingPanel({ id }: { id: string }) {
  return (
    <section
      id={id}
      className={`${styles.panel} v5-slide v5-onInk`}
      aria-labelledby={`${id}-title`}
    >
      <span className="v5-themeMark" data-section-theme="dark" aria-hidden="true" />
      <div className={styles.inner}>
        <div className={`${styles.lead} v5-layerText`}>
          <p className={styles.eyebrow}>Take the First Step</p>

          <h2 id={`${id}-title`} className={styles.headline}>
            Ready to Feel Your Best?
          </h2>

          <p className={styles.body}>
            Our team is here to help. Book your consultation today and take
            control of your health and confidence.
          </p>

          <div className={styles.actions}>
            <BookConsultationButton className="v5-cta">
              Book Your Consultation
            </BookConsultationButton>
            <a href={`tel:${CLINIC_INFO.phone.tel}`} className="v5-cta v5-ctaGhost">
              Call {CLINIC_INFO.phone.display}
            </a>
          </div>
        </div>

        <div className={`${styles.details} v5-layerMedia`}>
          <div className={styles.block}>
            <p className={styles.blockLabel}>Contact</p>
            <a className={styles.link} href={`tel:${CLINIC_INFO.phone.tel}`}>
              {CLINIC_INFO.phone.display}
            </a>
            <a className={styles.link} href={`mailto:${CLINIC_INFO.email}`}>
              {CLINIC_INFO.email}
            </a>
            <address className={styles.address}>
              {CLINIC_INFO.address.street}, {CLINIC_INFO.address.locality}
              <br />
              {CLINIC_INFO.address.postalCode}
            </address>
            <a
              className={styles.link}
              href={getMapsSearchUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Map
            </a>
          </div>

          <nav className={styles.nav} aria-label="Footer navigation">
            {NAV.map((col) => (
              <div key={col.label} className={styles.block}>
                <p className={styles.blockLabel}>{col.label}</p>
                <ul className={styles.list}>
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <a className={styles.link} href={l.href}>
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className={styles.legal}>
          <nav className={styles.legalLinks} aria-label="Legal links">
            {LEGAL.map((l) => (
              <a key={l.href} className={styles.legalLink} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <p className={styles.copyright}>
            © The One Clinic {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
