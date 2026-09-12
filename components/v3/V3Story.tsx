import WistiaFacade from '@/components/ui/WistiaFacade';
import styles from './V3Story.module.css';

/**
 * Founder and patient films. Copy and video ids are the live
 * homepage's, unaltered.
 *
 * WistiaFacade is the project's existing lazy pattern for video: only a
 * poster renders until the visitor clicks, so no player JavaScript is
 * requested on load.
 */
const VIDEOS = [
  { id: 'hu75ttgmlm', title: 'TOC - Intro Video (LP)' },
  { id: 't8y82cnp5e', title: 'TOC - Patient Stories' },
];

export default function V3Story() {
  return (
    <section
      className={styles.section}
      data-section-theme="light"
      aria-labelledby="v3-story-title"
    >
      <div className="v3-shell">
        <header className={`${styles.head} v3-narrow`}>
          <span className="v3-label">See It For Yourself</span>
          <h2 id="v3-story-title" className="v3-h2">
            Our Story &amp; Real Patient Results
          </h2>
          <p className="v3-lead">
            Hear directly from our founder and the patients whose lives we&apos;ve
            helped transform.
          </p>
        </header>

        <div className={styles.grid}>
          {VIDEOS.map((video) => (
            <div key={video.id} className={styles.player}>
              <WistiaFacade
                videoId={video.id}
                title={video.title}
                iframeClassName={styles.embed}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
