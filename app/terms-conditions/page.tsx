import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions for The One Clinic Leicester. Please read our legal terms before using our services.',
};

export default function TermsConditionsPage() {
  return (
    <main className={styles.main}>
      <Container>
        <article className={styles.content}>
          <h1>Terms &amp; Conditions</h1>

          <p className={styles.lastUpdated}>Last updated: 19 May 2026</p>

          <section>
            <h2>1. Introduction</h2>
            <p>
              These Terms and Conditions ("Terms") govern your access to and use of the website and services provided by The One Clinic ("we", "us", "our", or "the Clinic"), located at 36 DeMontfort Street, Leicester LE1 7GS, United Kingdom.
            </p>
            <p>
              By accessing and using this website and booking any services with The One Clinic, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our website or services.
            </p>
          </section>

          <section>
            <h2>2. Use of Website</h2>
            <h3>2.1 Permitted Use</h3>
            <p>
              You agree to use this website only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use and enjoyment of the website. Prohibited behaviour includes:
            </p>
            <ul>
              <li>Harassing or causing distress or inconvenience to any person</li>
              <li>Transmitting obscene or offensive content</li>
              <li>Disrupting the normal flow of dialogue within the website</li>
              <li>Attempting to gain unauthorised access to our systems</li>
              <li>Uploading viruses or malicious code</li>
              <li>Using automated tools to access or collect data without permission</li>
            </ul>

            <h3>2.2 Intellectual Property Rights</h3>
            <p>
              All content on this website, including text, graphics, logos, images, and software, is the property of The One Clinic or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, or transmit any content without our prior written permission.
            </p>
          </section>

          <section>
            <h2>3. Medical Services &amp; Consultation</h2>
            <h3>3.1 Qualified Practitioners</h3>
            <p>
              All medical services at The One Clinic are provided by fully qualified, GMC-registered doctors and specialists. Our team is committed to delivering services in accordance with General Medical Council (GMC) guidelines and relevant UK medical law.
            </p>

            <h3>3.2 Consultation &amp; Treatment</h3>
            <p>
              All patients must attend a consultation prior to any aesthetic or medical treatment. During your consultation, our practitioners will:
            </p>
            <ul>
              <li>Assess your suitability for the proposed treatment</li>
              <li>Discuss risks, benefits, and alternatives</li>
              <li>Answer your questions thoroughly</li>
              <li>Obtain your informed consent before proceeding</li>
            </ul>
            <p>
              No treatment will be provided without your explicit written or verbal consent.
            </p>

            <h3>3.3 Private Medical Services</h3>
            <p>
              Services provided at The One Clinic are private medical services. We are registered with the Care Quality Commission (CQC) as a private healthcare provider. Patients should be aware that private services are not covered by the NHS.
            </p>
          </section>

          <section>
            <h2>4. Booking &amp; Payments</h2>
            <h3>4.1 Booking a Consultation</h3>
            <p>
              Consultations and treatments must be booked in advance through our website, telephone, or email. A booking is not confirmed until payment is received or a payment arrangement is established.
            </p>

            <h3>4.2 Fees &amp; Payments</h3>
            <p>
              Prices for consultations and treatments are displayed on our website and are subject to change without notice. All fees must be paid in full prior to treatment, unless a payment plan has been agreed in writing.
            </p>
            <p>
              We accept payment by credit card, debit card, and bank transfer. All transactions are processed securely and in accordance with PCI DSS standards.
            </p>

            <h3>4.3 Cancellation &amp; Refund Policy</h3>
            <p>
              Cancellations must be made at least 48 hours in advance to receive a full refund. Cancellations made with less than 48 hours' notice will be subject to a cancellation fee equivalent to 50% of the appointment cost. No-shows will be charged in full.
            </p>
            <p>
              Refunds will be processed within 7–10 working days following cancellation.
            </p>

            <h3>4.4 Rescheduling</h3>
            <p>
              Appointments may be rescheduled with at least 48 hours' notice at no additional charge, subject to availability.
            </p>
          </section>

          <section>
            <h2>5. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by UK law, The One Clinic shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the website or services, including loss of profits, data, or goodwill, even if we have been advised of the possibility of such damages.
            </p>
            <p>
              Our total liability to you for any claim arising from these Terms or your use of the website shall not exceed the amount you have paid for the service in question.
            </p>
          </section>

          <section>
            <h2>6. Medical Advice Disclaimer</h2>
            <p>
              The information provided on this website, including blog posts, articles, and treatment descriptions, is for educational purposes only and should not be construed as medical advice. It is not a substitute for professional medical consultation.
            </p>
            <p>
              Always consult with a qualified healthcare practitioner before making decisions regarding your health or treatment. The One Clinic accepts no responsibility for decisions made based on information contained on this website.
            </p>
          </section>

          <section>
            <h2>7. Links to Third-Party Websites</h2>
            <p>
              This website may contain links to external websites. We are not responsible for the content, accuracy, or practices of third-party websites. Your use of external websites is subject to their own terms and conditions.
            </p>
          </section>

          <section>
            <h2>8. Patient Data &amp; Privacy</h2>
            <p>
              The collection and use of your personal data is governed by our Privacy Policy. By using this website and booking services, you consent to the collection and processing of your personal data as described in our Privacy Policy.
            </p>
            <p>
              All medical records and patient data are stored securely and confidentially in accordance with the Data Protection Act 2018 and UK GDPR requirements.
            </p>
          </section>

          <section>
            <h2>9. Complaints &amp; Disputes</h2>
            <h3>9.1 Making a Complaint</h3>
            <p>
              If you are dissatisfied with any aspect of our service, please contact us immediately:
            </p>
            <ul>
              <li><strong>Email:</strong> info@the-oneclinic.net</li>
              <li><strong>Phone:</strong> 07481 342 374</li>
              <li><strong>Address:</strong> 36 DeMontfort Street, Leicester LE1 7GS</li>
            </ul>
            <p>
              We will investigate your complaint and respond within 14 working days.
            </p>

            <h3>9.2 Regulatory Bodies</h3>
            <p>
              If you believe we have not met GMC or CQC standards, you may lodge a complaint with the relevant regulatory body:
            </p>
            <ul>
              <li><strong>General Medical Council (GMC):</strong> www.gmc-uk.org</li>
              <li><strong>Care Quality Commission (CQC):</strong> www.cqc.org.uk</li>
            </ul>
          </section>

          <section>
            <h2>10. Governing Law</h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with English law. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the English courts.
            </p>
          </section>

          <section>
            <h2>11. Changes to These Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website following any changes constitutes your acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2>12. Contact Information</h2>
            <p>
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <address className={styles.contactInfo}>
              <strong>The One Clinic</strong><br />
              36 DeMontfort Street<br />
              Leicester LE1 7GS<br />
              United Kingdom<br />
              <strong>Phone:</strong> 07481 342 374<br />
              <strong>Email:</strong> info@the-oneclinic.net
            </address>
          </section>
        </article>
      </Container>
    </main>
  );
}
