import { Icon } from '../../Icon/Icon';
import { clsx } from '../../../utils';
import styles from './logo.module.css';

export const Logo = ({ className }) => {

  return (
    <a href="/" className={clsx(styles.logo, className)}>
      <Icon icon="logo" />
    </a>
  );
};
