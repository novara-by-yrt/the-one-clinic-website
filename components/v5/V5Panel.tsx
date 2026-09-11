import Image from 'next/image';
import Link from 'next/link';
import BookConsultationButton from '@/components/ui/BookConsultationButton';
import styles from './V5Panel.module.css';

export type Panel = {
  /** Small uppercase kicker above the headline. */
  eyebrow: string;
  headline: string;
  /** One or two short paragraphs. */
  body: string[];
  /** Omit `href` to open the site's booking modal instead of navigating. */
  cta: { label: string; href?: string };
  image: { src: string; alt: string };
  /** Which side the image sits on in the deck. The page alternates it. */
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
  /** Its place in the deck, zero based. */
  slide: number;
};

/**
 * One panel of the magazine: a 1:1 image column beside a text column.
 *
 * The panel is a real <section> with a real heading and its content in
 * reading order, so the deck presentation costs nothing in
 * crawlability or screen-reader order. Markup order is image then text,
 * which is also the order the plain stacked page reads in; the deck
 * mode reorders the two columns visually only.
 *
 * The image always renders into a 1:1 box with object-fit cover, so
 * source images of any ratio centre-crop to a square. In the deck
 * the square is additionally capped to the panel's usable height, so a
 * short laptop shrinks the square rather than overflowing the panel.
 */
export default function V5Panel({
  eyebrow,
  headline,
  body,
  cta,
  image,
  imageSide,
  tone = 'paper',
  id,
  eager = false,
  slide,
}: Props) {
  return (
    <section
      id={id}
      className={[
        styles.panel,
        // The slide geometry and the depth pass are global so all three
        // panel kinds share one animation; see v5-tokens.css.
        'v5-slide',
        styles[tone],
        imageSide === 'right' ? styles.imageRight : styles.imageLeft,
        tone === 'ink' ? 'v5-onInk' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-labelledby={`${id}-title`}
      // Its place in the deck, which the CSS needs twice: to put earlier
      // cards in front, and to give this card the two-viewport window of
      // scrolling that is its own turn.
      style={{ '--i': slide } as React.CSSProperties}
    >
      <span
        className="v5-themeMark"
        data-section-theme={tone === 'ink' ? 'dark' : 'light'}
        aria-hidden="true"
      />
      <div className={styles.inner}>
        <div className={`${styles.media} v5-layerMedia`}>
          <div className={styles.plate}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              loading={eager ? 'eager' : 'lazy'}
              quality={75}
              // 48% of an 80vw slide, not of the viewport: v4's slide
              // was the full width, this one is not, and asking for
              // 48vw here would decode about a third more pixels than
              // any plate can show.
              sizes="(max-width: 1023px) 100vw, 39vw"
              className={styles.image}
            />
          </div>
        </div>

        <div className={`${styles.text} v5-layerText`}>
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
                <Link href={cta.href} className="v5-cta">
                  {cta.label}
                </Link>
              ) : (
                <BookConsultationButton className="v5-cta">
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
