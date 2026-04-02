import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.inner}`}>
        <p className={styles.copy}>
          &copy; {year} The One Clinic. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
