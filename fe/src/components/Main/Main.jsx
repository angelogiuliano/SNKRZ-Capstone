import React, { useEffect, useState } from "react";
import { Card } from "../Card/Card";
import "./Main.css";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Main = () => {
  const [trendingSneakers, setTrendingSneakers] = useState({});

  const settings = {
    className: "h-100",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
  };

  const getTrending = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/mostPopular`
      );
      setTrendingSneakers(response.data.slice(0, 10));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrending();
  }, []);

  return (
    <div>
      {trendingSneakers.length > 0 ? (
        <Slider {...settings} className="px-4 my-5 align-items-center">
          {trendingSneakers.map((sneaker, i) => {
            return (
              <Card
                key={i}
                name={sneaker.shoeName}
                src={sneaker.thumbnail}
                id={sneaker.id}
                price={sneaker.retailPrice}
              />
            );
          })}
        </Slider>
      ) : (
        <div className="w-100 text-center">
          <img
            alt="loading"
            src="https://i.pinimg.com/originals/3d/6a/a9/3d6aa9082f3c9e285df9970dc7b762ac.gif"
            width={"400px"}
          ></img>
        </div>
      )}
    </div>
  );
};
