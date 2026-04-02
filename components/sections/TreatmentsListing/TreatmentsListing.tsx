'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Treatment } from '@/data/treatments';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './TreatmentsListing.module.css';

interface Props {
  treatments: Treatment[];
}

export default function TreatmentsListing({ treatments }: Props) {
  return (
    <>
      {/* ── Page hero ──────────────────────────────────────────── */}
      <section className={styles.hero} data-section-theme="dark">
        <div className={styles.heroGrid} aria-hidden="true" />
        <Container>
          <motion.div
            className={styles.heroContent}
            variants={stagger(0.18)}
            initial="hidden"
            animate="show"
          >
            <motion.p className={styles.eyebrow} variants={fadeUp}>
              The One Clinic
            </motion.p>
            <motion.h1 className={styles.heroTitle} variants={fadeUp}>
              Our Treatments
            </motion.h1>
            <motion.p className={styles.heroDesc} variants={fadeUp}>
              A comprehensive range of clinician-led aesthetic and wellness
              treatments, each tailored to your goals.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* ── Treatment grid ─────────────────────────────────────── */}
      <section className={styles.grid} data-section-theme="light">
        <Container>
          <motion.ul
            className={styles.cards}
            role="list"
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {treatments.map((t) => (
              <motion.li key={t.slug} variants={fadeUp}>
                <Link
                  href={`/treatments/${t.slug}`}
                  className={styles.cardLink}
                  aria-label={`Learn more about ${t.title}`}
                >
                  <Card theme="light" hover className={styles.card}>
                    <span className={styles.cardCategory}>{t.category}</span>
                    <h2 className={styles.cardTitle}>{t.title}</h2>
                    <p className={styles.cardDesc}>{t.shortDescription}</p>
                    <span className={styles.cardCta} aria-hidden="true">
                      Learn More →
                    </span>
                  </Card>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </Container>
      </section>
    </>
  );
}
