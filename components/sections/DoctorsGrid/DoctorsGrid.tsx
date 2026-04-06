'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import { TEAM_MEMBERS } from '@/data/team';
import styles from './DoctorsGrid.module.css';

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
          {TEAM_MEMBERS.map((member) => (
            <motion.article
              key={member.slug}
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
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
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
                <Link href={`/our-team/${member.slug}`} className={styles.cta}>
                  Read More
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
