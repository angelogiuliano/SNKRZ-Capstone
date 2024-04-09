import "./Card.css";

export const Card = (props) => {
  const { src, name, price, id } = props;

  return (
    <div className="sneaker-card" id={id}>
      <img src={src} alt="Product" className="card-image p-5" />
      <div className="p-3">
        <h3 className="card-title">{name}</h3>
        <span className="card-price">${price}</span>
      </div>
    </div>
  );
};
