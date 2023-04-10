import styles from './button.module.css';

export type ButtonVariantType = 'Success' | 'Info' | 'Warning';

export interface ButtonProps {
  text: string;
  onClick: () => void;

  variant?: ButtonVariantType;
}

export default function Button({
  text,
  onClick,
  variant = 'Info'
}: ButtonProps) {
  const variantStyle = styles[variant];

  return (
    <button className={`${styles.btn} ${variantStyle}`} onClick={onClick}>
      <div className={styles.inner}>{text}</div>
    </button>
  );
}
