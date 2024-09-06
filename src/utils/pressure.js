export function pressure(pressure = 1013) {

  const divinder = 0.750062;
  const pressure__rt = (pressure * divinder).toFixed();
  let percent = 0;
  let pressure__feels_like = '';

  if (pressure__rt >= '740' && pressure__rt <= '760') {
    pressure__feels_like = 'Нормальное'
  }
  if (pressure__rt > '760') {
    pressure__feels_like = 'Повышенное'
  }
  if (pressure__rt < '740') {
    pressure__feels_like = 'Пониженное'
  }

  if (pressure__rt > 800) {
    percent = 100
  }
  if (pressure__rt < 700) {
    percent = 0
  }
  if (pressure__rt <= 800 && pressure__rt >= 700) {
    percent = pressure__rt - 700
  }

  return {
    pressure__rt,
    pressure__feels_like,
    percent
  }
}