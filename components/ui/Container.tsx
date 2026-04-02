import styles from './Container.module.css';

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
};

export default function Container({
  children,
  className,
  as: Tag = 'div',
}: Props) {
  const cls = [styles.container, className].filter(Boolean).join(' ');

  return <Tag className={cls}>{children}</Tag>;
}
