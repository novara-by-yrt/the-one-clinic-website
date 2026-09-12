import { CLINIC_INFO } from '@/lib/clinic-info';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import styles from './V2Close.module.css';

/**
 * The single inverted block on the page.
 *
 * The rest of V2 holds one paper ground throughout; this is the one
 * deliberate switch, placed at the end so it closes the page rather
 * than interrupting it. `v2-onInk` rebinds the button and link tokens
 * for the dark ground, so nothing above needs to know it exists.
 */
export default function V2Close() {
  return (
    <section
      className={`${styles.section} v2-onInk`}
      data-section-theme="dark"
      aria-labelledby="v2-close-title"
    >
      <div className="v2-shell">
        <div className={styles.inner}>
          <h2 id="v2-close-title" className={styles.heading}>
            Ready when you are.
          </h2>

          <p className={styles.body}>
            Book a consultation and we will talk through the options with you,
            with no obligation to go ahead.
          </p>

          <div className={styles.actions}>
            <BookConsultationButton className="v2-btn v2-btnPrimary">
              Book a consultation
            </BookConsultationButton>
            <a
              href={`tel:${CLINIC_INFO.phone.tel}`}
              className="v2-btn v2-btnSecondary"
            >
              Call {CLINIC_INFO.phone.display}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
