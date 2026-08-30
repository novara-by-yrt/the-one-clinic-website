'use client';

import type { ReactNode } from 'react';
import { m } from 'framer-motion';
import styles from './V1Heading.module.css';

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, margin: '-80px 0px' };

/**
 * Section header shared by every v1 section. Rises out of the page with a
 * slight rotateX so it reads as part of the same 3D space as the cards
 * beneath it, rather than as flat text pasted on top.
 */
const RISE = {
  hidden: { opacity: 0, y: 30, rotateX: -12, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' },
};

export default function V1Heading({
  chip,
  title,
  accent,
  sub,
  align = 'center',
  rule = true,
  id,
}: {
  chip?: string;
  title: ReactNode;
  accent?: string;
  sub?: string;
  align?: 'center' | 'left';
  rule?: boolean;
  id?: string;
}) {
  return (
    <m.div
      className={`${styles.header} ${align === 'left' ? styles.left : ''}`}
      initial="hidden"
      whileInView="show"
      viewport={VIEW}
      transition={{ staggerChildren: 0.11 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {chip && (
        <m.div variants={RISE} transition={{ duration: 0.7, ease: EASE }}>
          <span className={styles.chip}>
            <span className={styles.chipDot} aria-hidden="true" />
            {chip}
          </span>
        </m.div>
      )}

      <m.h2
        id={id}
        className={styles.heading}
        variants={RISE}
        transition={{ duration: 0.95, ease: EASE }}
      >
        {title}
        {accent && (
          <>
            {' '}
            <em className={styles.accent}>{accent}</em>
          </>
        )}
      </m.h2>

      {rule && (
        <m.div
          className={styles.rule}
          variants={RISE}
          transition={{ duration: 0.7, ease: EASE }}
          aria-hidden="true"
        />
      )}

      {sub && (
        <m.p
          className={styles.sub}
          variants={RISE}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {sub}
        </m.p>
      )}
    </m.div>
  );
}
