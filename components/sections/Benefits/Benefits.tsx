'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './Benefits.module.css';

const BENEFITS = [
  {
    number: '01',
    title: 'Expert-Led Care',
    description: 'Every service is led by experienced, qualified doctors — not aestheticians. Your safety is the priority.',
  },
  {
    number: '02',
    title: 'Everything Under One Roof',
    description: 'Medical care, aesthetics, and wellbeing in a single clinic. No referrals, no gaps, no compromise.',
  },
  {
    number: '03',
    title: 'Personalised Treatment Plans',
    description: 'Your consultation shapes everything. We build plans around your health, goals, and lifestyle.',
  },
  {
    number: '04',
    title: 'Advanced Technology',
    description: 'We use the latest clinical techniques and evidence-based treatments to deliver lasting results.',
  },
];

// Replace src with your clinic/team image when available
const CLINIC_IMAGE = '/images/benefits-clinic.jpg';
const HAS_IMAGE    = false; // set to true once image is uploaded

export default function Benefits() {
  return (
    <Section variant="light" data-section-theme="light">
      <Container>
        <div className={styles.layout}>

          {/* ── Left: header + benefit items ────────────────── */}
          <motion.div
            className={styles.textCol}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div className={styles.header} variants={fadeUp}>
              <p className={styles.eyebrow}>Why Us</p>
              <h2 className={styles.heading}>Why Choose The One Clinic</h2>
            </motion.div>

            <div className={styles.items}>
              {BENEFITS.map((b) => (
                <motion.div key={b.number} className={styles.item} variants={fadeUp}>
                  <div className={styles.itemTop}>
                    <span className={styles.number} aria-hidden="true">{b.number}</span>
                    <h3 className={styles.title}>{b.title}</h3>
                  </div>
                  <p className={styles.desc}>{b.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: clinic image ──────────────────────────── */}
          <motion.div
            className={styles.imageCol}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <div className={styles.imageWrap}>
              {HAS_IMAGE ? (
                <Image
                  src={CLINIC_IMAGE}
                  alt="The One Clinic — expert team and environment"
                  fill
                  className={styles.image}
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              ) : (
                /* Placeholder — replace with <Image> once image is uploaded */
                <div className={styles.imagePlaceholder} aria-hidden="true">
                  <span className={styles.imagePlaceholderText}>Clinic Image</span>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
}
