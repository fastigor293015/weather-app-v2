import { useMemo } from "react";
import { useTheme } from "./useTheme";

export const useWeatherBgImage = (iconCode) => {
  const { theme } = useTheme();
  const weatherImgUrl = useMemo(() => `/images/weather/${theme}-theme/`, [theme]);

  const images = useMemo(() => ({
    "01d": "clear-sky.jpg",
    "01n": "clear-sky.jpg",
    "02d": "few-clouds.jpg",
    "02n": "few-clouds.jpg",
    "03d": "scattered-clouds.jpg",
    "03n": "scattered-clouds.jpg",
    "04d": "broken-clouds.jpg",
    "04n": "broken-clouds.jpg",
    "09d": "shower-rain.jpg",
    "09n": "shower-rain.jpg",
    "10d": "rain.jpg",
    "10n": "rain.jpg",
    "11d": "thunderstorm.jpg",
    "11n": "thunderstorm.jpg",
    "13d": "snow.jpg",
    "13n": "snow.jpg",
    "50d": "mist.jpg",
    "50n": "mist.jpg",
  }), []);

  const imgTitle = useMemo(() => images[iconCode], [iconCode, images]);

  if (!imgTitle) return null;

  return weatherImgUrl + imgTitle;
}