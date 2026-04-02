import styles from './Input.module.css';

type BaseProps = {
  label?: string;
  theme?: 'light' | 'dark';
  multiline?: false;
  id: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

type TextareaProps = {
  label?: string;
  theme?: 'light' | 'dark';
  multiline: true;
  rows?: number;
  id: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type Props = BaseProps | TextareaProps;

export default function Input(props: Props) {
  const { label, theme = 'light', id, className } = props;

  const fieldCls = [
    styles.field,
    styles[theme],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={`${styles.label} ${styles[theme]}`}>
          {label}
        </label>
      )}

      {props.multiline ? (
        <textarea
          id={id}
          className={`${fieldCls} ${styles.textarea}`}
          rows={props.rows ?? 4}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          className={fieldCls}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
    </div>
  );
}
