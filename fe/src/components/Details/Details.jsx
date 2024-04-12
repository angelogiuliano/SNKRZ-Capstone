import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Details.css";
import { useSession } from "../../helpers/ProtectedRoutes";

export const Details = () => {
  const id = useParams();
  const [details, setDetails] = useState({});
  const [alreadyFavorite, setAlreadyFavorite] = useState(null);

  const session = localStorage.getItem("auth");
  const favorites = JSON.parse(localStorage.getItem("favorites"));
  const navigate = useNavigate();

  const getDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/getDetails/${id.id}`
      );
      setDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToFav = () => {
    if (session) {
      if (favorites.includes(details.styleID)) {
        setAlreadyFavorite(true);
        const updatedFavorites = favorites.filter(
          (id) => id !== details.styleID
        );
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        console.log("fav");
      } else {
        setAlreadyFavorite(false);
        favorites.push(details.styleID);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        console.log("not fav");
      }
    } else {
      localStorage.setItem("favorites", []);
      navigate("/login");
    }
  };

  const addToCart = () => {
    session ? console.log("added to cart") : navigate("/login");
  };

  useEffect(() => {
    getDetails();
  }, []);

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
              <button onClick={() => addToFav()} className="buy-btn fav">
                {alreadyFavorite === false ? "Rimuovi dai" : "Aggiungi ai"}{" "}
                preferiti
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
