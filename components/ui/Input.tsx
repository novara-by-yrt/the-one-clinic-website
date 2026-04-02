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
  if (props.multiline) {
    // Destructure custom props out so only valid HTML attrs are spread
    const { label, theme = 'light', id, className, multiline: _m, rows, ...htmlProps } = props;

    const fieldCls = [styles.field, styles[theme], styles.textarea, className]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={id} className={`${styles.label} ${styles[theme]}`}>
            {label}
          </label>
        )}
        <textarea id={id} className={fieldCls} rows={rows ?? 4} {...htmlProps} />
      </div>
    );
  }

  const { label, theme = 'light', id, className, multiline: _m, ...htmlProps } = props;

  const fieldCls = [styles.field, styles[theme], className].filter(Boolean).join(' ');

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={`${styles.label} ${styles[theme]}`}>
          {label}
        </label>
      )}
      <input id={id} className={fieldCls} {...htmlProps} />
    </div>
  );
}
