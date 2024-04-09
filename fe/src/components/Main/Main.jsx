import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "../Card/Card";

export const Main = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/mostPopular/50`
      );
      console.log(response);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="products-container d-flex flex-wrap mx-4 gap-3 justify-content-between">
        {products.map((product, i) => {
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
    </>
  );
};
