export const removeFromFavorites = (productId) => {
  const favorites = localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : [];

  const updatedFavorites = favorites.filter((id) => id !== productId);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};
