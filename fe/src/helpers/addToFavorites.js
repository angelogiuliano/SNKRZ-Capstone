import { jwtDecode } from "jwt-decode";
import { updateFavorites } from "./updateFavorites";

export const addToFavorites = (productId) => {
  const session = localStorage.getItem("auth");
  const decodedSession = jwtDecode(session);
  const favorites = localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : [];

  favorites.push(productId);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  const updatedFavorites = JSON.parse(localStorage.getItem("favorites"));
  updateFavorites(updatedFavorites, decodedSession.email);
};
