import "./Card.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { addToFavorites } from "../../helpers/addToFavorites";
import { removeFromFavorites } from "../../helpers/removeFromFavorites";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import Alert from "react-bootstrap/Alert";

export const Card = (props) => {
  const { src, name, price, _id } = props;
  const session = localStorage.getItem("auth")
    ? localStorage.getItem("auth")
    : "";
  const decodedSession = session && jwtDecode(session);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isFavorite, setIsFavorite] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [timer, setTimer] = useState(3);

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

  const handleCart = () => {
    const currentCart = localStorage.getItem("cart");
    if (currentCart.includes(_id)) {
      setTimer(3);
      setShowAlert(true);
      return;
    } else {
      dispatch(addToCart({ src, name, price, _id, quantity: 1 }));
    }
    navigate(0);
  };

  useEffect(() => {
    if (session) {
      setIsFavorite(favorites.includes(_id));
    }
  }, [_id]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        setShowAlert(false);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [timer, showAlert]);

  return (
    <>
      <Alert
        key={"warning"}
        variant={"warning"}
        className={showAlert ? "position-absolute z-2" : "d-none"}
      >
        Questo elemento è già stato aggiunto al carrello
      </Alert>
      <div
        className={`d-flex col flex-wrap position-relative ${
          window.innerWidth <= 576 ? "justify-content-center" : ""
        }`}
        id={_id}
      >
        <div className="buttons-cont d-flex flex-wrap">
          <button
            onClick={(e) => handleFavorite(e)}
            className={
              isFavorite
                ? "border-0 bg-transparent p-0 m-0 d-flex w-100 fav-btn favorite heart"
                : "border-0 bg-transparent p-0 m-0 d-flex w-100 fav-btn heart"
            }
          >
            <ion-icon
              name={isFavorite ? "heart" : "heart-empty"}
              className="heart"
            ></ion-icon>
          </button>
          <button
            onClick={() => handleCart()}
            className="border-0 bg-transparent p-0 m-0 d-flex w-100 fav-btn cart-btn"
          >
            <ion-icon name="cart"></ion-icon>
          </button>
        </div>

        <Link to={`/details/${_id}`} className="sneaker-card">
          <img src={src} alt="Product" className="card-image p-5 w-100" />
          <div className="p-3">
            <h3 className="card-title">{name}</h3>
            <span className="card-price">${price}</span>
          </div>
        </Link>
      </div>
    </>
  );
};
