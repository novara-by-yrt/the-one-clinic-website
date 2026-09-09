import WistiaFacade from '@/components/ui/WistiaFacade';
import styles from './V2Story.module.css';

/**
 * Two films, unequal. The live homepage runs them as a symmetrical pair;
 * giving the founder film the wider plate makes the section a
 * composition rather than a row.
 *
 * WistiaFacade is the project's existing lazy pattern for video: only a
 * poster renders until the visitor clicks, so none of the player
 * JavaScript is requested on load.
 */
const FILMS = [
  {
    id: 'hu75ttgmlm',
    title: 'TOC - Intro Video (LP)',
    caption: 'Our founders on why the clinic exists',
    wide: true,
  },
  {
    id: 't8y82cnp5e',
    title: 'TOC - Patient Stories',
    caption: 'Patients on what changed for them',
    wide: false,
  },
];

export default function V2Story() {
  return (
    <section
      className={styles.section}
      data-section-theme="light"
      aria-labelledby="v2-story-title"
    >
      <div className="v2-shell">
        <header className="v2-sectionHead">
          <h2 id="v2-story-title" className="v2-h2">
            In their words
          </h2>
          <p className="v2-lead">
            Two short films: one from the people who built the clinic, one from
            the people they have treated.
          </p>
        </header>

        <div className={styles.grid}>
          {FILMS.map((film) => (
            <figure
              key={film.id}
              className={`${styles.item} ${film.wide ? styles.wide : styles.narrow}`}
            >
              <div className={styles.player}>
                <WistiaFacade
                  videoId={film.id}
                  title={film.title}
                  iframeClassName={styles.embed}
                />
              </div>
              <figcaption className={styles.caption}>{film.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
