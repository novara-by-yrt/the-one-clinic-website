import styles from './Section.module.css';

type Props = {
  variant?: 'light' | 'dark';
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: 'section' | 'article' | 'div';
} & Omit<React.HTMLAttributes<HTMLElement>, 'className' | 'id' | 'children'>;

export default function Section({
  variant = 'light',
  children,
  className,
  id,
  as: Tag = 'section',
  ...rest
}: Props) {
  const cls = [styles.section, styles[variant], className].filter(Boolean).join(' ');

  return (
    <Tag id={id} className={cls} {...rest}>
      {children}
    </Tag>
  );
}
