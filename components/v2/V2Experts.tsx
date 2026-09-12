import Image from 'next/image';
import Link from 'next/link';
import { TEAM_MEMBERS } from '@/data/team';
import styles from './V2Experts.module.css';

/**
 * The full clinical team as a horizontally scrolling strip.
 *
 * Sixteen people is too many for a grid and too many for the live
 * homepage's auto-advancing carousel, which shows one at a time and
 * moves on its own. A scroll-snap rail shows several at once, is driven
 * entirely by the reader, and needs no JavaScript at all.
 */
const MEMBERS = TEAM_MEMBERS.filter((m) => m.image);

export default function V2Experts() {
  return (
    <section
      className={styles.section}
      data-section-theme="light"
      aria-labelledby="v2-experts-title"
    >
      <div className="v2-shell">
        <header className="v2-sectionHead">
          <h2 id="v2-experts-title" className="v2-h2">
            The clinicians
          </h2>
          <p className="v2-lead">
            Consultants, GPs and nurses bringing NHS and private practice to
            every appointment.
          </p>
        </header>
      </div>

      <ul
        className={styles.rail}
        aria-label={`${MEMBERS.length} clinicians at The One Clinic`}
      >
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
                  sizes="(max-width: 700px) 62vw, (max-width: 1024px) 34vw, 22vw"
                  className="v2-plate"
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

      <div className="v2-shell">
        <div className={styles.footer}>
          <Link href="/our-team" className="v2-link">
            Meet the full team
          </Link>
        </div>
      </div>
    </section>
  );
}
