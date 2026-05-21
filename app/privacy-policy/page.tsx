import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy | The One Clinic Leicester',
  description: 'Read the privacy policy for The One Clinic. Learn how we collect, use, and protect your personal data and how cookies work on our site.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.hero} data-section-theme="dark" aria-label="Privacy Policy hero">
        <div className={styles.heroGrid} aria-hidden="true" />
        <Container>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Legal</p>
            <h1>Privacy Policy</h1>
            <p className={styles.intro}>
              The One Clinic is committed to protecting your privacy and ensuring you have a positive
              experience on our website. This policy explains how we collect, use, and protect your
              personal data.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Content ── */}
      <div className={styles.body}>
        <Container>
          <article className={styles.content}>

            <section>
              <h2>Introduction</h2>
              <p>
                The One Clinic ("we", "us", "our") is committed to protecting your privacy and
                ensuring you have a positive experience on our website. This policy explains how we
                collect, use, and protect your personal data, and how cookies and similar technologies
                work on our site.
              </p>
            </section>

            <section>
              <h2>Cookie Categories</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your experience, analyse
                site usage, and support our marketing efforts. We categorise our cookies as follows:
              </p>

              <div className={styles.categoryGrid}>
                <div className={styles.categoryCard}>
                  <h3>Strictly Necessary Cookies</h3>
                  <p>
                    Essential for core website functionality. These cannot be disabled and do not
                    require consent under UK GDPR and PECR regulations.
                  </p>
                  <dl>
                    <dt>LeadPipeline Form Embed</dt>
                    <dd>Enables our contact and newsletter forms to function correctly.</dd>
                  </dl>
                </div>

                <div className={styles.categoryCard}>
                  <h3>Functional Cookies</h3>
                  <p>
                    Enable enhanced features and personalisation based on your preferences. These
                    improve your user experience but are not strictly necessary.
                  </p>
                  <dl>
                    <dt>Wistia Video Player</dt>
                    <dd>Used to deliver and track engagement with embedded video content on our site.</dd>
                    <dt>LeadPipeline Forms</dt>
                    <dd>Personalisation and tracking of form interactions and submissions.</dd>
                  </dl>
                </div>

                <div className={styles.categoryCard}>
                  <h3>Analytics Cookies</h3>
                  <p>
                    Help us understand how you use our site so we can improve it. These cookies
                    collect aggregated, anonymised data.
                  </p>
                  <p className={styles.note}>
                    We do not currently use third-party analytics tools. This category is reserved for
                    future implementation.
                  </p>
                </div>

                <div className={styles.categoryCard}>
                  <h3>Marketing Cookies</h3>
                  <p>
                    Used to deliver personalised ads and marketing content. These allow us to measure
                    campaign effectiveness and understand audience interests.
                  </p>
                  <dl>
                    <dt>Facebook Social Plugins</dt>
                    <dd>
                      Facebook may set cookies if you interact with our social media links or embedded
                      social content.
                    </dd>
                  </dl>
                </div>
              </div>
            </section>

            <section>
              <h2>Your Rights</h2>
              <p>Under UK GDPR, you have the right to:</p>
              <ul>
                <li>
                  <strong>Access your data:</strong> Request a copy of personal data we hold about you
                </li>
                <li>
                  <strong>Rectification:</strong> Correct inaccurate or incomplete data
                </li>
                <li>
                  <strong>Erasure:</strong> Request deletion of your data in certain circumstances
                </li>
                <li>
                  <strong>Restrict processing:</strong> Limit how we use your data
                </li>
                <li>
                  <strong>Data portability:</strong> Receive your data in a portable format
                </li>
                <li>
                  <strong>Withdraw consent:</strong> Revoke consent for non-essential cookies at any time
                </li>
              </ul>
            </section>

            <section>
              <h2>Managing Your Consent</h2>
              <p>
                You can manage your cookie preferences at any time by clicking &ldquo;Manage Cookies&rdquo; in the
                footer. You can:
              </p>
              <ul>
                <li>Accept all cookies</li>
                <li>Reject all non-essential cookies</li>
                <li>Customise which categories you consent to</li>
              </ul>
              <p>
                Consent preferences are stored in your browser and expire after 12 months. You can
                withdraw consent at any time by using the &ldquo;Manage Cookies&rdquo; button.
              </p>
            </section>

            <section>
              <h2>Contact Us</h2>
              <p>
                If you have any questions about our privacy practices or cookies, please contact us at:
              </p>
              <p>
                <strong>The One Clinic</strong><br />
                36 DeMontfort Street<br />
                Leicester, LE1 7GS<br />
                <a href="mailto:info@the-oneclinic.net">info@the-oneclinic.net</a><br />
                <a href="tel:+447481342374">07481 342 374</a>
              </p>
            </section>

            <section>
              <h2>Policy Updates</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of significant
                changes by updating the date below and highlighting the changes on our website.
              </p>
              <p className={styles.lastUpdated}>Last updated: 21 May 2026</p>
            </section>

          </article>
        </Container>
      </div>
    </>
  );
}
