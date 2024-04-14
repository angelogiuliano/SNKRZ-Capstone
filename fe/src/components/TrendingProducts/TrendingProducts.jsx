import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "../Card/Card";
import ProductLayout from "../ProductLayout/ProductLayout";

export const TrendingProducts = (props) => {
  const { limit, shuffleArray, text } = props;
  const [trendingProducts, setTrendingProducts] = useState([]);

  const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/mostPopular/${limit}`
      );
      if (shuffleArray && limit > 10) {
        shuffle(response.data.splice(0, 8));
        setTrendingProducts(response.data);
      } else {
        setTrendingProducts(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="mx-4">
      <ProductLayout trendingProducts={trendingProducts} text={text}/>
    </div>
  );
};
