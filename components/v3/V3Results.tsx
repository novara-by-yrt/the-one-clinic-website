import Image from 'next/image';
import Link from 'next/link';
import styles from './V3Results.module.css';

/**
 * Before and after cards. Section copy, treatment titles and alt text
 * are the live homepage's, unaltered.
 *
 * The live carousel runs fifty of these; six are shown here with the
 * rest a click away, which is what the section's own CTA already
 * offers. Filenames are the "B-A" variants rather than the
 * "Before & After" ones: Next 16's image optimizer reads the `&` in a
 * local path as the start of a query string and returns 400.
 */
const RESULTS = [
  { src: '/images/Endolift B-A.jpg', title: 'Endolift', alt: 'Endolift before and after results' },
  { src: '/images/Lumecca IPL B-A.jpg', title: 'Lumecca IPL', alt: 'Lumecca IPL before and after results' },
  { src: '/images/Morpheus8 1 B-A.jpg', title: 'Morpheus 8', alt: 'Morpheus8 before and after result 1' },
  {
    src: '/images/Wrinkle Relaxing Injections BA.jpg',
    title: 'Anti-Wrinkle Injections',
    alt: 'Anti-wrinkle injections before and after results',
  },
  { src: '/images/B-A2.png', title: 'Patient Results', alt: 'Patient before and after results' },
  { src: '/images/B-A6.png', title: 'Patient Results', alt: 'Patient before and after results' },
];

export default function V3Results() {
  return (
    <section
      className={styles.section}
      id="results"
      data-section-theme="light"
      aria-labelledby="v3-results-title"
    >
      <div className="v3-shell">
        <header className={`${styles.head} v3-narrow`}>
          <span className="v3-label">Patient Outcomes</span>
          <h2 id="v3-results-title" className="v3-h2">
            Real Transformations
          </h2>
          <p className="v3-lead">
            Helping patients achieve confidence and long-term results, one
            personalised treatment at a time.
          </p>
        </header>

        <ul className={styles.grid}>
          {RESULTS.map((r, i) => (
            <li key={`${r.src}-${i}`} className={styles.card}>
              <span className={styles.plate}>
                <Image
                  src={r.src}
                  alt={r.alt}
                  fill
                  loading="lazy"
                  quality={75}
                  sizes="(max-width: 599px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  className="v3-plate"
                />
              </span>
              <span className={styles.caption}>{r.title}</span>
            </li>
          ))}
        </ul>

        <div className={styles.footer}>
          <Link href="/results" className="v3-btn v3-btnOutline">
            View More Results
          </Link>
        </div>
      </div>
    </section>
  );
}
