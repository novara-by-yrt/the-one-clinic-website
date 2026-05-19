import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'The One Clinic privacy policy. How we collect, use and protect your personal data in accordance with UK GDPR and the Data Protection Act 2018.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.main}>
      <Container>
        <article className={styles.content}>

          <div className={styles.hero}>
            <span className={styles.eyebrow}>Legal</span>
            <h1>Privacy Policy</h1>
            <p className={styles.intro}>
              This notice explains how The One Clinic collects, uses, and protects your personal data
              in accordance with UK data protection law.
            </p>
            <p className={styles.lastUpdated}>Last updated: May 2026</p>
          </div>

          <section>
            <h2>Our Commitment</h2>
            <p>
              We are committed to protecting your privacy, and the privacy of our website visitors.
              Any information that will be collected will be used in accordance with the General Data
              Protection Regulation, the Data Protection Act 2018, and the Privacy and Electronic
              Communications Regulations 2003.
            </p>
            <p>
              Information gathered will not be shared with any third-party companies for direct
              marketing.
            </p>
          </section>

          <section>
            <h2>Who We Are</h2>
            <p>
              This Privacy Notice is provided by The One Clinic, which is the trading name of
              Curantis Health Ltd. This Notice applies to all data subjects whose personal data is
              collected by The One Clinic.
            </p>
            <p>
              The One Clinic is a clinic that provides an extensive list of treatments for face and
              body. We provide a bespoke treatment for each client, matching the services we offer
              with the needs of the client. The One Clinic is located at 36 De Montfort Street,
              Leicester LE1 7GS.
            </p>
            <p>
              The purpose of this notice is to inform you (data subjects) of what personal data we
              collect about you in line with the requirements of UK GDPR.
            </p>
          </section>

          <section>
            <h2>How We Collect Data</h2>
            <p>
              The One Clinic will generally only receive personal data from the individual concerned
              directly in the course of conducting business. This may be in person, via email, web
              form, or telephone. However, in some cases personal data will be supplied by third
              parties (for example, online booking platforms or job sites) but only when you have
              specifically booked a service or treatment, or responded to a vacancy offered by The
              One Clinic on a third-party platform.
            </p>
          </section>

          <section>
            <h2>The Data We Collect</h2>
            <p>
              In the course of our business, The One Clinic will collect certain types of personal
              data which will include:
            </p>
            <ul>
              <li>
                Names, postal addresses, telephone numbers, email addresses, and other contact
                details (telephone calls may also be recorded for training purposes).
              </li>
              <li>
                Financial information which could include bank details and credit card details.
              </li>
              <li>
                Personnel files in connection with employment and recruitment.
              </li>
              <li>
                Information supplied in the medical questionnaire about a person&apos;s health and
                relevant medical conditions that could affect the suitability of treatments.
              </li>
              <li>
                Still images of clients during the treatment process (to assess before and after)
                and any video captured by the CCTV security system installed at our premises.
              </li>
              <li>
                Technical information such as cookies, IP address, browser type, etc. when you
                visit our website.
              </li>
              <li>
                For any disclosure of information of another person, you must have full consent of
                that person to disclose and process their personal information in accordance with
                this policy.
              </li>
              <li>
                Where The One Clinic is required to process the data of a child (individuals under
                the age of 16), we will ask for consent to be authorised by the holder of parental
                responsibility for the child.
              </li>
            </ul>
          </section>

          <section>
            <h2>Why We Process Your Personal Data</h2>
            <p>
              During the course of our business, we need to process a wide range of personal data
              and we will only do so in accordance with the law. Some of this is done to fulfil The
              One Clinic&apos;s legal obligations, including those related to its employees, or
              contractual obligations such as those to its insurers. In other cases, we will process
              data where it is in our legitimate interest, except where such interests are overridden
              by the interests or fundamental rights and freedoms of the data subject.
            </p>
            <p>The One Clinic believes the following uses will fall within the category of legitimate interest:</p>
            <ul>
              <li>For the purpose of recommending and providing treatments and products.</li>
              <li>
                For the purpose of providing information on pre- and aftercare before and following
                treatment.
              </li>
              <li>
                For the purpose of confirming and reminding individuals of appointments via email
                and text messages.
              </li>
              <li>
                For the purpose of our newsletter and other relevant offer emails updating clients
                on new products and services offered by The One Clinic. You can opt out of this at
                any time.
              </li>
              <li>
                For the purpose of security, to protect our websites, infrastructure, and premises
                from attacks or threats and to report any illegal activities.
              </li>
            </ul>
            <div className={styles.highlight}>
              <p>
                Given that we need to collect health information, and this is classed as a special
                category of personal data, we need to identify a specific condition under Article 9.
                The condition on which we rely is that processing is necessary for the purposes of
                providing health care or treatment.
              </p>
            </div>
          </section>

          <section>
            <h2>Who Has Access to Data &amp; Who We Share It With</h2>
            <p>
              Personal information gathered will not be shared with any third-party companies for
              direct marketing.
            </p>
            <p>
              Usually, personal data collected by The One Clinic will remain within The One Clinic
              and will be processed by appropriate employees. Some processing is carried out by
              third parties such as website developers and cloud storage providers, but is at all
              times kept securely and only processed with the directions of The One Clinic.
            </p>
            <p>
              On occasion, we will need to share personal information, to meet our legal obligations
              or for contractual reasons, with third parties such as banks, lawyers, insurers,
              accountants, or government authorities such as HMRC if you are an employee.
            </p>
            <p>
              If you decide to apply for finance, we will only share your email address with the
              finance company so that they may communicate with you directly.
            </p>
          </section>

          <section>
            <h2>How Long We Keep Personal Data</h2>
            <p>
              We are committed to complying with our legal obligation to the retention and deletion
              of personal information. The type of data and the purpose for collection will determine
              how long The One Clinic will retain your data. We will not process your personal
              information for purposes longer than necessary.
            </p>

            <div className={styles.retentionGrid}>
              <div className={styles.retentionCard}>
                <h3>Employee Records</h3>
                <p>
                  Employee data can be kept for up to <strong>7 years</strong> following departure
                  from the company. Details of unsuccessful applicants will be stored for up to
                  <strong> 1 year</strong>.
                </p>
              </div>
              <div className={styles.retentionCard}>
                <h3>Client Medical Records</h3>
                <p>
                  Our insurers require The One Clinic to keep client records, including medical
                  data, images, and treatment data, for <strong>10 years</strong> from the date of
                  your last treatment, following which they will be securely disposed of.
                </p>
              </div>
              <div className={styles.retentionCard}>
                <h3>Business Contacts &amp; Newsletter</h3>
                <p>
                  Data of those engaged with the business, such as contacts for an active contract
                  or receivers of our monthly newsletter, will be retained as long as the service is
                  being contracted or the newsletter is being sent.
                </p>
              </div>
              <div className={styles.retentionCard}>
                <h3>Opt-Out Records</h3>
                <p>
                  Email addresses of those who have opted out of receiving our newsletter services
                  will be kept <strong>indefinitely</strong> to ensure continued compliance.
                </p>
              </div>
              <div className={styles.retentionCard}>
                <h3>Financial Records</h3>
                <p>
                  Financial and accounting records will be kept for <strong>6 years</strong> from
                  the end of the last company financial year they relate to, or longer if required
                  by HMRC.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2>Your Rights as a Data Subject</h2>
            <p>
              At any point while we are in possession of or processing your personal data, you have
              the following rights:
            </p>
            <div className={styles.rightsGrid}>
              <div className={styles.rightItem}>
                <h3>Right of Access</h3>
                <p>You have the right to request a copy of the information that we hold about you.</p>
              </div>
              <div className={styles.rightItem}>
                <h3>Right of Rectification</h3>
                <p>You have a right to correct data that we hold about you that is inaccurate or incomplete.</p>
              </div>
              <div className={styles.rightItem}>
                <h3>Right to be Forgotten</h3>
                <p>In certain circumstances, you can ask for the data we hold about you to be erased from our records.</p>
              </div>
              <div className={styles.rightItem}>
                <h3>Right to Restriction</h3>
                <p>Where certain conditions apply, you have a right to restrict the processing of your data.</p>
              </div>
              <div className={styles.rightItem}>
                <h3>Right of Portability</h3>
                <p>You have the right to have the data we hold about you transferred to another organisation.</p>
              </div>
              <div className={styles.rightItem}>
                <h3>Right to Object</h3>
                <p>You have the right to object to certain types of processing, such as direct marketing.</p>
              </div>
              <div className={styles.rightItem}>
                <h3>Right to Object to Automated Processing</h3>
                <p>You also have the right not to be subject to the legal effects of automated processing or profiling.</p>
              </div>
              <div className={styles.rightItem}>
                <h3>Right to Judicial Review</h3>
                <p>In the event that The One Clinic refuses your request under rights of access, we will provide a reason as to why. You have the right to complain.</p>
              </div>
            </div>
          </section>

          <section>
            <h2>Updates to This Privacy Notice</h2>
            <p>
              The One Clinic will update this privacy notice from time to time. Our website will be
              updated when necessary to reflect the most recent and up-to-date copy of this notice.
              Please check this Privacy Policy page occasionally to ensure that you are happy with
              any changes.
            </p>
          </section>

          <section>
            <h2>Complaints</h2>
            <p>
              If you believe that we have not complied with our privacy notice, you may complain to
              the Information Commissioner&apos;s Office (ICO). However, as recommended by the ICO,
              please allow The One Clinic the opportunity to resolve the matter before involving the
              regulator.
            </p>
            <p>
              All queries and complaints should, in the first instance, be directed by email to The
              One Clinic at:
            </p>
            <address className={styles.contactBlock}>
              <strong>The One Clinic</strong><br />
              36 De Montfort Street, Leicester LE1 7GS<br />
              <a href="mailto:info@the-oneclinic.co.uk">info@the-oneclinic.co.uk</a>
            </address>
            <p>
              You can contact the ICO at{' '}
              <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a>{' '}
              or by calling 0303 123 1113.
            </p>
          </section>

        </article>
      </Container>
    </main>
  );
}
