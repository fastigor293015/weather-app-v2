import { useWeather } from "../../hooks/useWeather";
import { WeatherCard } from "../UI/WeatherCard/WeatherCard";
import styles from "./favorites.module.css";

export const Favorites = () => {
  const { favorites } = useWeather();

  if (!favorites.length) return null;

  return (
    <section className={styles.content}>
      <header className={styles.header}>
        <h2 className={styles.title}>Избранные</h2>
        <div className={styles.counter}>{favorites.length}/5</div>
      </header>
      <ul className={styles.list}>
        {favorites.map((city) => (
          <li key={city.correctCityName}>
            <WeatherCard city={city} />
          </li>
        ))}
      </ul>
    </section>
  )
}