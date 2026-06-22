'use client';

import Image from 'next/image';
import { m } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './TrustStrip.module.css';

const AWARDS = [
  {
    src: '/images/imgi_86_AM_Awards_2025-black_FINALIST-1024x704.png',
    alt: 'Aesthetic Medicine Awards 2025 Finalist',
    label: 'Aesthetic Medicine Awards',
    sublabel: 'Awards 2025 · Finalist',
    width: 1024,
    height: 704,
  },
  {
    src: '/images/imgi_35_Untitled-3-5-e1749493207346.png',
    alt: 'Aesthetics Awards Highly Commended 2025',
    label: 'Aesthetics Awards',
    sublabel: 'Highly Commended · 2025',
    width: 400,
    height: 280,
  },
];

export default function TrustStrip() {
  return (
    <Section variant="light" data-section-theme="light" className={styles.strip}>
      <Container>

        {/* ── Awards row ───────────────────────────────────── */}
        <m.div
          className={styles.awardsRow}
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <m.p className={styles.sectionEyebrow} variants={fadeUp}>
            Awards &amp; Recognition
          </m.p>

          <div className={styles.awardCards}>
            {AWARDS.map((award) => (
              <m.div key={award.src} className={styles.awardCard} variants={fadeUp}>
                <div className={styles.awardImgWrap}>
                  <Image
                    src={award.src}
                    alt={award.alt}
                    width={award.width}
                    height={award.height}
                    style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                  />
                </div>
              </m.div>
            ))}
          </div>
        </m.div>

      </Container>
    </Section>
  );
}
