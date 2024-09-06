import { useEffect, useState } from "react";
import { useWeather } from "../../../hooks/useWeather";
import { HeartFilled } from "../icons/HeartFilled";
import { HeartOutlined } from "../icons/HeartOutlined";
import { clsx, getTime } from "../../../utils";
import { WeatherCardSkeleton } from "../skeletons/WeatherCardSkeleton/WeatherCardSkeleton";
import { forecastStatus } from "../../../utils/constants";
import { Error } from "../Error/Error";
import styles from "./weathercard.module.css";
import { useWeatherBgImage } from "../../../hooks/useWeatherBgImage";

export const WeatherCard = ({ city, withLikeBtn = true, isClickable = true }) => {
  const { getCityWeather, favorites, onLike } = useWeather();
  const [weatherData, setWeatherData] = useState(null);
  const bgImage = useWeatherBgImage(weatherData?.icon);
  const [status, setStatus] = useState(forecastStatus.isFulfilled);

  const isLiked = favorites.find((item) => item?.correctCityName === city?.correctCityName);
  const disabled = !isLiked && favorites.length >= 5;

  const getWeather = async () => {
    try {
      setStatus(forecastStatus.isLoading);
      const { newWeatherMain: data } = await getCityWeather(city, false);
      setWeatherData(data);
      setStatus(forecastStatus.isFulfilled);
    } catch (err) {
      console.log(err.message);
      setStatus(forecastStatus.isError);
    }
  }

  useEffect(() => {
    getWeather();
  }, []);

  const onClick = () => {
    getCityWeather(city);
  }

  const handleLike = (e) => {
    e.stopPropagation();
    onLike(city);
  }

  if (status === forecastStatus.isError) return (
    <Error
      className={styles.error}
      callback={getWeather}
      withTitle
      withDescr
      withBg
      fontColor="black"
      textAlign="left"
    />
  )

  if (status === forecastStatus.isLoading) return <WeatherCardSkeleton />

  return (
    <div
      className={clsx(styles.queryItem, !isClickable && styles.notClickable)}
      onClick={onClick}
      tabIndex={0}
      style={{
        "--weather-card-image": `url(${bgImage})`
      }}
    >

      <div className={styles.cityInfo}>
        <div className={styles.top}>
          <h3 className={styles.name}>
            {weatherData?.name || "Москва"}
          </h3>
          <span className={styles.temp}>
            {(weatherData?.temp || 11.28).toFixed()}°
          </span>
        </div>
        <div className={styles.bottom}>
          <time dateTime={new Date(weatherData?.date || 1716526126).toISOString()}>{getTime(weatherData?.date || 1716526126, weatherData?.timezone || 10800).time}</time>
          <p className={styles.descr}>
            {weatherData?.weather_descr || "ясно"}
          </p>
        </div>
      </div>
      {withLikeBtn && (
        <button
          type='button'
          className={styles.likeBtn}
          onClick={handleLike}
          disabled={disabled}
          aria-label={isLiked ? "Убрать из избранного" : "Добавить в избранное"}
        >
          {isLiked ? <HeartFilled /> : <HeartOutlined />}
        </button>
      )}
    </div>
  )
}