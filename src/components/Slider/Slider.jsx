import styles from './slider.module.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Error, TabBar } from '../UI';
import { Icon } from '../Icon/Icon';
import { statisticDayData, statisticWeekData } from './mock';
import { useWeather } from '../../hooks/useWeather';
import { Button } from '../UI/Button/Button';
import { SlideSkeleton } from '../UI';
import { clsx } from '../../utils';
import { forecastStatus } from '../../utils/constants';

const tabList = [
  {
    text: 'на 24 часа',
    aria: 'Недельный прогноз',
  },
  {
    text: 'на 5 дней',
    aria: 'Почасовой прогноз',
  },
];

const initialSliders = [statisticDayData, statisticWeekData];

export const Slider = () => {
  const [toggleTab, setToggleTab] = useState(0);
  const [sliders, setSliders] = useState(initialSliders);
  const [slider, setSlider] = useState(sliders[toggleTab]);
  const [sliderSizes, setSliderSizes] = useState({});
  const [sliderFirstCard, setSliderFirstCard] = useState(0);
  const [sliderMargin, setSliderMargin] = useState(0);
  const [maskImage, setMaskImage] = useState('none');
  const { curCity, statusOfForecast, weatherHours, weatherDays, getCityWeather } = useWeather();

  const sliderListRef = useRef(null);
  const sliderFirstItemRef = useRef(null);

  const handleToggleTab = (index) => {
    setToggleTab(index);
  };

  const getRemainRight = useCallback(() => {
    const { listWidth, listGap, itemWidth } = sliderSizes;
    return (
      (slider.length - sliderFirstCard) * (itemWidth + listGap) -
      listGap -
      listWidth
    );
  }, [slider.length, sliderFirstCard, sliderSizes]);

  const handleMoveSlider = (isLeft) => {
    const { listGap, itemWidth } = sliderSizes;
    if (isLeft) {
      if (sliderMargin <= 0) return;
      setSliderMargin((sliderFirstCard - 1) * (itemWidth + listGap));
      setSliderFirstCard(sliderFirstCard - 1);
    } else {
      const rightRemain = getRemainRight();
      if (rightRemain < itemWidth) {
        if (rightRemain <= 0) return;
        setSliderMargin(sliderMargin + rightRemain);
      } else {
        setSliderMargin((sliderFirstCard + 1) * (itemWidth + listGap));
      }
      setSliderFirstCard(sliderFirstCard + 1);
    }
  };

  const getSliderSizes = () => {
    const listElement = sliderListRef.current;
    let listWidth = 0;
    let listGap = 0;
    let itemWidth = 0;
    if (listElement) {
      listWidth = listElement.offsetWidth;
      listGap = +window
        .getComputedStyle(listElement)
        .getPropertyValue('--gap')
        .replace(/\D/g, '');
    }
    if (sliderFirstItemRef.current)
      itemWidth = sliderFirstItemRef.current.offsetWidth;
    setSliderSizes({ listWidth, listGap, itemWidth });
  };

  useEffect(() => {
    setSlider(sliders[toggleTab]);
    setSliderFirstCard(0);
    setSliderMargin(0);
    getSliderSizes();
  }, [sliders, toggleTab, statusOfForecast]);

  useEffect(() => {
    if (weatherHours && weatherDays) {
      setSliders([weatherHours, weatherDays]);
    }
  }, [weatherHours, weatherDays]);

  useEffect(() => {
    getSliderSizes();

    const handleResize = () => {
      getSliderSizes();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const itemFullLength = sliderSizes.itemWidth + sliderSizes.listGap;
    const remain = getRemainRight();
    if (remain !== undefined && remain < 0) {
      setSliderFirstCard(sliderFirstCard + Math.floor(remain / itemFullLength));
      setSliderMargin(sliderMargin - remain);
    } else setSliderMargin(sliderFirstCard * itemFullLength);
    // eslint-disable-next-line
  }, [sliderSizes]);

  useEffect(() => {
    const remainRight = getRemainRight();
    let mask = 'none';
    if (sliderMargin > 0 && remainRight > 0)
      mask =
        'linear-gradient(90deg, transparent 0%, #000 5%, #000 95%, transparent 100%)';
    else if (sliderMargin > 0)
      mask = 'linear-gradient(90deg, transparent 0%, #000 5%)';
    else if (remainRight > 0)
      mask = 'linear-gradient(90deg, #000 95%, transparent 100%)';

    setMaskImage(mask);
  }, [
    sliderMargin,
    sliderSizes.listWidth,
    sliderSizes.listGap,
    sliderSizes.itemWidth,
    slider.length,
    sliderFirstCard,
    getRemainRight,
  ]);

  return (
    <section className={styles.block}>
      <div className={styles.header}>
        <h2 className={styles.title}>Прогноз:</h2>
        <TabBar
          list={tabList}
          handleToggleTab={handleToggleTab}
          activeTab={toggleTab}
          disabled={statusOfForecast === forecastStatus.isLoading}
        />
      </div>

      {statusOfForecast === forecastStatus.isError ? (
        <Error
          className={styles.error}
          callback={() => getCityWeather(curCity)}
        />
      ) : (
        <div className={styles.slider}>
          <Button
            className={styles.navBtn}
            onClick={() => {
              handleMoveSlider(true);
            }}
            disabled={sliderMargin <= 0 || statusOfForecast === forecastStatus.isLoading}
          >
            <Icon icon='chevron-left' />
          </Button>
          <ul
            className={styles.list}
            ref={sliderListRef}
            style={{ maskImage: maskImage, WebkitMaskImage: maskImage }}
          >
            {statusOfForecast === forecastStatus.isLoading ? Array.from({ length: 8 }).map((_, index) => (
              <SlideSkeleton key={index} />
            )) : slider.map((item, index) => (
              <li
                key={`${item.time}-${index}`}
                className={clsx(styles.item, toggleTab && styles.itemWeek)}
                ref={index === 0 ? sliderFirstItemRef : null}
                style={{
                  marginLeft: index
                    ? 0
                    : sliderMargin !== undefined && !isNaN(sliderMargin)
                      ? -sliderMargin
                      : 0,
                }}
              >
                <span className={clsx(styles.text, styles.date)}>
                  {item.time}
                </span>
                <Icon
                  icon={item.icon}
                  className={styles.icon}
                  alt='Иконка погоды'
                />
                {item.temp ? (
                  <span className={styles.text}>{item.temp}</span>
                ) : (
                  <span className={styles.text}>
                    от {item.minTemp} до {item.maxTemp}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <Button
            className={styles.navBtn}
            onClick={() => {
              handleMoveSlider(false);
            }}
            disabled={getRemainRight() <= 0 || statusOfForecast === forecastStatus.isLoading}
          >
            <Icon icon='chevron-right' />
          </Button>
        </div>
      )}
    </section>
  );
};
