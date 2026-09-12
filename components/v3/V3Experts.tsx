import Image from 'next/image';
import Link from 'next/link';
import { TEAM_MEMBERS } from '@/data/team';
import styles from './V3Experts.module.css';

/**
 * The clinical team as a card grid.
 *
 * Section copy and every name, role and credential are the live
 * homepage's, unaltered. The live page shows one member at a time in an
 * auto-advancing slideshow; a grid with one crop ratio shows the whole
 * team at once, which is what makes the depth of it legible.
 */
const MEMBERS = TEAM_MEMBERS.filter((m) => m.image);

export default function V3Experts() {
  return (
    <section
      className={styles.section}
      data-section-theme="light"
      aria-labelledby="v3-experts-title"
    >
      <div className="v3-shell">
        <header className={`${styles.head} v3-narrow`}>
          <span className="v3-label">Our Clinical Team</span>
          <h2 id="v3-experts-title" className="v3-h2">
            Meet the Experts
          </h2>
        </header>

        <ul className={styles.grid}>
          {MEMBERS.map((m) => {
            const href = m.profileUrl ?? `/our-team/${m.slug}`;
            const linked = !m.noProfilePage;

            const inner = (
              <>
                <span className={styles.plate}>
                  <Image
                    src={m.image as string}
                    alt={m.name}
                    fill
                    loading="lazy"
                    quality={90}
                    sizes="(max-width: 599px) 50vw, (max-width: 1023px) 33vw, 25vw"
                    className="v3-plate"
                  />
                </span>
                <span className={styles.meta}>
                  <span className={styles.name}>{m.name}</span>
                  <span className={styles.role}>{m.role}</span>
                  <span className={styles.credentials}>{m.credentials}</span>
                </span>
              </>
            );

            return (
              <li key={m.slug} className={styles.card}>
                {linked ? (
                  <Link href={href} className={styles.cardLink}>
                    {inner}
                  </Link>
                ) : (
                  <div className={styles.cardStatic}>{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
