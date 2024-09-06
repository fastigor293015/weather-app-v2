import { Logo, Switch } from '../UI';
import { WeatherSearch } from '../';
import { useWeather } from '../../hooks/useWeather';
import { clsx } from '../../utils';
import { locationStatus, searchStatus } from '../../utils/constants';
import styles from './header.module.css';

export const Header = () => {
  const { statusOfSearch, statusOfLocation } = useWeather();

  return (
    <header className={styles.header}>
      <Logo className={clsx(styles.logo, (statusOfSearch > searchStatus.isClosedDrop || statusOfLocation > locationStatus.isClosedDrop) && styles.hidden)} />
      <div className={styles.headerRight}>
        <WeatherSearch className={styles.weatherSearch} />
        <Switch className={clsx(styles.themeSwitch, (statusOfSearch > searchStatus.isClosedDrop || statusOfLocation > locationStatus.isClosedDrop) && styles.hidden)} />
      </div>
    </header>
  );
};
