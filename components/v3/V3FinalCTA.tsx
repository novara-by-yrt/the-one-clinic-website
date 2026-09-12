import { CLINIC_INFO } from '@/lib/clinic-info';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import styles from './V3FinalCTA.module.css';

/**
 * Closing band. Copy is the live FinalCTA's, unaltered, including
 * "Book Your Consultation" here against "Book a Consultation" in the
 * hero: both are the source's own wording.
 *
 * Ink ground, the one inversion below the hero, so the page closes on
 * the same weight it opened with.
 */
export default function V3FinalCTA() {
  return (
    <section
      className={`${styles.section} v3-onDark`}
      data-section-theme="dark"
      aria-labelledby="v3-cta-title"
    >
      <div className="v3-shell">
        <div className={styles.inner}>
          <span className="v3-label">Take the First Step</span>

          <h2 id="v3-cta-title" className={styles.heading}>
            Ready to Feel Your Best?
          </h2>

          <p className={styles.subtext}>
            Our team is here to help. Book your consultation today and take
            control of your health and confidence.
          </p>

          <div className={styles.actions}>
            <BookConsultationButton className="v3-btn v3-btnSolid">
              Book Your Consultation
            </BookConsultationButton>
            <a href={`tel:${CLINIC_INFO.phone.tel}`} className="v3-btn v3-btnOutline">
              Call {CLINIC_INFO.phone.display}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
