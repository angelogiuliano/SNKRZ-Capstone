import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../Card/Card";
import { Alert } from "react-bootstrap";

export const SearchedProducts = () => {
  const [foundProducts, setFoundProducts] = useState([]);
  const [error, setError] = useState(null);
  const searched = useParams();

  const getSearchedProduct = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/getProducts/${searched.name}`
      );
      setFoundProducts(response.data);
      setError(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    getSearchedProduct();
  }, [searched.name]);

  return (
    <div className="mx-4 d-flex flex-wrap gap-3">
      {error && (
        <div className="text-center w-100">
          <Alert variant={"danger"}>Error, please try again later</Alert>
        </div>
      )}
      {!error && foundProducts.length < 1 && (
        <div className="w-100 text-center">
          <img
            width={"400px"}
            src="https://i.pinimg.com/originals/3d/6a/a9/3d6aa9082f3c9e285df9970dc7b762ac.gif"
            alt=""
          />
        </div>
      )}
      {!error &&
        foundProducts.length > 0 &&
        foundProducts.map((product, i) => {
          return (
            <Card
              key={i}
              name={product.shoeName}
              src={product.thumbnail}
              _id={product.styleID}
              price={product.retailPrice}
            />
          );
        })}
    </div>
  );
};
