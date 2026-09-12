import Image from 'next/image';
import styles from './V2Trust.module.css';

/**
 * The proof band that the live homepage splits between badges inside the
 * hero and a scrolling logo marquee below it. Here both are static and
 * ruled: scores as large numerals, accreditations as a plain row.
 *
 * The logo list is declared here rather than imported from
 * LogoCarousel so that this page owns its own content and the live
 * component stays untouched.
 */
const SCORES = [
  { platform: 'Google', score: '5.0', count: '120+ reviews' },
  { platform: 'Trustpilot', score: '4.7', count: '140+ reviews' },
];

const LOGOS = [
  { src: '/images/imgi_39_cqc-logo.png', alt: 'Care Quality Commission', w: 300, h: 150 },
  { src: '/images/imgi_96_Logo-InMode2-1536x630.png', alt: 'InMode', w: 1536, h: 630 },
  { src: '/images/imgi_78_endolift-768x474.webp', alt: 'Endolift', w: 768, h: 474 },
  { src: '/images/imgi_34_Hydra.png', alt: 'HydraFacial', w: 400, h: 160 },
  {
    src: '/images/imgi_86_AM_Awards_2025-black_FINALIST-1024x704.png',
    alt: 'Aesthetic Medicine Awards 2025 finalist',
    w: 1024,
    h: 704,
  },
  {
    src: '/images/imgi_35_Untitled-3-5-e1749493207346.png',
    alt: 'Aesthetics Awards highly commended',
    w: 400,
    h: 280,
  },
];

export default function V2Trust() {
  return (
    <section
      className={styles.section}
      data-section-theme="light"
      aria-label="Reviews and accreditations"
    >
      <div className="v2-shell">
        <div className={styles.band}>
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
                  sizes="(max-width: 700px) 33vw, 140px"
                  className={styles.logoImg}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
