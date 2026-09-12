import Image from 'next/image';
import Link from 'next/link';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import styles from './V4Panel.module.css';

export type Panel = {
  /** Small uppercase kicker above the headline. */
  eyebrow: string;
  headline: string;
  /** One or two short paragraphs. */
  body: string[];
  /** Omit `href` to open the site's booking modal instead of navigating. */
  cta: { label: string; href?: string };
  image: { src: string; alt: string };
  /** Which side the image sits on in horizontal mode. The page alternates it. */
  imageSide: 'left' | 'right';
  tone?: 'paper' | 'paperAlt' | 'ink';
};

type Props = Panel & {
  id: string;
  /**
   * Panel 1 loads eagerly; panel 2 also loads eagerly so a fast flip off
   * the first panel never lands on a blank one. Everything further along
   * is lazy.
   */
  eager?: boolean;
};

/**
 * One panel of the magazine: a 1:1 image column beside a text column.
 *
 * The panel is a real <section> with a real heading and its content in
 * reading order, so the horizontal presentation costs nothing in
 * crawlability or screen-reader order. Markup order is image then text,
 * which is also the order the vertical fallback stacks in; horizontal
 * mode reorders the two columns visually only.
 *
 * The image always renders into a 1:1 box with object-fit cover, so
 * source images of any ratio centre-crop to a square. In horizontal mode
 * the square is additionally capped to the panel's usable height, so a
 * short laptop shrinks the square rather than overflowing the panel.
 */
export default function V4Panel({
  eyebrow,
  headline,
  body,
  cta,
  image,
  imageSide,
  tone = 'paper',
  id,
  eager = false,
}: Props) {
  return (
    <section
      id={id}
      className={[
        styles.panel,
        styles[tone],
        imageSide === 'right' ? styles.imageRight : styles.imageLeft,
        tone === 'ink' ? 'v4-onInk' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-labelledby={`${id}-title`}
    >
      <span
        className="v4-themeMark"
        data-section-theme={tone === 'ink' ? 'dark' : 'light'}
        aria-hidden="true"
      />
      <div className={styles.inner}>
        <div className={styles.media}>
          <div className={styles.plate}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              loading={eager ? 'eager' : 'lazy'}
              quality={75}
              sizes="(max-width: 1023px) 100vw, 48vw"
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.text}>
          <div className={styles.textInner}>
            <p className={styles.eyebrow}>{eyebrow}</p>

            <h2 id={`${id}-title`} className={styles.headline}>
              {headline}
            </h2>

            <div className={styles.body}>
              {body.map((para) => (
                <p key={para} className={styles.para}>
                  {para}
                </p>
              ))}
            </div>

            <div className={styles.actions}>
              {cta.href ? (
                <Link href={cta.href} className="v4-cta">
                  {cta.label}
                </Link>
              ) : (
                <BookConsultationButton className="v4-cta">
                  {cta.label}
                </BookConsultationButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
