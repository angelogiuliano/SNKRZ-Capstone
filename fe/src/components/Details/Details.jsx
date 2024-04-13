import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Details.css";
import { jwtDecode } from "jwt-decode";
import { updateFavorites } from "../../helpers/updateFavorites";
import { addToFavorites } from "../../helpers/addToFavorites";
import { removeFromFavorites } from "../../helpers/removeFromFavorites";

export const Details = () => {
  const id = useParams();
  const [details, setDetails] = useState({});
  const [alreadyFavorite, setAlreadyFavorite] = useState(null);

  const session = localStorage.getItem("auth")
    ? localStorage.getItem("auth")
    : "";
  const decodedSession = session && jwtDecode(session);

  const favorites = localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : [];
  const navigate = useNavigate();

  const checkFavorites = () => {
    if (favorites) {
      if (favorites.includes(details.styleID)) {
        setAlreadyFavorite(true);
      } else {
        setAlreadyFavorite(false);
      }
    }
  };

  const getDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/getDetails/${id.id}`
      );
      setDetails(response.data);
      checkFavorites();
    } catch (error) {
      console.log(error);
    }
  };

  const addToFav = () => {
    if (session) {
      if (favorites.includes(details.styleID)) {
        console.log("already fav");
        setAlreadyFavorite(true);
        removeFromFavorites(details.styleID);
      } else {
        console.log("added to fav");
        setAlreadyFavorite(false);
        addToFavorites(details.styleID);
      }
    } else {
      navigate("/login");
    }
  };

  const addToCart = () => {
    session ? console.log("added to cart") : navigate("/login");
  };

  useEffect(() => {
    getDetails();
  }, [alreadyFavorite]);

  return (
    <div className="mx-4 my-5 d-flex justify-content-center">
      {details.thumbnail ? (
        <div className="w-50 d-flex flex-wrap">
          <div className="shoe-info">
            <h2>{details.shoeName}</h2>
            <p>{details.colorway}</p>
          </div>
          <div className="d-flex align-items-center gap-5">
            <img
              src={details.thumbnail}
              alt={details.shoeName}
              width={"500px"}
            />
            <div className="btn-cont d-flex gap-3 flex-wrap">
              <button onClick={(e) => addToFav(e)} className="buy-btn fav">
                {alreadyFavorite ? "Rimuovi dai" : "Aggiungi ai"} preferiti
              </button>
              <button onClick={() => addToCart()} className="buy-btn cart">
                Aggiungi al carrello
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-100 text-center">
          <img
            width={"400px"}
            src="https://i.pinimg.com/originals/3d/6a/a9/3d6aa9082f3c9e285df9970dc7b762ac.gif"
            alt=""
          />
        </div>
      )}
    </div>
  );
};
