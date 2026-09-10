import Image from 'next/image';
import { CLINIC_INFO } from '@/lib/clinic-info';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import styles from './V4Hero.module.css';

/**
 * Centred hero over a full-bleed background image.
 *
 * The rest of /v4 is the two-column spread template; this is the one
 * section that breaks it, so the page opens on a single wide moment
 * before settling into the magazine rhythm.
 *
 * The photograph is monochrome in the source file, which keeps the
 * page's black, white and grey palette intact, and it is composed with
 * the subject to one side. It is positioned so that subject sits clear
 * of the centred type at desktop, and a layered scrim underneath
 * guarantees the contrast rather than leaving it to the crop, which is
 * what changes as the viewport narrows and the subject moves behind the
 * text.
 *
 * Copy is the live homepage hero's, unaltered. Both button labels are
 * the homepage's own: the primary from the hero, the secondary from the
 * closing call to action.
 */
export default function V4Hero() {
  return (
    <section
      className={`${styles.hero} v4-onInk`}
      data-section-theme="dark"
      aria-labelledby="v4-hero-title"
    >
      <div className={styles.media} aria-hidden="true">
        {/* The page's LCP element, so it loads eagerly and is
            prioritised. Next 16 deprecates `priority` in favour of
            this pair. */}
        <Image
          src="/images/Hero Section Background Image 2.png"
          alt=""
          fill
          loading="eager"
          fetchPriority="high"
          quality={75}
          sizes="100vw"
          className={styles.image}
        />
        <div className={styles.scrim} />
      </div>

      <div className={styles.inner}>
        <p className={styles.eyebrow}>Medical &amp; Aesthetic Care, Leicester</p>

        <h1 id="v4-hero-title" className={styles.headline}>
          Where Expertise Meets Care
        </h1>

        <p className={styles.tagline}>Empowering Happy Patients</p>

        <p className={styles.subtext}>
          Advanced medical, aesthetic and wellness care, all under one roof.
        </p>

        <div className={styles.actions}>
          <BookConsultationButton className="v4-cta">
            Book a Consultation
          </BookConsultationButton>
          <a href={`tel:${CLINIC_INFO.phone.tel}`} className="v4-cta v4-ctaGhost">
            Call {CLINIC_INFO.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
