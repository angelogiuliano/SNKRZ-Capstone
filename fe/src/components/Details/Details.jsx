import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Details.css";
import { jwtDecode } from "jwt-decode";
import { addToFavorites } from "../../helpers/addToFavorites";
import { removeFromFavorites } from "../../helpers/removeFromFavorites";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

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
      checkFavorites();
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

  const addToCart = () => {
    session ? console.log("added to cart") : navigate("/login");
  };

  useEffect(() => {
    const currentFavorites = localStorage.getItem("favorites");
    checkFavorites(currentFavorites);
  }, [favorites]);

  useEffect(() => {
    getDetails();
  }, []);

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
                <Button onClick={addToCart} className="buy-btn cart mt-3">
                  Aggiungi al carrello
                </Button>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};
