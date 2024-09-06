import { createContext, useState } from 'react';
import { forecastStatus, locationStatus, lsKeys, searchStatus } from '../utils/constants';
import { recordLastQueries, getTime, recordFavorites } from '../utils';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherMain, setWeatherMain] = useState(null);
  const [weatherCard, setWeatherCard] = useState(null);
  const [weatherHours, setWeatherHours] = useState(null);
  const [weatherDays, setWeatherDays] = useState(null);
  const [curCity, setCurCity] = useState(
    JSON.parse(localStorage.getItem(lsKeys.curLocation)) || {
      lat: "55.625578",
      lon: "37.6063916",
      correctCityName: "Москва"
    });
  const [statusOfSearch, setStatusOfSearch] = useState(
    searchStatus.isClosedDrop
  );
  const [statusOfForecast, setStatusOfForecast] = useState(
    forecastStatus.isFulfilled
  );
  const [statusOfLocation, setStatusOfLocation] = useState(
    locationStatus.isClosedDrop
  );
  const [lastQueries, setLastQueries] = useState(
    JSON.parse(localStorage.getItem(lsKeys.lastQueries)) || []
  );
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem(lsKeys.favorites)) || []
  );

  const getCitiesByName = async (cityName) => {
    try {
      const citiesResponse = await fetch(
        `https://nominatim.openstreetmap.org/search.php?q=${cityName}&format=jsonv2`,
        {
          headers: {
            'Accept-Language': 'ru',
          },
        }
      );
      if (!citiesResponse?.ok) throw new Error('error');
      const citiesData = await citiesResponse.json();

      return citiesData.map((item) => ({
        lat: item.lat,
        lon: item.lon,
        correctCityName: item.name,
      }));
    } catch (err) {
      console.log(err.message);
    }
  }

  const getCityByName = async (cityName) => {
    setStatusOfSearch(searchStatus.isLoading);
    try {
      const cityResponse = await fetch(
        `https://nominatim.openstreetmap.org/search.php?q=${cityName}&format=json&addressdetails=1&limit=1`,
        {
          headers: {
            'Accept-Language': 'ru',
          },
        }
      );
      if (!cityResponse?.ok) throw new Error('error');
      const cityData = await cityResponse.json();
      if (cityData.length === 0) {
        setStatusOfSearch(searchStatus.isNotFound);
        return null;
      }

      setStatusOfSearch(searchStatus.isFound);
      return {
        lat: cityData[0].lat,
        lon: cityData[0].lon,
        correctCityName: cityData[0].display_name.split(',')[0],
      };
    } catch (error) {
      setStatusOfSearch(searchStatus.isError);
    }
  };

  const getCityWeather = async (city, withForecast = true) => {
    try {
      if (withForecast) {
        setStatusOfForecast(forecastStatus.isLoading);
        setStatusOfSearch(searchStatus.isClosedDrop);
      }
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric&lang=ru`
      );
      if (!weatherResponse?.ok) throw new Error('error');
      const weatherData = await weatherResponse.json();
      const correctCityName = city?.correctCityName || weatherData.name;
      const newWeatherMain = {
        name: correctCityName,
        date: Date.now() / 1000,
        id: weatherData.id,
        temp: weatherData.main.temp,
        temp_feels: weatherData.main.feels_like,
        weather_descr: weatherData.weather[0].description,
        icon: weatherData.weather[0].icon,
        timezone: weatherData.timezone,
        lat: city?.lat,
        lon: city?.lon
      };

      const newWeatherCard = {
        pressure: weatherData.main.pressure,
        humidity: weatherData.main.humidity,
        visibility: weatherData.visibility,
        wind: {
          speed: weatherData.wind.speed,
          deg: weatherData.wind.deg
        },
        sunset: weatherData.sys.sunset,
        sunrise: weatherData.sys.sunrise,
        timezone: weatherData.timezone,
      };

      if (withForecast) {
        setWeatherMain(newWeatherMain);
        setWeatherCard(newWeatherCard)

        await getWeatherItems(city);

        setLastQueries(recordLastQueries({ correctCityName, lat: city.lat, lon: city.lon }, lastQueries));
      }

      return {
        newWeatherMain,
        newWeatherCard
      };
    } catch (err) {
      if (withForecast) {
        setStatusOfForecast(forecastStatus.isError);
      } else {
        throw new Error('Отсутствует связь со сторонним сервисом');
      }
    }
  };


  const getWeatherItems = async ({ lat, lon, correctCityName }) => {

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ru`
      );

      if (!response?.ok) throw new Error('error');
      const weatherData = await response.json();

      const timezone = weatherData.city.timezone;
      const hours = weatherData.list.slice(0, 8);
      const parseHours = [];
      const parseDays = [];
      const days = {};
      const { date: curDate } = getTime(Date.now() / 1000, timezone);

      weatherData.list.map(el => {

        const { date: key } = getTime(el.dt, timezone);
        if (key === curDate) return el;

        const curTemp = {
          date: el.dt,
          icon: el.weather[0].icon,
          minTemp: el.main.temp_min,
          maxTemp: el.main.temp_max
        };

        if (!days[key]) {
          days[key] = curTemp;
        }
        else {

          if (curTemp.minTemp < days[key].minTemp) {
            days[key].minTemp = curTemp.minTemp;
          }

          if (curTemp.maxTemp > days[key].maxTemp) {
            days[key].maxTemp = curTemp.maxTemp;
          }
        }
        return el;
      });



      for (const key in days) {
        if (Object.hasOwnProperty.call(days, key)) {
          const element = days[key];

          parseDays.push({
            time: getTime(element.date, timezone, "short").date,
            icon: element.icon,
            minTemp: `${Math.round(element.minTemp)}°`,
            maxTemp: `${Math.round(element.maxTemp)}°`,
          });
        }
      }

      hours.map(el => {
        parseHours.push({
          time: getTime(el.dt, timezone).time,
          icon: el.weather[0].icon,
          temp: `${Math.round(el.main.temp)}°`,
        });
        return el;
      });

      setWeatherHours(parseHours);
      setWeatherDays(parseDays);
      setStatusOfForecast(forecastStatus.isFulfilled);
      setCurCity({
        lat,
        lon,
        correctCityName
      });
    } catch (error) {
      setStatusOfForecast(forecastStatus.isError);
      console.log('Отсутствует связь со сторонним сервисом');
    }

  }

  const onLike = (cityData) => {
    setFavorites(recordFavorites(cityData, favorites));
  }

  const onHistoryClear = () => {
    localStorage.removeItem(lsKeys.lastQueries);
    setLastQueries([]);
  };

  return (
    <WeatherContext.Provider
      value={{
        curCity,
        weatherHours,
        weatherDays,
        weatherMain,
        weatherCard,
        statusOfSearch,
        setStatusOfSearch,
        statusOfForecast,
        statusOfLocation,
        setStatusOfLocation,
        lastQueries,
        getCityByName,
        getCitiesByName,
        getCityWeather,
        setLastQueries,
        onHistoryClear,
        favorites,
        onLike
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
