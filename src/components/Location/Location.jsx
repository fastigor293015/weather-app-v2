import { useEffect, useState } from "react";
import { useOutsideClickObserver } from "../../hooks/useOutsideClickObserver";
import { useWeather } from "../../hooks/useWeather";
import { Button, LocationIcon, WeatherCard, WeatherCardSkeleton } from "../UI";
import { locationStatus, lsKeys, searchStatus } from "../../utils/constants";
import { clsx } from "../../utils";
import styles from "./location.module.css";
import inputStyles from '../UI/Input/input.module.css';

const Finding = () => {
  return (
    <>
      <h2 className={styles.heading}>
        Определяем геолокацию...
      </h2>
      <WeatherCardSkeleton />
    </>
  )
}

const SearchResult = ({ position, inputRef }) => {
  const { setStatusOfLocation, setStatusOfSearch, getCityWeather } = useWeather();

  const onConfirm = () => {
    setStatusOfLocation(locationStatus.isClosedDrop);
    localStorage.setItem(lsKeys.curLocation, JSON.stringify(position));
    getCityWeather(position);
  }

  const onCancel = (e) => {
    e.stopPropagation();
    setStatusOfLocation(locationStatus.isClosedDrop);
    setStatusOfSearch(searchStatus.isOpenedDrop);
    inputRef.current?.focus();
  }

  return (
    <>
      <h2 className={styles.heading}>
        Вы находитесь в этом городе?
      </h2>
      <WeatherCard city={position} withLikeBtn={false} isClickable={false} />
      <div className={styles.btnsContainer}>
        <Button btnType="secondary" onClick={onCancel}>
          Нет
        </Button>
        <Button onClick={onConfirm}>
          Да
        </Button>
      </div>
    </>
  )
}

const ErrorMessage = () => {
  return (
    <>
      <h2 className={styles.heading}>
        Местоположение не определено
      </h2>
      <p className={styles.text}>
        К сожалению, не удалось определить вашу геопозицию.
      </p>
      <p className={styles.text}>
        Воспользуйтесь поиском или попробуйте еще раз позднее.
      </p>
    </>
  )
}

export const Location = ({ inputRef }) => {
  const { statusOfLocation, setStatusOfLocation, setStatusOfSearch } = useWeather();
  const [position, setPosition] = useState(null);
  const dropRef = useOutsideClickObserver(() => {
    setStatusOfLocation(locationStatus.isClosedDrop);
  });

  useEffect(() => {
    if (statusOfLocation === locationStatus.isClosedDrop || position) return;
    setStatusOfLocation(locationStatus.isLoading);
    navigator.geolocation.getCurrentPosition(pos => {
      setPosition({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      });
      setStatusOfLocation(locationStatus.isFulfilled);
    }, error => {
      console.log(error.message);
      setStatusOfLocation(locationStatus.isError);
    })
  }, [statusOfLocation, setStatusOfLocation, position]);

  return (
    <>
      <Button className={clsx(styles.locationBtn, statusOfLocation === locationStatus.isLoading && styles.isLoading)} onClick={(e) => {
        e.stopPropagation();
        setStatusOfLocation((prev) => prev > locationStatus.isClosedDrop ? prev : locationStatus.isOpenedDrop);
        setStatusOfSearch(searchStatus.isClosedDrop);
      }}>
        <LocationIcon />
      </Button>
      {statusOfLocation > locationStatus.isClosedDrop && (
        <dialog
          open={statusOfLocation > locationStatus.isClosedDrop}
          className={clsx(inputStyles.input, styles.dropdown)}
          ref={dropRef}
        >
          <div className={styles.dropdownContainer}>
            {statusOfLocation === locationStatus.isLoading && <Finding />}
            {(statusOfLocation === locationStatus.isFulfilled || statusOfLocation === locationStatus.isOpenedDrop) && <SearchResult position={position} inputRef={inputRef} />}
            {statusOfLocation === locationStatus.isError && <ErrorMessage />}
          </div>
        </dialog>
      )}
    </>
  )
}