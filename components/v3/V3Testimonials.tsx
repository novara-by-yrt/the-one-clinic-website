import { REVIEWS, PATIENT_VIDEOS } from './v3-content';
import WistiaFacade from '@/components/ui/WistiaFacade';
import styles from './V3Testimonials.module.css';

/**
 * The review wall.
 *
 * The data in v3-content.ts was copied out of the live Testimonials
 * component character for character, so the fifteen reviews are
 * identical to what the homepage renders. It could not be imported from
 * there directly: that file is a Client Component, and a Server
 * Component importing one of its consts gets a client reference back
 * rather than the array.
 *
 * The live page paginates three at a time behind arrows and clamps each
 * review to four lines with a "Read more" toggle. Here every review is
 * shown in full, in a column wall, which is the honest way to present
 * copy that must not be shortened.
 */
export default function V3Testimonials() {
  return (
    <section
      className={styles.section}
      data-section-theme="light"
      aria-labelledby="v3-testimonials-title"
    >
      <div className="v3-shell">
        <header className={`${styles.head} v3-narrow`}>
          <span className="v3-label">Loved by Thousands</span>
          <h2 id="v3-testimonials-title" className="v3-h2">
            What Our Customers Say
          </h2>
          <p className="v3-lead">
            Don&apos;t just take our word for it. Here&apos;s what real patients have
            to say about their experience at The One Clinic.
          </p>
        </header>

        <div className={styles.wall}>
          {REVIEWS.map((r) => (
            <figure key={r.name} className={styles.card}>
              <blockquote className={styles.quote}>
                {/* Two reviews in the source carry paragraph breaks; they
                    are preserved rather than flattened. */}
                {r.review.split('\n\n').map((para, i) => (
                  <p key={i} className={styles.para}>
                    {para}
                  </p>
                ))}
              </blockquote>
              <figcaption className={styles.attribution}>
                <span className={styles.name}>{r.name}</span>
                <span className={styles.when}>{r.timeAgo}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className={styles.videos}>
          {PATIENT_VIDEOS.map((v) => (
            <div key={v.id} className={styles.video}>
              <WistiaFacade
                videoId={v.id}
                title={v.title}
                iframeClassName={styles.embed}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
