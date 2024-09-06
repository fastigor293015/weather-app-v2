import { useWeather } from '../../hooks/useWeather';
import { getTime } from '../../utils';
import { Icon } from '../Icon/Icon';
import styles from './cityCard.module.css';

export const CityCard = () => {
  const { weatherMain } = useWeather();

  return (
    <section className={styles.hero}>
      <h2 className={styles.title}>{weatherMain?.name ?? 'Москва'}</h2>
      <span className={styles.day}>{weatherMain?.date ? `${getTime(weatherMain?.date, weatherMain?.timezone).date}` : 'Суббота, 06 января'}</span>
      <span className={styles.time}>{weatherMain?.date ? `${getTime(weatherMain?.date, weatherMain?.timezone).time}` : '11:28'}</span>
      <span className={styles.degree}><span className={styles.degreeCurrent}>{weatherMain?.temp.toFixed() ?? '10'}</span>
      </span>
      <div className={styles.weather}>
        <Icon icon={weatherMain?.icon ?? '04d'} className={styles.icon} alt='Иконка погоды' />
        <span className={styles.descr}>{weatherMain?.weather_descr ?? 'Облачно'}</span>
      </div>
      <span className={styles.feeling}>Ощущается как {weatherMain?.temp_feels.toFixed() ?? '10'}°</span>
    </section>
  );
};
