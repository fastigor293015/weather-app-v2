import { useContext } from 'react';
import { WeatherContext } from '../providers/Weather';

export const useWeather = () => useContext(WeatherContext);
