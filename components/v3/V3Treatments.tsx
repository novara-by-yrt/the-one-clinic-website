import Image from 'next/image';
import Link from 'next/link';
import styles from './V3Treatments.module.css';

/**
 * Treatment cards. Titles, descriptions and links are copied verbatim
 * from the live homepage's SLIDES_BASE, including the comma the source
 * uses mid-sentence in the Endolift entry, since the brief is to change
 * the layout and not the wording.
 *
 * The live page shows one description at a time in a detail panel below
 * a hover-driven fan carousel. Here all six sit in a card grid with a
 * single crop ratio, which is what lets the descriptions be read rather
 * than revealed.
 */
const TREATMENTS = [
  {
    src: '/images/Endolift1.png',
    title: 'Endolift',
    href: '/treatments/endolift-laser-leicester',
    desc: 'An innovative laser treatment that tightens and lifts loose skin using minimally invasive fibre technology , no surgery, no general anaesthetic, minimal downtime.',
  },
  {
    src: '/images/Minor Surgery1.jpg',
    title: 'Minor Surgery',
    href: '/treatments/minor-surgery-leicester',
    desc: 'Minor surgical procedures performed safely in our clinic. From mole removal to lipoma excision, handled with precision and expert care.',
  },
  {
    src: '/images/Deep Laser Resurfacing 1.png',
    title: 'Deep Laser Resurfacing',
    href: '/treatments/deep-laser-resurfacing-leicester',
    desc: 'Intensive laser treatment targeting deeper skin layers to reduce wrinkles, scarring, and uneven texture for dramatically renewed, smoother skin.',
  },
  {
    src: '/images/The Ultimate Body Confidence Package.png',
    title: 'Ultimate Body Confidence Package',
    href: '/treatments/the-body-confidence-package',
    desc: 'A comprehensive programme combining our leading body contouring and skin tightening treatments for transformative, full-body results.',
  },
  {
    src: '/images/Morpheus8-new.png',
    title: 'Morpheus 8',
    href: '/treatments/morpheus8-leicester',
    desc: 'Advanced radiofrequency microneedling that remodels fat and stimulates collagen deep within the skin for tightened, lifted, and youthful-looking contours.',
  },
  {
    src: '/images/Juliane.jpg',
    title: 'JULÄINE',
    href: '/treatments/julaine',
    desc: 'An exclusive regenerative treatment combining the finest aesthetic techniques to deliver exceptional, long-lasting rejuvenation, tailored entirely to you.',
  },
];

export default function V3Treatments() {
  return (
    <section
      className={styles.section}
      id="treatments"
      data-section-theme="light"
      aria-labelledby="v3-treatments-title"
    >
      <div className="v3-shell">
        <header className={`${styles.head} v3-narrow`}>
          <span className="v3-label">Medical Aesthetics &amp; Health Care</span>
          <h2 id="v3-treatments-title" className="v3-h2">
            Our Popular Treatments
          </h2>
          <p className="v3-lead">
            Advanced aesthetic and health treatments, all under one roof,
            tailored to your goals by our qualified doctors.
          </p>
        </header>

        <ul className={styles.grid}>
          {TREATMENTS.map((t) => (
            <li key={t.href} className={styles.card}>
              <Link href={t.href} className={styles.cardLink}>
                <span className={styles.plate}>
                  <Image
                    src={t.src}
                    alt={t.title}
                    fill
                    loading="lazy"
                    quality={75}
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="v3-plate"
                  />
                </span>
                <span className={styles.body}>
                  <span className={styles.title}>{t.title}</span>
                  <span className={styles.desc}>{t.desc}</span>
                  <span className={styles.action}>Learn More</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.footer}>
          <Link href="/treatments" className="v3-btn v3-btnOutline">
            Explore all treatments
          </Link>
        </div>
      </div>
    </section>
  );
}
