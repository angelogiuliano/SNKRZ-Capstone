import axios from "axios";
import { useEffect, useState } from "react";
import ProductLayout from "../ProductLayout/ProductLayout";

export const TrendingProducts = (props) => {
  const { limit, shuffleArray, text } = props;
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [error, setError] = useState(null);

  const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/mostPopular/${limit}`
      );
      if (response.status === 200) {
        if (shuffleArray && limit > 10) {
          shuffle(response.data.splice(0, 8));
          setTrendingProducts(response.data);
        } else {
          setTrendingProducts(response.data);
        }
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="mx-4">
      {!error ? (
        <ProductLayout trendingProducts={trendingProducts} text={text} />
      ) : (
        <div className="container">{limit < 10 && <h4>Errore, riprova più tardi</h4>}</div>
      )}
    </div>
  );
};
