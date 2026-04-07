'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './Services.module.css';

const TREATMENTS = [
  {
    title: 'Anti-Wrinkle',
    category: 'Injections',
    href: '/treatments/anti-wrinkle',
    image: '/images/service-anti-wrinkle.jpg',
    bg: 'linear-gradient(160deg,#0d1117 0%,#1c2333 100%)',
  },
  {
    title: 'Dermal Fillers',
    category: 'Enhancement',
    href: '/treatments/dermal-fillers',
    image: '/images/service-dermal-fillers.jpg',
    bg: 'linear-gradient(160deg,#0d1714 0%,#162a24 100%)',
  },
  {
    title: 'Laser Hair Removal',
    category: 'Permanent Reduction',
    href: '/treatments/laser-resurfacing',
    image: '/images/service-laser-hair-removal.jpg',
    bg: 'linear-gradient(160deg,#100d17 0%,#1e1633 100%)',
  },
  {
    title: 'Morpheus8',
    category: 'Skin Remodeling',
    href: '/treatments/body-contouring',
    image: '/images/service-morpheus8.jpg',
    bg: 'linear-gradient(160deg,#17100d 0%,#2e1c16 100%)',
  },
  {
    title: 'Hydrafacial',
    category: 'Deep Cleanse',
    href: '/treatments/anti-wrinkle',
    image: '/images/service-hydrafacial.jpg',
    bg: 'linear-gradient(160deg,#0d1317 0%,#132030 100%)',
  },
  {
    title: 'Fat Freezing',
    category: 'Permanent Reduction',
    href: '/treatments/body-contouring',
    image: '/images/service-fat-freezing.jpg',
    bg: 'linear-gradient(160deg,#0d1117 0%,#131c2a 100%)',
  },
];

export default function Services() {
  return (
    <Section id="treatments" variant="light" data-section-theme="light">
      <Container>
        {/* ── Header ─────────────────────────────────────────── */}
        <motion.div
          className={styles.header}
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.p className={styles.eyebrow} variants={fadeUp}>
            Our Treatments
          </motion.p>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            Popular Treatments
          </motion.h2>
          <motion.div className={styles.headingLine} variants={fadeUp} aria-hidden="true" />
        </motion.div>

        {/* ── 3 × 2 grid ─────────────────────────────────────── */}
        <motion.div
          className={styles.grid}
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {TREATMENTS.map((t) => (
            <motion.div key={t.title} className={styles.card} variants={fadeUp}>
              {/* Background: gradient fallback + image on top */}
              <div className={styles.cardBg} style={{ background: t.bg }} aria-hidden="true" />
              <div className={styles.cardImg} aria-hidden="true">
                <Image
                  src={t.image}
                  alt={t.title}
                  fill
                  className={styles.img}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              {/* Dark overlay — stronger at bottom */}
              <div className={styles.overlay} aria-hidden="true" />

              {/* Text content */}
              <Link href={t.href} className={styles.cardContent}>
                <p className={styles.cardCategory}>{t.category}</p>
                <h3 className={styles.cardTitle}>{t.title}</h3>
                <div className={styles.exploreRow}>
                  <span className={styles.exploreLine} aria-hidden="true" />
                  <span className={styles.exploreLabel}>Explore</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
