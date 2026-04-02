import styles from './Button.module.css';

type Props = {
  variant?: 'primary' | 'secondary';
  theme?: 'light' | 'dark';
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  variant = 'primary',
  theme = 'light',
  children,
  className,
  ...rest
}: Props) {
  const cls = [
    styles.button,
    styles[variant],
    styles[theme],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
