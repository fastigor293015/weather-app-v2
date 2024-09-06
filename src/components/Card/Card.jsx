import styles from './card.module.css';
import { useWeather } from '../../hooks/useWeather';
import { locationStatus, searchStatus } from '../../utils/constants';

export const Card = ({ children }) => {
  const { statusOfSearch, statusOfLocation } = useWeather();

  return (
    <div
      className={styles.container}
      data-isdrop={
        statusOfSearch > searchStatus.isClosedDrop || statusOfLocation > locationStatus.isClosedDrop ? 'true' : 'false'
      }
    >
      {children}
    </div>
  );
};
