import { CLINIC_INFO, getMapsEmbedUrl, getMapsSearchUrl } from '@/lib/clinic-info';
import styles from './V2Visit.module.css';

/**
 * Address, hours and map.
 *
 * Hours are derived here from CLINIC_INFO.hours rather than from
 * getHoursDisplay(), which is shared with the live pages and currently
 * joins its ranges with a comma ("Monday , Friday", "09:00 , 18:00").
 * Reformatting locally fixes the reading on this page without touching a
 * helper the rest of the site renders.
 */
const [monday, , , , , saturday, sunday] = CLINIC_INFO.hours;

function range(h: { open: string | null; close: string | null }) {
  return h.open && h.close ? `${h.open} to ${h.close}` : 'Closed';
}

const HOURS = [
  { days: 'Monday to Friday', time: range(monday) },
  { days: 'Saturday', time: range(saturday) },
  { days: 'Sunday', time: range(sunday) },
];

export default function V2Visit() {
  return (
    <section
      className={styles.section}
      id="contact"
      data-section-theme="light"
      aria-labelledby="v2-visit-title"
    >
      <div className="v2-shell">
        <header className="v2-sectionHead">
          <h2 id="v2-visit-title" className="v2-h2">
            Visit us
          </h2>
          <p className="v2-lead">
            In the centre of Leicester, a short walk from the railway station.
          </p>
        </header>

        <div className={styles.layout}>
          <div className={styles.details}>
            <div className={styles.block}>
              <h3 className={styles.blockTitle}>Address</h3>
              <p className={styles.address}>
                {CLINIC_INFO.address.street}
                <br />
                {CLINIC_INFO.address.locality} {CLINIC_INFO.address.postalCode}
              </p>
              <a
                className="v2-link"
                href={getMapsSearchUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Google Maps
              </a>
            </div>

            <div className={styles.block}>
              <h3 className={styles.blockTitle}>Contact</h3>
              <ul className={styles.contactList}>
                <li>
                  <a className={styles.contactLink} href={`tel:${CLINIC_INFO.phone.tel}`}>
                    {CLINIC_INFO.phone.display}
                  </a>
                </li>
                <li>
                  <a className={styles.contactLink} href={`mailto:${CLINIC_INFO.email}`}>
                    {CLINIC_INFO.email}
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.block}>
              <h3 className={styles.blockTitle}>Opening hours</h3>
              <dl className={styles.hours}>
                {HOURS.map((h) => (
                  <div key={h.days} className={styles.hoursRow}>
                    <dt className={styles.hoursDays}>{h.days}</dt>
                    <dd className={styles.hoursTime}>{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className={styles.map}>
            <iframe
              className={styles.mapFrame}
              src={getMapsEmbedUrl()}
              title={`Map showing ${CLINIC_INFO.name}, ${CLINIC_INFO.address.display}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
