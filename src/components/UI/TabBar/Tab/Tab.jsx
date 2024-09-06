import { clsx } from '../../../../utils';
import styles from './tab.module.css';

export const Tab = ({ active = false, text = '', aria = '', onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(styles.block, active && styles.active)}
      disabled={disabled}
      tabIndex='0'
      aria-label={aria}
    >
      {text}
    </button>
  );
};
