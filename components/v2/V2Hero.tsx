import Image from 'next/image';
import Link from 'next/link';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import styles from './V2Hero.module.css';

/**
 * Asymmetric editorial hero: type holds the left columns, a single tall
 * plate bleeds off the right edge.
 *
 * Three text elements only (headline, subtext, CTAs). The review scores
 * and accreditations that the live hero stacks underneath its buttons
 * live in V2Trust instead, so this stays one moment.
 *
 * Ink ground, and `data-section-theme="dark"` to match. The shared site
 * header renders white-on-transparent until the reader scrolls, on every
 * route, so a paper hero would leave the navigation invisible against
 * it. Grounding the hero in ink keeps that chrome working untouched, and
 * bookends the page with the closing block: ink, then paper throughout,
 * then ink.
 */
export default function V2Hero() {
  return (
    <section
      className={`${styles.hero} v2-onInk`}
      data-section-theme="dark"
      aria-labelledby="v2-hero-title"
    >
      <div className={styles.grid}>
        <div className={styles.copy}>
          <h1 id="v2-hero-title" className={styles.headline}>
            Where expertise
            <br />
            meets care.
          </h1>

          <p className={styles.subtext}>
            Advanced medical, aesthetic and wellness treatments, led by doctors,
            all under one roof in Leicester.
          </p>

          <div className={styles.actions}>
            <BookConsultationButton className="v2-btn v2-btnPrimary">
              Book a consultation
            </BookConsultationButton>
            <Link href="/treatments" className="v2-btn v2-btnSecondary">
              Explore treatments
            </Link>
          </div>
        </div>

        <div className={styles.plate}>
          {/*
            The one image on the page that is not lazy: it is the LCP
            element, and deferring it would push LCP past its budget.
            Next 16 deprecates `priority`, and its docs steer to
            eager + fetchPriority over `preload` whenever `loading` is
            set, so this pair is the current API rather than the old one.
          */}
          <Image
            src="/images/Doctor1.jpg"
            alt="A clinician at The One Clinic treating a patient"
            fill
            loading="eager"
            fetchPriority="high"
            quality={75}
            sizes="(max-width: 900px) 100vw, 46vw"
            className="v2-plate"
          />
        </div>
      </div>
    </section>
  );
}
