import { useEffect, useRef, useState } from 'react';

import { useWeather } from '../../hooks/useWeather';
import { useDebounce } from '../../hooks/useDebounce';
import { Input } from '../UI';
import { Dropdown, Icon } from '../';
import { locationStatus, searchStatus } from '../../utils/constants';
import { Location } from '../Location/Location';
import { clsx, validateInputValue } from '../../utils';
import styles from './weatherSearch.module.css';

export const WeatherSearch = ({ className }) => {
  const [value, setValue] = useState('');
  const [autocompleteItems, setAutocompleteItems] = useState([]);
  const [cityData, setCityData] = useState(null);
  const inputRef = useRef(null);
  const { getCityByName, getCitiesByName, statusOfSearch, setStatusOfSearch, setStatusOfLocation } = useWeather();

  // useEffect(() => {
  //   Object.keys(searchStatus).map((key) => {
  //     if (searchStatus[key] && statusOfSearch && searchStatus[key] === statusOfSearch) console.log(key);
  //     return key;
  //   });
  // }, [statusOfSearch]);

  const debouncedValue = useDebounce(value, 1000);

  useEffect(() => {
    if (value.length >= 3) {
      setStatusOfSearch(searchStatus.isAutocompleteShown);
    } else {
      setStatusOfSearch(searchStatus.isOpenedDrop);
    }
  }, [value]);

  useEffect(() => {
    if (debouncedValue.length >= 3) {
      getCitiesByName(debouncedValue).then((citiesList) => {
        setAutocompleteItems(citiesList);
      });
    }
  }, [debouncedValue]);

  const onChange = (e) => {
    setValue((prev) => validateInputValue(e.target.value) ? e.target.value : prev);
  }
  const onClear = () => {
    setValue('');
  };

  const onChoosingCityFromList = (e) => {
    e.stopPropagation();
    setStatusOfSearch(prev => prev < searchStatus.isOpenedDrop ? searchStatus.isOpenedDrop : prev);
    setStatusOfLocation(locationStatus.isClosedDrop);
    inputRef.current?.focus();
  };

  const onSearchEnteredCity = async (e) => {
    e.preventDefault();
    if (value) {
      setCityData(await getCityByName(value));
    }
  };

  return (
    <form className={clsx(styles.form, className)} onSubmit={onSearchEnteredCity}>
      <Input
        ref={inputRef}
        className={styles.input}
        onChange={onChange}
        onClick={onChoosingCityFromList}
        value={value}
        placeholder='Поиск по городу'
      >
        {value ? (
          <button
            onClick={onClear}
            type='button'
            className={styles.iconButton}
          >
            <Icon icon='clear' className={styles.icon} />
          </button>
        ) : (
          <Icon icon='search' className={styles.icon} />
        )}
      </Input>
      {statusOfSearch > searchStatus.isClosedDrop && (
        <Dropdown cityData={cityData} setCityData={setCityData} inputValue={value} autocompleteItems={autocompleteItems} />
      )}
      {<Location inputRef={inputRef} />}
    </form>
  );
};
