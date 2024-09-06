import { useState } from 'react';
import { useEffect } from 'react';
import styles from './App.module.css';
import { Header, Layout, Card, Main, Footer, Slider } from './components';
import { useWeather } from './hooks/useWeather';
import { locationStatus, searchStatus } from './utils/constants';
import { useWeatherBgImage } from './hooks/useWeatherBgImage';

function App() {
  const { curCity, statusOfSearch, statusOfLocation, getCityWeather, weatherMain } = useWeather();
  const bgImage = useWeatherBgImage(weatherMain?.icon);

  const [overflow, setOverFlow] = useState(false)

  useEffect(() => {
    getCityWeather(curCity);
  }, []);

  useEffect(() => {
    setOverFlow(statusOfSearch > searchStatus.isClosedDrop || statusOfLocation > locationStatus.isClosedDrop ? true : false);
  }, [statusOfSearch, statusOfLocation]);

  return (
    <Layout overflow={overflow} bgImage={bgImage}>
      <Card >
        <Header />
        <div
          className={styles.content}
          data-isdrop={
            statusOfSearch > searchStatus.isClosedDrop || statusOfLocation > locationStatus.isClosedDrop ? 'true' : 'false'
          }
        >
          <Main />
          <Slider />
          <Footer />
        </div>
      </Card>
    </Layout>
  );
}

export default App;
