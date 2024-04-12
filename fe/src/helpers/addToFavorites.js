export const addToFavorites = (productId) => {
  const favorites = localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : [];

  favorites.push(productId);
  localStorage.setItem("favorites", JSON.stringify(favorites));
};
