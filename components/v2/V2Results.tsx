import Image from 'next/image';
import Link from 'next/link';
import styles from './V2Results.module.css';

/**
 * A gapless contact sheet, edge to edge. The plates butt against each
 * other with only a hairline between them, which is the opposite of the
 * airy, gapped mosaic used for treatments, and keeps this section from
 * reading as the same layout twice.
 *
 * Four results rather than the fifty on the live carousel: the rest live
 * on the results page.
 */
/**
 * Filenames here are deliberately the "B-A" variants rather than the
 * "Before & After" ones used elsewhere in the repo: Next 16's image
 * optimizer reads the `&` in a local path as the start of a query
 * string and rejects the request with a 400, so those files render as
 * broken images. The same set without an ampersand optimizes normally.
 */
const RESULTS = [
  {
    src: '/images/Endolift B-A.jpg',
    label: 'Endolift',
    alt: 'Endolift before and after result',
  },
  {
    src: '/images/Morpheus8 1 B-A.jpg',
    label: 'Morpheus 8',
    alt: 'Morpheus 8 before and after result',
  },
  {
    src: '/images/Lumecca IPL B-A.jpg',
    label: 'Lumecca IPL',
    alt: 'Lumecca IPL before and after result',
  },
  {
    src: '/images/Wrinkle Relaxing Injections BA.jpg',
    label: 'Anti-wrinkle injections',
    alt: 'Anti-wrinkle injections before and after result',
  },
];

export default function V2Results() {
  return (
    <section
      className={styles.section}
      id="results"
      data-section-theme="light"
      aria-labelledby="v2-results-title"
    >
      <div className="v2-shell">
        <header className="v2-sectionHead">
          <h2 id="v2-results-title" className="v2-h2">
            Results
          </h2>
          <p className="v2-lead">
            Before and after, photographed at the clinic. Outcomes vary between
            patients.
          </p>
        </header>

        <ul className={styles.sheet}>
          {RESULTS.map((r) => (
            <li key={r.src} className={styles.cell}>
              <span className={styles.plate}>
                <Image
                  src={r.src}
                  alt={r.alt}
                  fill
                  loading="lazy"
                  quality={75}
                  sizes="(max-width: 700px) 50vw, 25vw"
                  className="v2-plate"
                />
              </span>
              <span className={styles.label}>{r.label}</span>
            </li>
          ))}
        </ul>

        <div className={styles.footer}>
          <Link href="/results" className="v2-link">
            See more results
          </Link>
        </div>
      </div>
    </section>
  );
}
