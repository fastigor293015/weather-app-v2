import { useWeather } from '../../hooks/useWeather';
import { pressure, visibility, getTime, windDirection } from '../../utils';
import { Icon } from '../Icon/Icon';
import { ProgressBar } from '../UI';
import styles from './cardList.module.css';

export const CardList = () => {
  const { weatherCard } = useWeather();
  return (
    <section className={styles.detail}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <h3 className={styles.title}>Влажность</h3>
          <Icon
            icon='humidity'
            alt='Влажность иконка'
            className={styles.icon}
            themeDependent
          />
          <span className={styles.data}>{weatherCard?.humidity ?? 75}%</span>
          <div className={styles.barWrapper}>
            <ProgressBar current={weatherCard?.humidity ?? 75} />
            <div
              className={`${styles.description} ${styles.descriptionBarVal}`}
            >
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </li>
        <li className={styles.item}>
          <h3 className={styles.title}>Давление</h3>
          <Icon icon='barometr' alt='Давление иконка' className={styles.icon} themeDependent />
          <span className={styles.data}>
            {pressure(weatherCard?.pressure).pressure__rt}
          </span>
          <div className={styles.barWrapper}>
            <ProgressBar
              type={'hight'}
              current={pressure(weatherCard?.pressure).percent}
            />
            <span className={styles.description}>
              {pressure(weatherCard?.pressure).pressure__feels_like}
            </span>
          </div>
        </li>
        <li className={styles.item}>
          <h3 className={styles.title}>Видимость</h3>
          <Icon
            icon='visibility'
            alt='Видимость иконка'
            className={styles.icon}
            themeDependent
          />
          <span className={styles.data}>
            {visibility(weatherCard?.visibility).value}{' '}
            {visibility(weatherCard?.visibility).visibilityMeasure}
          </span>
          <div className={styles.barWrapper}>
            <ProgressBar
              current={visibility(weatherCard?.visibility).percent}
            />
            <span className={styles.description}>
              {visibility(weatherCard?.visibility).valueDescr}
            </span>
          </div>
        </li>
        <li className={styles.item}>
          <h3 className={styles.title}>Рассвет</h3>
          <Icon icon='sunrise' alt='Рассвет иконка' className={styles.icon} themeDependent />
          <span className={styles.data}>
            {weatherCard?.sunrise
              ? getTime(weatherCard?.sunrise, weatherCard?.timezone, "short").time
              : '06:00'}
          </span>
          <span className={styles.description}>
            {weatherCard?.sunrise
              ? getTime(weatherCard?.sunrise, weatherCard?.timezone)
                .diffDescription
              : '06:00'}
          </span>
        </li>
        <li className={styles.item}>
          <h3 className={styles.title}>Закат</h3>
          <Icon icon='sunset' alt='Закат иконка' className={styles.icon} themeDependent />
          <span className={styles.data}>
            {weatherCard?.sunset
              ? getTime(weatherCard?.sunset, weatherCard?.timezone, "short").time
              : '19:00'}
          </span>
          <span className={styles.description}>
            {weatherCard?.sunset
              ? getTime(weatherCard?.sunset, weatherCard?.timezone)
                .diffDescription
              : '19:00'}
          </span>
        </li>
        <li className={styles.item}>
          <h3 className={styles.title}>Сила ветра</h3>
          <Icon
            icon='direction'
            alt='Сила ветра'
            className={`${styles.icon}`}
            style={{
              transform: `rotate(${windDirection(weatherCard?.wind.deg).rotation + 225
                }deg)`,
            }}
            themeDependent
          />
          <span className={styles.data}>
            {weatherCard?.wind.speed.toFixed() ?? 2} м/с
          </span>
          <span className={styles.description}>
            {windDirection(weatherCard?.wind.deg).direction}
          </span>
        </li>
      </ul>
    </section>
  );
};
