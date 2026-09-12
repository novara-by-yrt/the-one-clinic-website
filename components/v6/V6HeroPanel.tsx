import Image from 'next/image';
import { CLINIC_INFO } from '@/lib/clinic-info';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import styles from './V6HeroPanel.module.css';

/**
 * The opening panel: centred copy over a full-bleed background image.
 *
 * This is the one panel that is not a two-column split. It is kept that
 * way deliberately, because it is the design agreed for the v6 opening
 * and a cover works differently from the spreads that follow it: a
 * magazine's cover is not one of its spreads.
 *
 * The photograph is monochrome in the source file, so the page's black,
 * white and grey palette is untouched, and it is composed with the
 * subject to one side. It is positioned so that subject sits clear of
 * the centred type, and a layered scrim underneath guarantees the
 * contrast rather than leaving it to the crop.
 *
 * Copy is the live homepage hero's, unaltered. Both button labels are
 * the homepage's own: the primary from the hero, the secondary from the
 * closing call to action.
 */
export default function V6HeroPanel({ id, section }: { id: string; section: number }) {
  return (
    <section
      id={id}
      className={`${styles.panel} v6-section v6-onInk`}
      aria-labelledby={`${id}-title`}
      style={{ '--i': section } as React.CSSProperties}
    >
      <span className="v6-themeMark" data-section-theme="dark" aria-hidden="true" />
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

        <h1 id={`${id}-title`} className={styles.headline}>
          Where Expertise Meets Care
        </h1>

        <p className={styles.tagline}>Empowering Happy Patients</p>

        <p className={styles.subtext}>
          Advanced medical, aesthetic and wellness care, all under one roof.
        </p>

        <div className={styles.actions}>
          <BookConsultationButton className="v6-cta">
            Book a Consultation
          </BookConsultationButton>
          <a href={`tel:${CLINIC_INFO.phone.tel}`} className="v6-cta v6-ctaGhost">
            Call {CLINIC_INFO.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
