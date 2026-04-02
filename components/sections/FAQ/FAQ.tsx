'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Accordion from '@/components/ui/Accordion';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import styles from './FAQ.module.css';

const QUESTIONS = [
  {
    question: 'What treatments do you offer?',
    answer:
      'We offer a wide range of services including medical aesthetics (laser treatments, skin resurfacing, anti-ageing), GP and health screenings, weight management programmes, mental health support, and minor surgical procedures such as mole and cyst removal.',
  },
  {
    question: 'Do I need a consultation before treatment?',
    answer:
      'Yes. Every patient begins with a consultation. This allows our doctors to understand your medical history, assess your suitability, and recommend the safest and most effective treatment for your specific needs.',
  },
  {
    question: 'Are treatments safe?',
    answer:
      'All treatments are carried out by qualified, experienced doctors in a regulated clinical setting. We use only evidence-based techniques and clinically approved products. Your safety and wellbeing come first at every stage.',
  },
  {
    question: 'How long is recovery?',
    answer:
      'Recovery depends on the treatment. Many procedures — including most aesthetic treatments — have little to no downtime. More clinical procedures may require a short recovery period. Your doctor will explain exactly what to expect before you commit to anything.',
  },
  {
    question: 'Do you offer personalised treatment plans?',
    answer:
      'Absolutely. We don\'t use off-the-shelf solutions. Every plan is built around your individual health, goals, and circumstances — whether that\'s a single treatment or an ongoing care programme.',
  },
  {
    question: 'How do I book an appointment?',
    answer:
      'You can book a consultation using the form on this page, or contact us directly by phone or email. A member of our team will confirm your appointment and answer any questions before your visit.',
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
