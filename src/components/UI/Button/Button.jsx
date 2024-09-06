import { clsx } from '../../../utils';
import styles from './button.module.css';

export const Button = ({ type = "button", btnType = "primary", className, children, onClick, disabled }) => {
  return (
    <button type={type} className={clsx(styles.btn, btnType === "secondary" && styles.secondary, className)} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
