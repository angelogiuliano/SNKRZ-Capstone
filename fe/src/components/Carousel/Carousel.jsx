import carousel1 from "../../imgs/DeWatermark.ai_1713263267276.png";
import carousel2 from "../../imgs/maxresdefault.jpg";
import carousel3 from "../../imgs/daeff542082129.57bf843f640b4.jpg";
import "./Carousel.css";

export const Carousel = () => {
  return (
    <div
      id="carouselExampleIndicators"
      className="container mb-3 carousel slide d-none d-md-block"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <a href="/products/new-balance" className="carousel-item active">
          <img src={carousel1} className="d-block w-100" alt="..." />
        </a>
        <a href="/products/lebron" className="carousel-item">
          <img src={carousel2} className="d-block w-100" alt="..." />
        </a>
        <a href="/products/yeezy%20350" className="carousel-item">
          <img src={carousel3} className="d-block w-100" alt="..." />
        </a>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};
