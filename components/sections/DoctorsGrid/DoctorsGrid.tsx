'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './DoctorsGrid.module.css';

type Doctor = {
  name: string;
  credentials: string;
  initials: string;
  image?: string;
};

const DOCTORS: Doctor[] = [
  {
    name: 'Dr Sumit Virmani',
    credentials: 'MBBS, MRCGP',
    initials: 'SV',
    image: '/images/imgi_20_team-thumb-VIRMANI.jpg',
  },
  {
    name: 'Dr Gunjan Bedi',
    credentials: 'MBBS, MRCpsych, MRCGP, BCAM',
    initials: 'GB',
    image: '/images/imgi_21_team-thumb-BEDI.jpg',
  },
  {
    name: 'Dr Mahesh Kodivalasa',
    credentials: '',
    initials: 'MK',
  },
  {
    name: 'Dr Hari Subramaniam',
    credentials: 'MSc, MD, DPM, DNB, FRCPsych',
    initials: 'HS',
  },
  {
    name: 'Dr Amol Vaze',
    credentials: '',
    initials: 'AV',
  },
  {
    name: 'Dr Ralph Mitchell',
    credentials: '',
    initials: 'RM',
  },
];

export default function DoctorsGrid() {
  return (
    <Section variant="light" data-section-theme="light">
      <Container>
        {/* Header */}
        <motion.div
          className={styles.header}
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.p className={styles.eyebrow} variants={fadeUp}>
            Our Doctors
          </motion.p>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            Meet the Medical Team
          </motion.h2>
          <motion.p className={styles.subtext} variants={fadeUp}>
            Every doctor at The One Clinic is fully qualified, GMC-registered, and
            dedicated to delivering the highest standard of care.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className={styles.grid}
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          role="list"
        >
          {DOCTORS.map((doc) => (
            <motion.article
              key={doc.name}
              className={styles.card}
              variants={fadeUp}
              role="listitem"
            >
              {/* Photo / initials */}
              <div className={styles.photoWrap}>
                {doc.image ? (
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    className={styles.photo}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className={styles.initialsWrap} aria-hidden="true">
                    <span className={styles.initials}>{doc.initials}</span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className={styles.body}>
                <div className={styles.meta}>
                  <h3 className={styles.name}>{doc.name}</h3>
                  {doc.credentials && (
                    <p className={styles.credentials}>{doc.credentials}</p>
                  )}
                </div>
                <Link href="#lead-form" className={styles.cta}>
                  Book Consultation
                  <span className={styles.ctaArrow} aria-hidden="true">→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
