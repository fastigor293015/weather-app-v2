import { lsKeys } from "./constants";

export const recordFavorites = (cityData, favorites) => {
  const isLiked = !!favorites.find((item) => item.correctCityName === cityData.correctCityName);
  if (!isLiked && favorites.length >= 5) return;
  favorites = isLiked ? favorites.filter((item) => item.correctCityName !== cityData.correctCityName) : [cityData, ...favorites];
  localStorage.setItem(lsKeys.favorites, JSON.stringify(favorites));

  return favorites;
}