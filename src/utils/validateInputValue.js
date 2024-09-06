export function validateInputValue(str) {
  const regex = /^[а-яА-ЯёЁ0-9 \-]+$/;
  if (!str.length) {
    return true
  }

  if (regex.test(str)) {
    return true
  } else {
    return false
  }
}