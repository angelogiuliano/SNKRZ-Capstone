import axios from "axios";
import { useEffect, useState } from "react";
import "./Favorites.css";
import { removeFromFavorites } from "../../helpers/removeFromFavorites";
import { useNavigate } from "react-router-dom";

export const Favorites = () => {
  const [itemsInfo, setItemsInfo] = useState([]);

  const favorites = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem("favorites")) : []
  const navigate = useNavigate();
  console.log(favorites);

  const handleRemoveFromFav = (e) => {
    const id = e.target.parentElement.parentElement.attributes.id.value;
    removeFromFavorites(id);
    navigate(0);
  };

  const createCardsFromFavorites = () => {
    return itemsInfo.map((favoriteItem, i) => {
      return (
        <div key={i} className="favorites-card" id={favoriteItem.styleID}>
          <div className="favorites-item py-5">
            <img src={favoriteItem.thumbnail} alt="Product" />
            <h4>{favoriteItem.shoeName}</h4>
            <p className="">
              <b>Price: </b>
              {favoriteItem.retailPrice} $
            </p>
            <button
              className="log-btn mt-4 w-50"
              onClick={(e) => handleRemoveFromFav(e)}
            >
              Rimuovi
            </button>
          </div>
        </div>
      );
    });
  };

  const getFavoritesInfo = async () => {
    if (favorites.length > 0) {
      const requests = favorites.map((item) =>
        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/getDetails/${item}`)
      );

      try {
        const responses = await Promise.all(requests);
        setItemsInfo(responses.map((response) => response.data)); // Update with all fetched data
      } catch (error) {
        console.error(error);
      }
    } else {
        return <p>Non hai ancora aggiunto un elemento ai preferiti</p>
    }
  };

  useEffect(() => {
    getFavoritesInfo();
  }, []);

  return itemsInfo.length > 0 ? (
    <div className="mx-4 d-flex">{createCardsFromFavorites()}</div>
  ) : ( favorites.length > 0 ?
    <div className="w-100 text-center">
      <img
        width={"400px"}
        src="https://i.pinimg.com/originals/3d/6a/a9/3d6aa9082f3c9e285df9970dc7b762ac.gif"
        alt=""
      />
    </div> : <p className="mx-4">Aggiungi elementi ai preferiti</p>
  );
};
