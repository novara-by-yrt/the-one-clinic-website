'use client';

import Image from 'next/image';
import { LOGOS } from '@/components/sections/LogoCarousel/LogoCarousel';
import styles from './V1Logos.module.css';

// Doubled once: the keyframe translates by exactly -50%, so the second
// half lands where the first began and the loop is seamless.
const TRACK = [...LOGOS, ...LOGOS];

export default function V1Logos() {
  return (
    <>
      <div className={styles.label}>
        <span className={styles.labelLine} aria-hidden="true" />
        <span className={styles.labelText}>Recognised &amp; Certified</span>
        <span className={styles.labelLine} aria-hidden="true" />
      </div>

      <div className={styles.viewport}>
        <div className={styles.track} aria-label="Accreditations and partner logos">
          {TRACK.map((logo, i) => (
            <div
              key={i}
              className={styles.plate}
              aria-hidden={i >= LOGOS.length ? true : undefined}
            >
              <Image
                src={logo.src}
                alt={i < LOGOS.length ? logo.alt : ''}
                width={logo.w}
                height={logo.h}
                draggable={false}
                className={styles.img}
                sizes="180px"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
