import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Terms and Conditions | The One Clinic Leicester',
  description: 'Read the terms and conditions for The One Clinic. Review our clear policies on consultations, deposits, cancellations, and patient care.',
};

export default function TermsConditionsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.hero} data-section-theme="dark" aria-label="Terms and Conditions, hero">
        <div className={styles.heroGrid} aria-hidden="true" />
        <Container>
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>Legal</p>
            <h1 className={styles.heroTitle}>Terms &amp; Conditions</h1>
            <p className={styles.heroSubtitle}>
              Please read these terms carefully before visiting or booking with The One Clinic.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Content ── */}
      <div className={styles.body}>
        <Container>
          <article className={styles.content}>
            <p className={styles.intro}>
              Please read these Terms and Conditions carefully prior to your visit. By making an appointment reservation online, by phone, or in person, you agree to these terms and any applicable statutory rights.
            </p>

            <section>
              <h2>1. Consultations</h2>
              <p>
                Consultations are provided by qualified medical professionals, including doctors and clinical practitioners. Consultation fees are charged for clinician time, professional assessment, and personalised medical advice. A consultation is a clinical service, whether or not a procedure is subsequently undertaken. Consultation fees are non-refundable once the appointment has taken place, except where required by law. Where clinically appropriate, and at the Clinic&apos;s discretion, the consultation fee may be credited toward a procedure if used within 6 months of the consultation date.
              </p>
            </section>

            <section>
              <h2>2. Reservation Fees and Deposits</h2>
              <p>
                A deposit is required to secure an appointment, consultation, procedure, or treatment. Deposits are used to reserve clinical time and administrative resources and may be retained where a patient cancels late or does not attend, subject always to applicable law.
              </p>
            </section>

            <section>
              <h2>3. Cancellations and Non-Attendance</h2>
              <p>
                A minimum of 24 hours&apos; notice is required to cancel or reschedule any appointment. If less than 24 hours&apos; notice is given, your deposit is non-refundable. If a patient does not attend (a no-show), the deposit is non-refundable, and a new deposit may be required for any future appointment. For prepaid sessions or packages, a missed session may be deducted in accordance with these Terms.
              </p>
            </section>

            <section>
              <h2>4. Late Arrival</h2>
              <p>
                Patients are expected to arrive on time for all appointments. If a patient arrives more than 15 minutes late, the appointment may be shortened or cancelled at the Clinic&apos;s discretion. Where the appointment is shortened, the full fee will still apply. Where the appointment is cancelled due to late arrival, any applicable deposit may be forfeited.
              </p>
            </section>

            <section>
              <h2>5. Statutory Rights</h2>
              <p>
                Where a contract is made at a distance, by telephone, online, or otherwise off-premises, the Consumer Contracts Regulations 2013 may give the patient a 14-day right to cancel. If the patient expressly requests that services begin within that period, the patient acknowledges that the Clinic may charge for services actually provided up to the time of cancellation, and that the right to cancel may be lost once the service has been fully performed with the patient&apos;s express consent.
              </p>
            </section>

            <section>
              <h2>6. No Refunds</h2>
              <p>
                The Clinic does not offer refunds simply because a patient changes their mind, is unhappy with an outcome that falls within normal clinical variation, or decides not to proceed after a procedure has started. This applies to consultation fees, deposits, treatments already performed, and pre-paid packages, except where a refund is required by law.
              </p>
            </section>

            <section>
              <h2>7. Clinical Outcomes and Expectations</h2>
              <p>
                All medical and aesthetic treatments carry risks and variable outcomes. Results may vary from person to person. The Clinic does not guarantee any specific result. Outcomes vary depending on factors such as individual anatomy, recovery response, medical history, and adherence to aftercare instructions. Additional or maintenance treatments may be required to achieve or maintain results.
              </p>
            </section>

            <section>
              <h2>8. Clinical Decisions</h2>
              <p>
                All treatment choices are based on clinical judgment and patient safety. The Clinic may decline, modify, delay, or stop treatment where this is considered clinically appropriate. Such choices are made in the patient&apos;s best interests and do not normally entitle the patient to a refund, subject always to applicable law.
              </p>
            </section>

            <section>
              <h2>9. Patient Responsibilities</h2>
              <p>
                Patients are responsible for providing a complete and accurate medical history, informing the Clinic of any health or medication changes, following all pre- and post-treatment instructions, and attending with a translator if they lack sufficient English comprehension. The Clinic is not responsible for complications that arise from incomplete or inaccurate data, or from failure to follow clinical advice or aftercare instructions.
              </p>
            </section>

            <section>
              <h2>10. Delays</h2>
              <p>
                Appointments and surgical lists may occasionally be delayed due to unforeseen clinical events, complications that affect another patient, emergency care, equipment issues, or other circumstances outside the Clinic&apos;s reasonable control. The Clinic will use reasonable endeavours to keep patients informed and may offer a revised appointment time, priority schedule, or credit where appropriate. No cash refund will be due unless required by law.
              </p>
            </section>

            <section>
              <h2>11. Conduct and Zero Tolerance</h2>
              <p>
                The Clinic expects all patients to treat staff, clinicians, contractors, and other patients with courtesy and respect. The Clinic operates a zero-tolerance policy in relation to abusive, coercive, sexually inappropriate, or otherwise unacceptable behaviour, inclusive of conduct that undermines professional boundaries or compromises staff welfare or clinical safety. The Clinic may refuse to see, continue to treat, or reschedule any patient whose conduct is considered inappropriate, unsafe, or unreasonable. The Clinic may also remove a patient from the premises, end an appointment immediately, and report matters to the police, relevant authorities, insurers, regulators, or other appropriate third parties where necessary.
              </p>
            </section>

            <section>
              <h2>12. Complaints Process and Malicious Allegations</h2>
              <p>
                The Clinic values genuine feedback and has a structured complaints process. If you have a concern, we encourage you to raise it formally so we can investigate and resolve the matter. However, where the Clinic reasonably believes that a complaint, allegation, online review, or statement has been made with clear intent to cause harm, harassment, reputational damage, or financial loss, the Clinic reserves the right to preserve evidence, respond to the matter, report it to the relevant platform, and seek legal advice or any other appropriate remedy.
              </p>
            </section>

            <section>
              <h2>13. Consent</h2>
              <p>
                All patients must provide valid informed consent before any treatment or procedure. Consent will be accepted only if the patient has had the opportunity to ask questions, consider the relevant details, and make a voluntary choice. No treatment will be carried out without appropriate consent documentation.
              </p>
            </section>

            <section>
              <h2>14. Acceptance of Terms</h2>
              <p>
                By reservation or attendance at an appointment, consultation, treatment, or procedure, the patient confirms that they have read, understood, and agree to these Terms and Conditions, inclusive of the cancellation policy, the zero-tolerance policy, and any applicable statutory cancellation rights.
              </p>
            </section>
          </article>
        </Container>
      </div>
    </>
  );
}
