import "./Card.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

export const Card = (props) => {
  const { src, name, price, _id } = props;
  const session = localStorage.getItem("auth");
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    if (session) {
      setIsFavorite(!isFavorite);
      if (isFavorite) {
        removeFromFavorites(_id);
      } else {
        addToFavorites(_id);
      }
    }

    navigate("/login");
  };

  const addToFavorites = (productId) => {
    const favorites = localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : [];

    favorites.push(productId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const removeFromFavorites = (productId) => {
    const favorites = localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : [];

    const updatedFavorites = favorites.filter((id) => id !== productId);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const favorites = localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : [];
    setIsFavorite(favorites.includes(_id));
  }, [_id]);

  return (
    <div className="d-flex col flex-wrap" id={_id}>
      <button
        onClick={(e) => handleFavorite(e)}
        className={
          isFavorite
            ? "border-0 bg-transparent p-0 m-0 d-flex w-100 fav-btn favorite"
            : "border-0 bg-transparent p-0 m-0 d-flex w-100 fav-btn"
        }
      >
        <ion-icon name={isFavorite ? "heart" : "heart-empty"}></ion-icon>
      </button>
      <Link to={`/details/${_id}`} className="sneaker-card">
        <img src={src} alt="Product" className="card-image p-5" />
        <div className="p-3">
          <h3 className="card-title">{name}</h3>
          <span className="card-price">${price}</span>
        </div>
      </Link>
    </div>
  );
};
