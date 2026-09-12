import Image from 'next/image';
import styles from './V3Philosophy.module.css';

/**
 * The two philosophy pillars as alternating image and text spreads.
 *
 * All copy is the live homepage's PILLARS array and section header,
 * unaltered. The live page hides these two bodies behind hover states
 * on a layered media canvas; here each gets its own spread so both are
 * readable without interaction.
 */
const PILLARS = [
  {
    tag: 'Our Mission',
    heading: 'A Fresh Perspective on Aesthetics & Well-being',
    body: 'We bring an honest, open approach to aesthetic medicine and health in Leicester, working closely with every patient to help them achieve their goals. Our mission is to empower you to become the version of yourself you are truly happy with.',
    src: '/images/Doctor2.jpg',
    alt: 'A clinician treating a patient at The One Clinic',
  },
  {
    tag: 'Our Clinic',
    heading: 'A Space Built Entirely Around You',
    body: 'Step into our state-of-the-art clinic and discover modern medical equipment within a relaxing, luxurious setting. Every visit is a bespoke experience centred on your needs, delivering innovative treatments using the most advanced techniques available.',
    src: '/images/Team Image.jpg',
    alt: 'The team at The One Clinic in Leicester',
  },
];

export default function V3Philosophy() {
  return (
    <section
      className={styles.section}
      data-section-theme="light"
      aria-labelledby="v3-philosophy-title"
    >
      <div className="v3-shell">
        <header className={`${styles.head} v3-narrow`}>
          <span className="v3-label">About Us</span>
          <h2 id="v3-philosophy-title" className="v3-h2">
            Our Philosophy
          </h2>
          <p className="v3-lead">
            One Clinic Leicester, where a fresh approach to aesthetics meets
            genuine, lasting care for every patient.
          </p>
        </header>

        <div className={styles.spreads}>
          {PILLARS.map((p, i) => (
            <article
              key={p.tag}
              className={`${styles.spread} ${i % 2 === 1 ? styles.reversed : ''}`}
            >
              <div className={styles.media}>
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  loading="lazy"
                  quality={75}
                  sizes="(max-width: 899px) 100vw, 50vw"
                  className="v3-plate"
                />
              </div>

              <div className={styles.text}>
                <span className="v3-label">{p.tag}</span>
                <h3 className={styles.pillarHeading}>{p.heading}</h3>
                <p className={styles.pillarBody}>{p.body}</p>
              </div>
            </article>
          ))}
        </div>

        <p className={styles.stat}>
          <span className={styles.statValue}>2000+</span>
          <span className={styles.statLabel}>Patients Treated</span>
        </p>
      </div>
    </section>
  );
}
