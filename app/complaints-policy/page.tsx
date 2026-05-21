import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import styles from '../terms-conditions/page.module.css';

export const metadata: Metadata = {
  title: 'Complaints Policy | The One Clinic Leicester',
  description: 'Read the complaints policy for The One Clinic. We value your feedback and aim to resolve any concerns quickly and fairly.',
};

export default function ComplaintsPolicyPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.hero} data-section-theme="dark" aria-label="Complaints Policy, hero">
        <div className={styles.heroGrid} aria-hidden="true" />
        <Container>
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>Legal</p>
            <h1 className={styles.heroTitle}>Complaints Policy</h1>
            <p className={styles.heroSubtitle}>
              Your Experience Matters to Us. We always aim to provide the highest standard of care. If you are unhappy with any aspect of your experience at The One Clinic, please let us know as soon as possible.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Content ── */}
      <div className={styles.body}>
        <Container>
          <article className={styles.content}>
            <section>
              <h2>How to Submit a Formal Complaint</h2>
              <p>
                You can submit a complaint verbally, by letter, by email, or through our website contact form.
              </p>
              <p>
                Please provide your name, contact details, and a brief summary of your complaint. Include relevant dates and names if possible. You may also ask someone to file a complaint on your behalf. If so, please ensure we have your written consent.
              </p>
              <p>
                Please send your complaint or feedback to:
              </p>
              <ul>
                <li><strong>Email:</strong> info@the-oneclinic.net</li>
                <li><strong>Phone:</strong> 07481342374</li>
                <li><strong>Post:</strong> The Clinic Manager, The One Clinic, 36 DeMontfort Street, Leicester, LE1 7GS</li>
              </ul>
            </section>

            <section>
              <h2>Information We Need From You</h2>
              <p>
                To help us review your case, please provide:
              </p>
              <ul>
                <li>Your full name and contact details.</li>
                <li>A clear summary of your complaint.</li>
                <li>Relevant dates and the names of the staff involved.</li>
                <li>What you hope to achieve as a resolution</li>
              </ul>
              <p>
                You may also ask someone to file a complaint on your behalf. If so, please ensure we have your written consent to proceed.
              </p>
            </section>

            <section>
              <h2>What Happens Next</h2>
              <ul>
                <li>We will acknowledge your complaint within 2 business days.</li>
                <li>Our Clinic Manager will review your case thoroughly.</li>
                <li>You will receive a written response within 10 business days. If we require more time, we will provide a clear update on our progress.</li>
              </ul>
            </section>

            <section>
              <h2>Complaint Response Timeframes</h2>
              <p>
                You will receive a full written response within ten business days. If we require more time to complete a thorough review, we will keep you updated on our progress. We always aim to resolve matters as swiftly as possible.
              </p>
            </section>

            <section>
              <h2>Confidentiality and Data Protection</h2>
              <p>
                We handle all complaints in strict confidence. A complaint will never affect your future care or treatments. Only staff directly involved with your case will see your data. We protect your privacy at all times.
              </p>
            </section>

            <section>
              <h2>Continuous Improvement Through Patient Feedback</h2>
              <p>
                We learn from every complaint. Your feedback helps us to refine our standards and improve our clinic. We use this data to train our team and prevent future issues.
              </p>
            </section>

            <section>
              <h2>Further Steps</h2>
              <p>
                We want to ensure you feel heard and supported. If you feel unsatisfied with our final response, you can escalate your complaint to ISCAS (The Independent Sector Complaints Adjudication Service).
              </p>
              <p>
                If you remain unsatisfied, you can also contact the Parliamentary and Health Service Ombudsman.
              </p>
            </section>

            <section>
              <h2>Additional Support</h2>
              <p>
                Please ask at reception if you need this policy in another format, require assistance to submit a complaint, or need translation services.
              </p>
            </section>
          </article>
        </Container>
      </div>
    </>
  );
}
