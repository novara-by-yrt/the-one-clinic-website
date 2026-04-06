'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './DoctorsGrid.module.css';

type Member = {
  name: string;
  credentials: string;
  initials: string;
  image?: string;
};

const MEMBERS: Member[] = [
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
  {
    name: 'Mr Thangasamy Sankar',
    credentials: 'FRCS — Plastic Surgery & Laser',
    initials: 'TS',
  },
  {
    name: 'Nurse Sanj',
    credentials: 'Clinical Nurse',
    initials: 'NS',
  },
  {
    name: 'Sam',
    credentials: 'Patient Coordinator',
    initials: 'S',
  },
  {
    name: 'Chloe',
    credentials: 'Patient Care Team',
    initials: 'C',
  },
  {
    name: 'Hollie',
    credentials: 'Patient Care Team',
    initials: 'H',
  },
  {
    name: 'Charley',
    credentials: 'Patient Care Team',
    initials: 'CH',
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
            The One Clinic
          </motion.p>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            Meet the Team
          </motion.h2>
          <motion.p className={styles.subtext} variants={fadeUp}>
            Every member of our team is dedicated to delivering exceptional,
            personalised care in a safe and welcoming environment.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className={styles.grid}
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          role="list"
        >
          {MEMBERS.map((member) => (
            <motion.article
              key={member.name}
              className={styles.card}
              variants={fadeUp}
              role="listitem"
            >
              {/* Photo / initials */}
              <div className={styles.photoWrap}>
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className={styles.photo}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className={styles.initialsWrap} aria-hidden="true">
                    <span className={styles.initials}>{member.initials}</span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className={styles.body}>
                <div className={styles.meta}>
                  <h3 className={styles.name}>{member.name}</h3>
                  {member.credentials && (
                    <p className={styles.credentials}>{member.credentials}</p>
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
