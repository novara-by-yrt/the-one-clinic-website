import styles from './Card.module.css';

type Props = {
  theme?: 'light' | 'dark';
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export default function Card({
  theme = 'light',
  children,
  className,
  hover = false,
}: Props) {
  const cls = [
    styles.card,
    styles[theme],
    hover ? styles.hoverable : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={cls}>{children}</div>;
}
