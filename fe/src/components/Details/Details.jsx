import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Details.css";
import { jwtDecode } from "jwt-decode";
import { addToFavorites } from "../../helpers/addToFavorites";
import { removeFromFavorites } from "../../helpers/removeFromFavorites";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cartSlice";

export const Details = () => {
  const id = useParams();
  const [details, setDetails] = useState({});
  const [alreadyFavorite, setAlreadyFavorite] = useState(null);
  const [alreadyInCart, setAlreadyInCart] = useState(null);

  const session = localStorage.getItem("auth")
    ? localStorage.getItem("auth")
    : "";
  const decodedSession = session && jwtDecode(session);
  const dispatch = useDispatch();

  const favorites = localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : [];
  const navigate = useNavigate();

  const checkFavorites = (favorites) => {
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
    } catch (error) {
      console.log(error);
    }
  };

  const addToFav = () => {
    if (session) {
      if (favorites.includes(details.styleID)) {
        setAlreadyFavorite(true);
        removeFromFavorites(details.styleID);
      } else {
        setAlreadyFavorite(false);
        addToFavorites(details.styleID);
      }
      const currentFavorites = localStorage.getItem("favorites");
      checkFavorites(currentFavorites);
    } else {
      navigate("/login");
    }
  };

  const addToCartFunction = () => {
    if (session) {
      const currentCart = localStorage.getItem("cart");
      if (!currentCart.includes(details.styleID)) {
        setAlreadyInCart(true);
        dispatch(
          addToCart({
            src: details.thumbnail,
            name: details.shoeName,
            price: details.retailPrice,
            _id: details.styleID,
            quantity: 1,
          })
        );
      } else {
        setAlreadyInCart(false);
        dispatch(removeFromCart(details.styleID));
      }
      window.location.reload();
    } else {
      navigate("/login");
    }
  };

  const checkIfAlreadyInCart = () => {
    const currentCart = localStorage.getItem("cart");
    if (currentCart.includes(details.styleID)) {
      setAlreadyInCart(true);
    } else {
      setAlreadyInCart(false);
    }
    console.log(alreadyInCart);
  };

  useEffect(() => {
    const currentFavorites = localStorage.getItem("favorites");
    checkFavorites(currentFavorites);
  }, [favorites]);

  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    checkIfAlreadyInCart();
  }, [details]);

  return (
    <Container className="my-5">
      <Row className="justify-content-center flex-wrap">
        <Col md={12}>
          {details.thumbnail ? (
            <div className="shoe-info">
              <h2>{details.shoeName}</h2>
              <p>{details.colorway}</p>
            </div>
          ) : (
            <div className="text-center">
              <Image
                width={400}
                src="https://i.pinimg.com/originals/3d/6a/a9/3d6aa9082f3c9e285df9970dc7b762ac.gif"
                alt=""
              />
            </div>
          )}
        </Col>
        <Col md={12}>
          {details.thumbnail && (
            <div className="d-flex justify-content-evenly align-items-center my-3 flex-wrap">
              <Image
                width={400}
                src={details.thumbnail}
                alt={details.shoeName}
                fluid
              />
              <div className="btn-cont mt-3 d-flex flex-column align-items-center">
                <Button onClick={() => addToFav()} className="buy-btn fav">
                  {alreadyFavorite ? "Rimuovi dai" : "Aggiungi ai"} preferiti
                </Button>
                <Button
                  onClick={() => addToCartFunction()}
                  className="buy-btn cart mt-3"
                >
                  {alreadyInCart ? "Rimuovi dal" : "Aggiungi al"} carrello
                </Button>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};
