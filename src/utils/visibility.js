export function visibility(visibility = 10000) {

  let percent = 100 * visibility / 10000;
  let visibilityMeasure = 'км';
  let value = (visibility / 1000).toFixed();
  let valueDescr = 'Нормальная';

  if (value < 3) {
    valueDescr = 'Пониженная'
  }

  if (value < 0.1) {
    visibilityMeasure = 'м';
    value = visibility;
    valueDescr = 'Слабая'
  }

  return {
    visibilityMeasure,
    percent,
    value,
    valueDescr
  }
}