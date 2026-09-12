import styles from './V2Voices.module.css';

/**
 * Six patient quotes as a ruled wall.
 *
 * Every quote is a verbatim extract from a review already published on
 * the live homepage, cut to the opening sentences so each one fits in a
 * glance. Nothing is paraphrased or invented.
 */
const VOICES = [
  {
    quote:
      'Absolutely loved my HydraFacial triplet. Each session left my skin clearer, brighter, and deeply hydrated.',
    name: 'Daniela Angelova',
    context: 'HydraFacial',
  },
  {
    quote:
      'They really took their time to explain the different procedures and which option would be best.',
    name: 'Sumaiya Hamed',
    context: 'Treatment planning',
  },
  {
    quote:
      'I am only a week into my treatment and I can already see the results. My eyes look so much fresher and renewed.',
    name: 'Rachel',
    context: 'Cool laser',
  },
  {
    quote:
      'Everyone was really kind and helped to settle my anxiety. Super efficient service.',
    name: 'Fran',
    context: 'Aftercare',
  },
  {
    quote:
      'Excellent service throughout the process and great follow up care.',
    name: 'Paul',
    context: 'Aesthetic treatments',
  },
  {
    quote:
      'I was advised my options but ultimately I got to choose what I wanted.',
    name: 'Hannah Clauss',
    context: 'Consultation',
  },
];

export default function V2Voices() {
  return (
    <section
      className={styles.section}
      data-section-theme="light"
      aria-labelledby="v2-voices-title"
    >
      <div className="v2-shell">
        <header className="v2-sectionHead">
          <h2 id="v2-voices-title" className="v2-h2">
            What patients say
          </h2>
          <p className="v2-lead">
            Reviews left by people treated at our Leicester clinic.
          </p>
        </header>

        <ul className={styles.wall}>
          {VOICES.map((v) => (
            <li key={v.name} className={styles.item}>
              <figure className={styles.quoteBlock}>
                <blockquote className={styles.quote}>{v.quote}</blockquote>
                <figcaption className={styles.attribution}>
                  <span className={styles.name}>{v.name}</span>
                  <span className={styles.context}>{v.context}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
