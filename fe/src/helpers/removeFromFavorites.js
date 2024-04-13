import { jwtDecode } from "jwt-decode";
import { updateFavorites } from "./updateFavorites";

export const removeFromFavorites = (productId) => {
  const session = localStorage.getItem("auth");
  const decodedSession = jwtDecode(session);
  const favorites = localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : [];

  const filteredFavorites = favorites.filter((id) => id !== productId);
  localStorage.setItem("favorites", JSON.stringify(filteredFavorites));
  const updatedFavorites = JSON.parse(localStorage.getItem("favorites"));
  updateFavorites(updatedFavorites, decodedSession.email);
};
