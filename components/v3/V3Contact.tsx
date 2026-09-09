import {
  CLINIC_INFO,
  getMapsEmbedUrl,
  getMapsSearchUrl,
  getHoursDisplay,
} from '@/lib/clinic-info';
import styles from './V3Contact.module.css';

/**
 * Contact spread: the enquiry form on one side, the clinic's details
 * and map on the other.
 *
 * Copy is the live LeadForm's, unaltered, and the hours come from the
 * same getHoursDisplay() helper the live page calls, so the strings
 * match exactly. The live section renders phone, email and social as
 * icon tiles; here they are set as type, which keeps the page free of
 * decorative iconography and holds the monochrome palette. The social
 * handles are the source's own.
 */
const HOURS = getHoursDisplay();

const SOCIAL_LINKS = [
  { label: 'Instagram', handle: '@theoneclinic.uk', href: CLINIC_INFO.social.instagram },
  { label: 'Facebook', handle: 'theoneclinic.uk', href: CLINIC_INFO.social.facebook },
];

export default function V3Contact() {
  return (
    <section
      className={styles.section}
      id="contact"
      data-section-theme="light"
      aria-labelledby="v3-contact-title"
    >
      <div className="v3-shell">
        <header className={`${styles.head} v3-narrow`}>
          <span className="v3-label">Contact Us</span>
          <h2 id="v3-contact-title" className="v3-h2">
            Get In Touch
          </h2>
          <p className="v3-lead">
            Reach us by phone, email, or visit us at the clinic. You can also
            follow us on social media for the latest treatments, patient results,
            and wellness tips from our team.
          </p>
        </header>

        <div className={styles.layout}>
          <div className={styles.formCol}>
            <div className={styles.formFrame}>
              <iframe
                src="https://link.leadpipeline.ai/widget/form/fegqbVjvGrZqMfbk64P4"
                id="inline-fegqbVjvGrZqMfbk64P4"
                className={styles.formIframe}
                title="Request a Call Back"
                loading="lazy"
                scrolling="no"
              />
            </div>
          </div>

          <div className={styles.infoCol}>
            <dl className={styles.details}>
              <div className={styles.detailRow}>
                <dt className={styles.detailLabel}>Phone</dt>
                <dd className={styles.detailValue}>
                  <a className={styles.link} href={`tel:${CLINIC_INFO.phone.tel}`}>
                    {CLINIC_INFO.phone.display}
                  </a>
                </dd>
              </div>

              <div className={styles.detailRow}>
                <dt className={styles.detailLabel}>Email</dt>
                <dd className={styles.detailValue}>
                  <a className={styles.link} href={`mailto:${CLINIC_INFO.email}`}>
                    {CLINIC_INFO.email}
                  </a>
                </dd>
              </div>

              <div className={styles.detailRow}>
                <dt className={styles.detailLabel}>Address</dt>
                <dd className={styles.detailValue}>{CLINIC_INFO.address.display}</dd>
              </div>
            </dl>

            <div className={styles.block}>
              <p className={styles.blockLabel}>Opening Hours</p>
              <dl className={styles.hours}>
                {HOURS.map((h) => (
                  <div key={h.days} className={styles.hoursRow}>
                    <dt className={styles.hoursDays}>{h.days}</dt>
                    <dd className={styles.hoursTime}>{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className={styles.block}>
              <p className={styles.blockLabel}>Follow Us</p>
              <ul className={styles.social}>
                {SOCIAL_LINKS.map((s) => (
                  <li key={s.label}>
                    <a
                      className={styles.link}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`The One Clinic on ${s.label}`}
                    >
                      {s.handle}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.mapFrame}>
              <iframe
                src={getMapsEmbedUrl()}
                title="The One Clinic location"
                className={styles.mapIframe}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Map showing clinic location"
              />
            </div>

            <a
              className="v3-textLink"
              href={getMapsSearchUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
