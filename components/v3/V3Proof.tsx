import Image from 'next/image';
import styles from './V3Proof.module.css';

/**
 * Credibility strip: the review scores from the live hero and the
 * accreditation marks from the live logo carousel, placed cleanly
 * rather than boxed, and static rather than scrolling.
 *
 * The live badges use Google's four-colour mark and Trustpilot's green
 * star. The brand palette is black, white and grey only, so the scores
 * are set as type instead. The wording is unchanged.
 */
const SCORES = [
  { platform: 'Google', score: '5.0', count: '120+ reviews' },
  { platform: 'Trustpilot', score: '4.7', count: '140+ reviews' },
];

const LOGOS = [
  { src: '/images/imgi_39_cqc-logo.png', alt: 'Care Quality Commission', w: 300, h: 150 },
  { src: '/images/imgi_96_Logo-InMode2-1536x630.png', alt: 'InMode', w: 1536, h: 630 },
  { src: '/images/imgi_78_endolift-768x474.webp', alt: 'Endolift', w: 768, h: 474 },
  { src: '/images/imgi_34_Hydra.png', alt: 'Hydra', w: 400, h: 160 },
  {
    src: '/images/imgi_86_AM_Awards_2025-black_FINALIST-1024x704.png',
    alt: 'AM Awards 2025 Finalist',
    w: 1024,
    h: 704,
  },
  {
    src: '/images/imgi_35_Untitled-3-5-e1749493207346.png',
    alt: 'Aesthetics Awards Highly Commended',
    w: 400,
    h: 280,
  },
];

export default function V3Proof() {
  return (
    <section
      className={styles.section}
      data-section-theme="light"
      aria-label="Recognised &amp; Certified"
    >
      <div className="v3-shell">
        <ul className={styles.scores}>
          {SCORES.map((s) => (
            <li key={s.platform} className={styles.score}>
              <span className={styles.scoreValue}>{s.score}</span>
              <span className={styles.scoreMeta}>
                <span className={styles.scorePlatform}>{s.platform}</span>
                <span className={styles.scoreCount}>{s.count}</span>
              </span>
            </li>
          ))}
        </ul>

        <hr className="v3-hairline" />

        <p className={styles.certLabel}>Recognised &amp; Certified</p>

        <ul className={styles.logos}>
          {LOGOS.map((logo) => (
            <li key={logo.src} className={styles.logo}>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.w}
                height={logo.h}
                loading="lazy"
                quality={75}
                sizes="(max-width: 700px) 30vw, 150px"
                className={styles.logoImg}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
