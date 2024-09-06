import {
  CartIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClearIcon,
  HeartFilled,
  HeartOutlined,
  SearchIcon,
} from '../UI';
import createImg from '../../utils/createImg';
import { useTheme } from '../../hooks/useTheme';

export const Icon = ({
  icon = '',
  className = '',
  ext = 'svg',
  alt = 'Иконка',
  onClick,
  style,
  themeDependent
}) => {
  const { theme } = useTheme();

  switch (icon) {
    case 'chevron-left':
      return <ChevronLeftIcon className={className} />;

    case 'chevron-right':
      return <ChevronRightIcon className={className} />;

    case 'clear':
      return <ClearIcon className={className} />;

    case 'search':
      return <SearchIcon className={className} />;

    case 'cart':
      return <CartIcon className={className} />;

    case 'heart-filled':
      return <HeartFilled className={className} />;

    case 'heart-outlined':
      return <HeartOutlined className={className} />;

    case 'logo':
      const logoDesktop = require(`../../assets/${theme}-theme/logo.${ext}`);
      const logoTablet = require(`../../assets/${theme}-theme/logo-tablet.${ext}`);
      const logoMobile = require(`../../assets/${theme}-theme/logo-mobile.${ext}`);

      return (
        <picture>
          <source srcSet={logoMobile} media="(max-width: 767px)" />
          <source srcSet={logoTablet} media="(max-width: 1023px)" />
          <img src={logoDesktop} alt="WeatherApp" />
        </picture>
      )

    default:
      const src = require(`../../assets/${themeDependent ? `${theme}-theme/` : ""}${icon}.${ext}`);

      if (!src) return '';

      return createImg({ src, className, alt, onClick, style });
  }
};
