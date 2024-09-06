import { useWeather } from '../../hooks/useWeather';
import { CityCard } from '../CityCard/CityCard';
import { CardList } from '../CardList/CardList';
import { CardListSkeleton, CityCardSkeleton, Error } from '../UI';
import { forecastStatus } from '../../utils/constants';
import styles from './main.module.css';

export const Main = () => {
  const { curCity, statusOfForecast, getCityWeather } = useWeather();

  return (
    <main className={styles.main}>
      {statusOfForecast === forecastStatus.isLoading ? (
        <>
          <CityCardSkeleton />
          <CardListSkeleton />
        </>
      ) : statusOfForecast === forecastStatus.isError ? (
        <Error
          className={styles.error}
          callback={() => getCityWeather(curCity)}
          withTitle
          withDescr
        />
      ) : (
        <>
          <CityCard />
          <CardList />
        </>
      )}
    </main>
  );
};
