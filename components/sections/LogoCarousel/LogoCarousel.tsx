'use client';

import Image from 'next/image';
import Section from '@/components/ui/Section';
import styles from './LogoCarousel.module.css';

const LOGOS = [
  { src: '/images/imgi_34_Hydra.png',                                  alt: 'Hydra',                              w: 400,  h: 160 },
  { src: '/images/imgi_39_cqc-logo.png',                               alt: 'Care Quality Commission',           w: 300,  h: 150 },
  { src: '/images/imgi_78_endolift-768x474.webp',                      alt: 'Endolift',                          w: 768,  h: 474 },
  { src: '/images/imgi_35_Untitled-3-5-e1749493207346.png',            alt: 'Aesthetics Awards Highly Commended', w: 400,  h: 280 },
  { src: '/images/imgi_86_AM_Awards_2025-black_FINALIST-1024x704.png', alt: 'AM Awards 2025 Finalist',           w: 1024, h: 704 },
  { src: '/images/imgi_96_Logo-InMode2-1536x630.png',                  alt: 'InMode',                            w: 1536, h: 630 },
];

// 6 copies , half the track (3 sets) is always wider than any standard screen
const TRACK_COPIES = 6;
const TRACK_LOGOS = Array.from({ length: TRACK_COPIES }, () => LOGOS).flat();

export default function LogoCarousel() {
  return (
    <Section variant="light" data-section-theme="light" className={styles.section}>
      <div className={styles.labelRow} aria-label="Accreditations and partners">
        <span className={styles.labelLine} aria-hidden="true" />
        <span className={styles.labelText}>Recognised &amp; Certified</span>
        <span className={styles.labelLine} aria-hidden="true" />
      </div>

      <div className={styles.viewport}>
        <div
          className={styles.track}
          aria-label="Accreditations and partner logos"
        >
          {TRACK_LOGOS.map((logo, i) => (
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
                className={styles.logoImg}
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
