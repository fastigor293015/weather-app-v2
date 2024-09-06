import { useWeather } from '../../hooks/useWeather';
import { useOutsideClickObserver } from '../../hooks/useOutsideClickObserver';
import { Icon } from '../';
import { Favorites } from "../";
import { Error, WeatherCard, WeatherCardSkeleton } from '../UI';
import { clsx } from '../../utils';
import { searchStatus } from '../../utils/constants';
import styles from './dropdown.module.css';
import inputStyles from '../UI/Input/input.module.css';

const RecentlyWatched = () => {
  const { lastQueries, onHistoryClear } = useWeather();

  return (
    <>
      <Favorites />
      <section>
        <header className={styles.header}>
          <h2 className={styles.heading}>Недавно смотрели</h2>
          <button
            type='button'
            disabled={!lastQueries?.length}
            className={styles.cart}
            onClick={onHistoryClear}
          >
            <Icon icon='cart' />
          </button>
        </header>
        {lastQueries?.length ? (
          <ul className={styles.queriesList}>
            {lastQueries.map((city) => (
              <li key={city.correctCityName}>
                <WeatherCard city={city} />
              </li>
            ))}
          </ul>
        ) : <p className={styles.text}>История поиска пустая.</p>}
      </section>
    </>
  );
};

const Autocomplete = ({ items, setCityData, inputValue }) => {
  const { getCityByName } = useWeather();

  const printMarkedText = (str) => {
    const regex = new RegExp(inputValue, "g");
    return str.replace(regex, "%" + inputValue + "%").split("%").map((substr, index) => (
      <span key={index + substr} className={clsx(substr === inputValue && styles.highlighted)}>{substr}</span>
    ));
  }

  return (
    <>
      <header className={styles.header}>
        <h2 className={styles.heading}>Города по запросу</h2>
      </header>
      <ul className={styles.autocompleteList}>
        {items.map((item, index) => (
          <li key={item.place_id || index}>
            <button className={styles.autocompleteBtn} onClick={async (e) => {
              e.stopPropagation();
              setCityData(await getCityByName(item.correctCityName));
            }}>
              {printMarkedText(item.correctCityName)}
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

const SearchResult = ({ cityData }) => {
  return (
    <>
      <header className={styles.header}>
        <h2 className={styles.heading}>Результат поиска</h2>
      </header>
      <WeatherCard city={cityData} />
    </>
  );
};

const NotFound = () => (
  <>
    <header className={styles.header}>
      <h2 className={styles.heading}>Упс! Город не найден</h2>
    </header>
    <p className={styles.text}>Попробуйте другое название.</p>
  </>
);

const Finding = () => (
  <>
    <header className={styles.header}>
      <h2 className={styles.heading}>Ищем...</h2>
    </header>
    <WeatherCardSkeleton />
  </>
);

const ErrorMessage = ({ setCityData, inputValue }) => {
  const { getCityByName } = useWeather();

  const callback = async () => {
    if (inputValue) {
      setCityData(await getCityByName(inputValue));
    }
  }

  return (
    <>
      <header className={styles.header}>
        <h2 className={styles.heading}>Упс! Произошла ошибка</h2>
      </header>
      <Error
        withDescr
        textAlign='left'
        fontColor='black'
        callback={callback}
      />
    </>
  )
}

export const Dropdown = ({ cityData, setCityData, inputValue = "", autocompleteItems = [] }) => {
  const { statusOfSearch, setStatusOfSearch } = useWeather();
  const dropRef = useOutsideClickObserver(() => {
    setStatusOfSearch(searchStatus.isClosedDrop);
    setCityData(null);
  });

  return (
    <dialog
      open={statusOfSearch > searchStatus.isClosedDrop}
      className={clsx(inputStyles.input, styles.dropdown)}
      ref={dropRef}
    >
      <div className={styles.dropdownContainer}>
        {statusOfSearch === searchStatus.isOpenedDrop && <RecentlyWatched setCityData={setCityData} />}
        {statusOfSearch === searchStatus.isAutocompleteShown && <Autocomplete items={autocompleteItems} inputValue={inputValue} setCityData={setCityData} />}
        {statusOfSearch === searchStatus.isFound && <SearchResult cityData={cityData} />}
        {statusOfSearch === searchStatus.isNotFound && <NotFound />}
        {statusOfSearch === searchStatus.isLoading && <Finding />}
        {statusOfSearch === searchStatus.isError && <ErrorMessage inputValue={inputValue} setCityData={setCityData} />}
      </div>
    </dialog>
  );
};
