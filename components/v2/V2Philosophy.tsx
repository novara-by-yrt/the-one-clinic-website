import Image from 'next/image';
import styles from './V2Philosophy.module.css';

/**
 * One full-bleed plate with a solid panel set into it. The panel sits on
 * the paper ground rather than on the photograph, so the copy never
 * depends on what happens to be behind it at a given width.
 *
 * Condensed from the two long pillar paragraphs on the live homepage.
 */
export default function V2Philosophy() {
  return (
    <section
      className={styles.section}
      data-section-theme="light"
      aria-labelledby="v2-philosophy-title"
    >
      <div className={styles.bleed}>
        <Image
          src="/images/Team Image.jpg"
          alt="The clinical team at The One Clinic in Leicester"
          fill
          loading="lazy"
          quality={75}
          sizes="100vw"
          className="v2-plate"
        />
      </div>

      <div className="v2-shell">
        <div className={styles.panel}>
          <h2 id="v2-philosophy-title" className={styles.heading}>
            Built around the patient in front of us.
          </h2>

          <div className={styles.columns}>
            <p className={styles.body}>
              An honest, open approach to aesthetic medicine, with the goal of
              helping you become the version of yourself you are happy with.
            </p>
            <p className={styles.body}>
              Modern medical equipment in a calm, private setting. Every visit
              is planned around what you came in for.
            </p>
          </div>

          <p className={styles.figure}>
            <span className={styles.figureValue}>2,000+</span>
            <span className={styles.figureLabel}>patients treated</span>
          </p>
        </div>
      </div>
    </section>
  );
}
