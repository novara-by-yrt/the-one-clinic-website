import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header} role="banner">
      <div className={`container ${styles.inner}`}>
        <a href="/" className={styles.logo} aria-label="The One Clinic – home">
          {/* Logo placeholder */}
          <span className={styles.logoText}>TheOneClinic</span>
        </a>

        <nav className={styles.nav} aria-label="Main navigation">
          {/* Navigation links will be added when sections are built */}
          <ul className={styles.navList}>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
