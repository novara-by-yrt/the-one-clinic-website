'use client';

import Image from 'next/image';
import Link from 'next/link';
import { m } from 'framer-motion';
import { TEAM_MEMBERS } from '@/data/team';
import { useTilt } from './useTilt';
import styles from './V1Experts.module.css';

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, margin: '-60px 0px' };
const SHOWN = TEAM_MEMBERS.slice(0, 8);

type Member = (typeof TEAM_MEMBERS)[number];

function ExpertCard({ member, index }: { member: Member; index: number }) {
  const { ref, tiltProps } = useTilt<HTMLAnchorElement>({ max: 7, lift: 32 });
  // Mirrors how the live team pages resolve a member's link: an explicit
  // profileUrl wins, members without a profile page fall back to the index.
  const href = member.noProfilePage
    ? '/our-team'
    : member.profileUrl ?? `/our-team/${member.slug}`;

  return (
    <m.div
      className={styles.stage}
      initial={{ opacity: 0, y: 40, rotateX: -12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={VIEW}
      transition={{ duration: 0.75, delay: (index % 4) * 0.09, ease: EASE }}
    >
      <Link ref={ref} href={href} className={styles.card} {...tiltProps}>
        <div className={styles.portrait}>
          {member.image && (
            <Image
              src={member.image}
              alt=""
              fill
              className={styles.img}
              sizes="(max-width: 620px) 50vw, (max-width: 1000px) 33vw, 232px"
            />
          )}
          <div className={styles.scrim} aria-hidden="true" />
          <span className={styles.edge} aria-hidden="true" />
          <div className={styles.meta}>
            <h3 className={styles.name}>{member.name}</h3>
            <p className={styles.role}>{member.role}</p>
            <span className={styles.link}>
              View profile
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </m.div>
  );
}

export default function V1Experts() {
  return (
    <>
      <div className={styles.grid}>
        {SHOWN.map((m2, i) => (
          <ExpertCard key={m2.name} member={m2} index={i} />
        ))}
      </div>

      <div className={styles.more}>
        <Link href="/our-team" className={styles.moreBtn}>
          Meet the full team
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </>
  );
}
