import "./Card.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { addToFavorites } from "../../helpers/addToFavorites";
import { removeFromFavorites } from "../../helpers/removeFromFavorites";
import { jwtDecode } from "jwt-decode";

export const Card = (props) => {
  const { src, name, price, _id } = props;
  const session = localStorage.getItem("auth")
    ? localStorage.getItem("auth")
    : "";
  const decodedSession = session && jwtDecode(session);

  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(false);
  const favorites = localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : [];

  const handleFavorite = () => {
    if (session) {
      setIsFavorite(!isFavorite);
      if (isFavorite) {
        removeFromFavorites(_id);
      } else {
        addToFavorites(_id);
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (session) {
      setIsFavorite(favorites.includes(_id));
    }
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
        <ion-icon name={isFavorite ? "heart" : "heart-empty"} className="heart"></ion-icon>
      </button>
      <Link to={`/details/${_id}`} className="sneaker-card">
        <img src={src} alt="Product" className="card-image p-5 w-100"/>
        <div className="p-3">
          <h3 className="card-title">{name}</h3>
          <span className="card-price">${price}</span>
        </div>
      </Link>
    </div>
  );
};
