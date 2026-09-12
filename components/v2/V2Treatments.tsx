import Image from 'next/image';
import Link from 'next/link';
import styles from './V2Treatments.module.css';

/**
 * Six treatments, six cells, no empty tiles. Cell widths are uneven by
 * design so the grid has rhythm rather than repeating one tile size.
 *
 * The live homepage runs these as a hover-driven fan carousel with a
 * detail panel; this is the static counterpart. The long descriptions
 * are condensed to a single line each, because at this size the image
 * is doing the explaining.
 */
const TREATMENTS = [
  {
    src: '/images/Endolift1.png',
    title: 'Endolift',
    line: 'Laser skin tightening with no surgery and minimal downtime.',
    href: '/treatments/endolift-laser-leicester',
  },
  {
    src: '/images/Morpheus8-new.png',
    title: 'Morpheus 8',
    line: 'Radiofrequency microneedling that remodels and lifts.',
    href: '/treatments/morpheus8-leicester',
  },
  {
    src: '/images/Deep Laser Resurfacing 1.png',
    title: 'Deep laser resurfacing',
    line: 'Targets wrinkles, scarring and uneven texture.',
    href: '/treatments/deep-laser-resurfacing-leicester',
  },
  {
    src: '/images/Minor Surgery1.jpg',
    title: 'Minor surgery',
    line: 'Mole and lipoma removal, performed in clinic.',
    href: '/treatments/minor-surgery-leicester',
  },
  {
    src: '/images/The Ultimate Body Confidence Package.png',
    title: 'Body confidence package',
    line: 'Contouring and skin tightening, combined.',
    href: '/treatments/the-body-confidence-package',
  },
  {
    src: '/images/Juliane.jpg',
    title: 'JULÄINE',
    line: 'A regenerative programme built around you.',
    href: '/treatments/julaine',
  },
];

export default function V2Treatments() {
  return (
    <section className={styles.section} id="treatments" data-section-theme="light">
      <div className="v2-shell">
        <header className="v2-sectionHead">
          <h2 className="v2-h2">Treatments</h2>
          <p className="v2-lead">
            Aesthetic and medical care under one roof, matched to your goals by
            the doctor who will carry them out.
          </p>
        </header>

        <ul className={styles.mosaic}>
          {TREATMENTS.map((t) => (
            <li key={t.href} className={styles.cell}>
              <Link href={t.href} className={styles.card}>
                <span className={styles.plate}>
                  <Image
                    src={t.src}
                    alt={`${t.title} at The One Clinic`}
                    fill
                    loading="lazy"
                    quality={75}
                    sizes="(max-width: 700px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="v2-plate"
                  />
                </span>
                <span className={styles.caption}>
                  <span className={styles.title}>{t.title}</span>
                  <span className={styles.line}>{t.line}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.footer}>
          {/* Same label as the hero's secondary CTA on purpose: one
              label per intent across the whole page. */}
          <Link href="/treatments" className="v2-link">
            Explore treatments
          </Link>
        </div>
      </div>
    </section>
  );
}
