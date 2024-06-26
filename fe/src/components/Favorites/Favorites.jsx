import axios from "axios";
import { useEffect, useState } from "react";
import "./Favorites.css";
import { removeFromFavorites } from "../../helpers/removeFromFavorites";
import { useNavigate } from "react-router-dom";
import img from "../../imgs/Untitled-1.png";

export const Favorites = () => {
  const [itemsInfo, setItemsInfo] = useState([]);

  const favorites = localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : [];
  const navigate = useNavigate();

  const handleRemoveFromFav = (e) => {
    const id = e.target.parentElement.parentElement.attributes.id.value;
    removeFromFavorites(id);
    navigate(0);
  };

  const createCardsFromFavorites = () => {
    return itemsInfo.map((favoriteItem, i) => {
      return (
        <div key={i} className="favorites-card p-0" id={favoriteItem.styleID}>
          <div className="favorites-item py-5 px-0 my-5 mx-0">
            <img src={favoriteItem.thumbnail} alt="Product" />
            <div className="prod-info d-flex flex-wrap text-start m-auto col w-50">
              <h4>{favoriteItem.shoeName}</h4>
              <p className="">
                <b>Retail Price: </b>
                {favoriteItem.retailPrice} $
              </p>
            </div>

            <button
              className="remove-btn mt-4 w-50"
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
      return <p>Non hai ancora aggiunto un elemento ai preferiti</p>;
    }
  };

  useEffect(() => {
    getFavoritesInfo();
  }, []);

  return itemsInfo.length > 0 ? (
    <div className="d-flex gap-3 flex-wrap container">
      {createCardsFromFavorites()}
    </div>
  ) : favorites.length > 0 ? (
    <div className="w-100 text-center">
      <img
        width={"400px"}
        src="https://i.pinimg.com/originals/3d/6a/a9/3d6aa9082f3c9e285df9970dc7b762ac.gif"
        alt=""
      />
    </div>
  ) : (
    <div className="container text-center my-5">
      <img src={img} alt="" width={150} />
      <h4>Non hai alcun elemento nei preferiti</h4>
      <p className="">
        Aggiungi elementi ai preferiti cliccando il cuoricino sul prodotto che
        ti piace, <br />o aggiungendolo ai preferiti direttamente dalla sua
        pagina dedicata
      </p>
    </div>
  );
};
