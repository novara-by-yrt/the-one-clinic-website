import Image from 'next/image';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import styles from './V3Hero.module.css';

/**
 * Full-bleed hero. The photograph establishes the room; the type sits in
 * its dark negative space behind a left-weighted scrim, so contrast is
 * guaranteed rather than dependent on where the image crops.
 *
 * Every string is the live homepage's, unaltered. The review scores that
 * the live hero stacks under its button move to V3Proof directly below,
 * which is where a credibility strip belongs and keeps the hero to one
 * message.
 */
export default function V3Hero() {
  return (
    <section
      className={`${styles.hero} v3-onDark`}
      data-section-theme="dark"
      aria-labelledby="v3-hero-title"
    >
      <div className={styles.media} aria-hidden="true">
        {/*
          The one eager image on the page: it is the LCP element.
          Next 16 deprecates `priority`, and its docs steer to
          eager + fetchPriority whenever `loading` is set.
        */}
        <Image
          src="/images/Updated Hero Background 2.png"
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
        <div className="v3-shell">
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
        </div>
      </div>
    </section>
  );
}
