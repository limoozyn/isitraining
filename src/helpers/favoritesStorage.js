const favorites = "favorites";
const get = () => {
  const favoritesStr = localStorage.getItem(favorites);
  const parsedFavorites = favoritesStr ? JSON.parse(favoritesStr) : [];
  return parsedFavorites;
};
const add = (city) => {
  const parsedFavoriteCities = get();
  const presents = parsedFavoriteCities.filter((c) => c.Key === city.Key);
  if (!presents.length) {
    localStorage.setItem(favorites, JSON.stringify([...parsedFavoriteCities, city]));
  }
};

const remove = (city) => {
  const parsedFavoriteCities = get();
  if (!parsedFavoriteCities.length) return;
  localStorage.setItem(favorites, JSON.stringify(parsedFavoriteCities.filter((el) => el.Key !== city.Key)));
};

export default {get, add, remove};
