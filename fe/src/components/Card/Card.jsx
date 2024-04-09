import "./Card.css";

export const Card = (props) => {
  const { src, name, description, price } = props;

  return (
    <div className="card">
      <img src={src} alt="Product" className="card-image" />
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-description">{description}</p>
        <span className="card-price">${price}</span>
      </div>
    </div>
  );
};
