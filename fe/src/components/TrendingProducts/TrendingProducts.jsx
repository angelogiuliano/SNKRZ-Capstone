import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "../Card/Card";

export const TrendingProducts = (props) => {
  const { limit, shuffleArray } = props;
  const [trendingProducts, setTrendingProducts] = useState([]);

  const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/mostPopular/${limit}`
      );
      if (shuffleArray) {
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
      {trendingProducts.length > 0 ? (
        <div className="products-container d-flex flex-wrap gap-3 justify-content-between">
          {trendingProducts.map((product, i) => {
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
