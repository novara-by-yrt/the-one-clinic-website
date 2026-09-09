import Image from 'next/image';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import styles from './V3Hero.module.css';

/**
 * Type on the left, a pair of treatment plates on the right.
 *
 * Replaces a single full-bleed photograph with copy scrimmed over it.
 * Nothing is overlaid on an image here, so contrast is fixed by the
 * ground rather than by how the photograph happens to crop at a given
 * width, and the plates can carry their own colour.
 *
 * The ground stays ink because the site header renders white on
 * transparent until the reader scrolls, on every route. A paper hero
 * would leave the navigation invisible against it.
 *
 * Every string is the live homepage's, unaltered.
 */
const PLATES = [
  {
    src: '/images/Lumecca IPL Laser 2.png',
    alt: 'A Lumecca IPL laser treatment at The One Clinic',
  },
  {
    src: '/images/Morpheus8 1.png',
    alt: 'A Morpheus8 treatment at The One Clinic',
  },
];

export default function V3Hero() {
  return (
    <section
      className={`${styles.hero} v3-onDark`}
      data-section-theme="dark"
      aria-labelledby="v3-hero-title"
    >
      <div className="v3-shell">
        <div className={styles.grid}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Medical &amp; Aesthetic Care, Leicester</p>

            <h1 id="v3-hero-title" className={styles.headline}>
              Where Expertise Meets Care
            </h1>

            <p className={styles.tagline}>Empowering Happy Patients</p>

            <p className={styles.subtext}>
              Advanced medical, aesthetic and wellness care, all under one roof.
            </p>

            <div className={styles.actions}>
              <BookConsultationButton className="v3-btn v3-btnSolid">
                Book a Consultation
              </BookConsultationButton>
            </div>
          </div>

          <ul className={styles.plates}>
            {PLATES.map((plate, i) => (
              <li key={plate.src} className={styles.plate}>
                {/*
                  Both sit above the fold, so both load eagerly; only the
                  first is prioritised, as the likelier LCP candidate.
                  Next 16 deprecates `priority` in favour of this pair.
                */}
                <Image
                  src={plate.src}
                  alt={plate.alt}
                  fill
                  loading="eager"
                  fetchPriority={i === 0 ? 'high' : undefined}
                  quality={75}
                  sizes="(max-width: 1023px) 46vw, 24vw"
                  className="v3-plate"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
