'use client';

import Image from 'next/image';
import Link from 'next/link';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import type { TeamMember } from '@/data/team';
import styles from './TeamMemberProfile.module.css';

export default function TeamMemberProfile({ member }: { member: TeamMember }) {
  return (
    <>
      {/* ── Profile section ── */}
      <Section variant="light" data-section-theme="light" className={styles.section}>
        <Container>
          {/* Back link */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className={styles.backWrap}
          >
            <Link href="/our-team" className={styles.back}>
              <span aria-hidden="true">←</span> Our Team
            </Link>
          </motion.div>

          <div className={styles.layout}>
            {/* Left, photo */}
            <motion.div
              className={styles.photoCol}
              variants={fadeUp}
              initial="hidden"
              animate="show"
            >
              <div className={styles.photoWrap}>
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    priority
                    className={styles.photo}
                    sizes="(max-width: 900px) 100vw, 40vw"
                  />
                ) : (
                  <div className={styles.initialsWrap} aria-hidden="true">
                    <span className={styles.initials}>{member.initials}</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right, details */}
            <motion.div
              className={styles.detailCol}
              variants={stagger(0.1)}
              initial="hidden"
              animate="show"
            >
              <motion.div className={styles.nameBlock} variants={fadeUp}>
                <p className={styles.role}>{member.role}</p>
                <h1 className={styles.name}>{member.name}</h1>
                {member.credentials && (
                  <p className={styles.credentials}>{member.credentials}</p>
                )}
              </motion.div>

              <motion.div className={styles.bioBlock} variants={fadeUp}>
                {member.bio.map((para, i) => (
                  <p key={i} className={styles.bio}>{para}</p>
                ))}
              </motion.div>

              <motion.div className={styles.actions} variants={fadeUp}>
                <BookConsultationButton className={styles.btnPrimary}>
                  Book Consultation
                </BookConsultationButton>
                <Link href="/our-team" className={styles.btnSecondary}>
                  ← Back to Team
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ── Other team members ── */}
      <Section variant="light" data-section-theme="light" className={styles.othersSection}>
        <Container>
          <motion.div
            className={styles.othersHeader}
            variants={stagger()}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.h2 className={styles.othersHeading} variants={fadeUp}>
              Meet the Rest of the Team
            </motion.h2>
            <Link href="/our-team" className={styles.othersLink}>
              View all team members
              <span aria-hidden="true"> →</span>
            </Link>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
