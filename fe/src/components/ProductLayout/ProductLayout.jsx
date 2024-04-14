import { Col, Row } from "react-bootstrap";
import { Card } from "../Card/Card";

const ProductLayout = ({ trendingProducts, text }) => {
  return (
    <div className="container justify-content-center">
      <h1>{text}</h1>
      {trendingProducts.length > 0 ? (
        <Row xs={1} md={2} lg={3} className="g-4">
          {trendingProducts.map((product, i) => (
            <Col key={i}>
              <Card
                src={product.thumbnail}
                name={product.shoeName}
                price={product.retailPrice}
                _id={product.styleID}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <img
            src="https://i.pinimg.com/originals/3d/6a/a9/3d6aa9082f3c9e285df9970dc7b762ac.gif"
            alt=""
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
};

export default ProductLayout;
