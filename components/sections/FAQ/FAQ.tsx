'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Accordion from '@/components/ui/Accordion';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './FAQ.module.css';

const QUESTIONS = [
  {
    question: 'Are the treatments safe?',
    answer:
      'All of our treatments are performed by qualified medical practitioners in a regulated clinical environment. We only use CE-marked and FDA-cleared devices and products. A thorough consultation and medical assessment is conducted before any treatment begins.',
  },
  {
    question: 'How do I know which treatment is right for me?',
    answer:
      'During your free consultation, one of our specialists will conduct a detailed facial or body assessment, listen to your concerns, and recommend a treatment plan tailored specifically to your anatomy and goals. We never take a one-size-fits-all approach.',
  },
  {
    question: 'Is there downtime after treatment?',
    answer:
      'Downtime varies by treatment. Many of our injectables and skin treatments have minimal downtime, with patients returning to daily activities the same day. More intensive procedures such as laser resurfacing may require 3–5 days of healing time. Your practitioner will advise you fully in advance.',
  },
  {
    question: 'How long do results last?',
    answer:
      'Results vary depending on the treatment, the patient\'s age, lifestyle, and metabolism. Anti-wrinkle injections typically last 3–4 months, while dermal fillers can last 12–18 months. We will discuss realistic expectations and maintenance timelines during your consultation.',
  },
  {
    question: 'What is your cancellation policy?',
    answer:
      'We ask for 48 hours\' notice for any cancellations or rescheduling. Late cancellations or no-shows may incur a fee. We appreciate your understanding as cancelled appointments limit our ability to offer those slots to other patients.',
  },
  {
    question: 'Do you offer payment plans?',
    answer:
      'Yes. We offer flexible finance options through our approved provider, allowing you to spread the cost of treatment over 6 to 24 months. Ask our team for details during your consultation.',
  },
];

export default function FAQ() {
  return (
    <Section variant="dark" data-section-theme="dark">
      <Container>
        <motion.div
          className={styles.header}
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.p className={styles.eyebrow} variants={fadeUp}>
            FAQ
          </motion.p>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            Frequently Asked Questions
          </motion.h2>
        </motion.div>

        <motion.div
          className={styles.body}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <Accordion items={QUESTIONS} theme="dark" />
        </motion.div>
      </Container>
    </Section>
  );
}
