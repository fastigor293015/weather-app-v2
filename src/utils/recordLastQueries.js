import { lsKeys } from "./constants";

export const recordLastQueries = (newCity, lastQueries) => {
  const updatedHistory = [newCity, ...lastQueries.filter((item) => item.correctCityName !== newCity.correctCityName).slice(0, 4)];
  localStorage.setItem(lsKeys.lastQueries, JSON.stringify(updatedHistory));

  return updatedHistory;
}