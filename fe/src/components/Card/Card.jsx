import "./Card.css";
import { Link } from "react-router-dom";

export const Card = (props) => {
  const { src, name, price, _id } = props;

  return (
    <Link to={`/details/${_id}`}>
    <div className="sneaker-card" id={_id}>
      <img src={src} alt="Product" className="card-image p-5" />
      <div className="p-3">
        <h3 className="card-title">{name}</h3>
        <span className="card-price">${price}</span>
      </div>
    </div>
    </Link>
  );
};
