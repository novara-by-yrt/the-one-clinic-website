'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { m } from 'framer-motion';
import { PILLARS, SLIDES } from '@/components/brand/BrandProcess';
import V1Heading from './V1Heading';
import { useTilt } from './useTilt';
import styles from './V1Philosophy.module.css';

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, margin: '-70px 0px' };
const INTERVAL = 5000;

export default function V1Philosophy() {
  const [slide, setSlide] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const canvas = useTilt<HTMLDivElement>({ max: 6, lift: 0 });

  useEffect(() => {
    const t = setInterval(() => setSlide((i) => (i + 1) % SLIDES.length), INTERVAL);
    return () => clearInterval(t);
  }, []);

  // Hovering a pillar pins the stack to a matching frame, so the two
  // columns feel wired together rather than animating independently.
  const active = hovered !== null ? hovered % SLIDES.length : slide;
  const behind = (active + 1) % SLIDES.length;

  return (
    <div className={styles.layout}>
      {/* ── Layered media stack ── */}
      <m.div
        className={styles.media}
        initial={{ opacity: 0, x: -44, rotateY: 10 }}
        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
        viewport={VIEW}
        transition={{ duration: 1, ease: EASE }}
      >
        <div className={styles.halo} aria-hidden="true" />
        <div ref={canvas.ref} className={styles.canvas} {...canvas.tiltProps}>
          <div className={`${styles.plate} ${styles.plateMain}`}>
            {SLIDES.map((s, i) => (
              <div key={s.src} className={`${styles.slide} ${i === active ? styles.slideOn : ''}`}>
                <Image
                  src={s.src}
                  alt={i === active ? s.alt : ''}
                  aria-hidden={i !== active}
                  fill
                  className={styles.img}
                  sizes="(max-width: 560px) 100vw, (max-width: 980px) 460px, 520px"
                />
              </div>
            ))}
          </div>

          <div className={`${styles.plate} ${styles.plateSub}`} aria-hidden="true">
            {SLIDES.map((s, i) => (
              <div key={s.src} className={`${styles.slide} ${i === behind ? styles.slideOn : ''}`}>
                <Image src={s.src} alt="" fill className={styles.img} sizes="240px" />
              </div>
            ))}
          </div>

          <div className={styles.stat}>
            <p className={styles.statNum}>2000+</p>
            <p className={styles.statLabel}>Patients Treated</p>
          </div>
        </div>
      </m.div>

      {/* ── Copy ── */}
      <div className={styles.textCol}>
        <V1Heading
          chip="About Us"
          title="Our"
          accent="Philosophy"
          sub="One Clinic Leicester, where a fresh approach to aesthetics meets genuine, lasting care for every patient."
          align="left"
        />

        <div className={styles.pillars}>
          {PILLARS.map((p, i) => (
            <m.article
              key={p.tag}
              className={styles.pillar}
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={VIEW}
              transition={{ duration: 0.8, delay: i * 0.13, ease: EASE }}
              whileHover={{ translateZ: 26, rotateY: -2 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className={styles.spine} aria-hidden="true" />
              <div className={styles.pillarBody}>
                <span className={styles.tag}>{p.tag}</span>
                <h3 className={styles.pillarHeading}>{p.heading}</h3>
                <p className={styles.pillarText}>{p.body}</p>
              </div>
            </m.article>
          ))}
        </div>
      </div>
    </div>
  );
}
