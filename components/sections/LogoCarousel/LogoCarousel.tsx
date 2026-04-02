'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import styles from './LogoCarousel.module.css';

const LOGOS = [
  { src: '/images/imgi_34_Hydra.png',                               alt: 'Hydra',                  w: 400,  h: 160 },
  { src: '/images/imgi_35_Untitled-3-5-e1749493207346.png',         alt: 'The One Clinic',          w: 400,  h: 280 },
  { src: '/images/imgi_39_cqc-logo.png',                            alt: 'Care Quality Commission', w: 300,  h: 150 },
  { src: '/images/imgi_78_endolift-768x474.webp',                   alt: 'Endolift',                w: 768,  h: 474 },
  { src: '/images/imgi_86_AM_Awards_2025-black_FINALIST-1024x704.png', alt: 'AM Awards 2025 Finalist', w: 1024, h: 704 },
  { src: '/images/imgi_96_Logo-InMode2-1536x630.png',               alt: 'InMode',                  w: 1536, h: 630 },
];

// Speed in px per frame at 60fps (~36px/s — comfortable reading pace)
const SPEED = 0.6;

export default function LogoCarousel() {
  const trackRef       = useRef<HTMLDivElement>(null);
  const posRef         = useRef(0);
  const rafRef         = useRef<number>(0);
  const draggingRef    = useRef(false);
  const touchStartX    = useRef(0);
  const touchStartPos  = useRef(0);

  useEffect(() => {
    function tick() {
      const track = trackRef.current;
      if (track && !draggingRef.current) {
        posRef.current -= SPEED;

        // Seamless wrap: reset after scrolling one full set of logos
        const halfWidth = track.scrollWidth / 2;
        if (posRef.current <= -halfWidth) posRef.current += halfWidth;

        track.style.transform = `translateX(${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  function onTouchStart(e: React.TouchEvent) {
    draggingRef.current = true;
    touchStartX.current   = e.touches[0].clientX;
    touchStartPos.current = posRef.current;
  }

  function onTouchMove(e: React.TouchEvent) {
    if (!draggingRef.current || !trackRef.current) return;
    const delta     = e.touches[0].clientX - touchStartX.current;
    const halfWidth = trackRef.current.scrollWidth / 2;
    let next        = touchStartPos.current + delta;

    // Wrap in both directions so the loop stays seamless
    while (next <= -halfWidth) next += halfWidth;
    while (next > 0)           next -= halfWidth;

    posRef.current = next;
    trackRef.current.style.transform = `translateX(${next}px)`;
  }

  function onTouchEnd() {
    draggingRef.current = false;
  }

  return (
    <Section variant="light" data-section-theme="light" className={styles.section}>
      <p className={styles.label}>Accreditations &amp; Partners</p>

      {/* Fade masks on the edges */}
      <div className={styles.viewport}>
        <div
          ref={trackRef}
          className={styles.track}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          aria-label="Accreditations and partner logos"
        >
          {/* Render twice — second set is aria-hidden for screen readers */}
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div
              key={i}
              className={styles.logoWrap}
              aria-hidden={i >= LOGOS.length ? true : undefined}
            >
              <Image
                src={logo.src}
                alt={i < LOGOS.length ? logo.alt : ''}
                width={logo.w}
                height={logo.h}
                draggable={false}
                style={{ height: '72px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
