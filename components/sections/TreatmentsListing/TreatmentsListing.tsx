'use client';

import { m } from 'framer-motion';
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
  // Group treatments by category, preserving insertion order
  const grouped = treatments.reduce<Record<string, Treatment[]>>((acc, t) => {
    if (!acc[t.category]) acc[t.category] = [];
    acc[t.category].push(t);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  return (
    <>
      {/* ── Page hero ──────────────────────────────────────────── */}
      <section className={styles.hero} data-section-theme="dark">
        <div className={styles.heroGrid} aria-hidden="true" />
        <Container>
          <m.div
            className={styles.heroContent}
            variants={stagger(0.18)}
            initial="hidden"
            animate="show"
          >
            <m.p className={styles.eyebrow} variants={fadeUp}>
              The One Clinic
            </m.p>
            <m.h1 className={styles.heroTitle} variants={fadeUp}>
              Our Treatments
            </m.h1>
            <m.p className={styles.heroDesc} variants={fadeUp}>
              A comprehensive range of clinician-led aesthetic and wellness
              treatments, each tailored to your goals.
            </m.p>
          </m.div>
        </Container>
      </section>

      {/* ── Treatment groups ───────────────────────────────────── */}
      <div data-section-theme="light">
        {categories.map((category, ci) => (
          <section
            key={category}
            className={`${styles.group} ${ci % 2 === 1 ? styles.groupAlt : ''}`}
          >
            <Container>
              <m.div
                className={styles.groupHeader}
                variants={stagger(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
              >
                <m.h2 className={styles.groupTitle} variants={fadeUp}>
                  {category}
                </m.h2>
                <m.div className={styles.groupRule} variants={fadeUp} aria-hidden="true" />
              </m.div>

              <m.ul
                className={styles.cards}
                role="list"
                variants={stagger(0.07)}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
              >
                {grouped[category].map((t) => (
                  <m.li key={t.slug} variants={fadeUp}>
                    <Link
                      href={`/treatments/${t.slug}`}
                      className={styles.cardLink}
                      aria-label={`Learn more about ${t.title}`}
                    >
                      <Card theme="light" hover className={styles.card}>
                        <h3 className={styles.cardTitle}>{t.title}</h3>
                        <p className={styles.cardDesc}>{t.shortDescription}</p>
                        <span className={styles.cardCta} aria-hidden="true">
                          Learn More →
                        </span>
                      </Card>
                    </Link>
                  </m.li>
                ))}
              </m.ul>
            </Container>
          </section>
        ))}
      </div>
    </>
  );
}
