import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.inner}`}>
        <Image
          src="/images/LOGO.png"
          alt="The One Clinic"
          width={120}
          height={34}
          className={styles.logo}
        />
        <p className={styles.copy}>
          &copy; {year} The One Clinic. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
