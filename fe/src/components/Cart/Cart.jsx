import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/cartSlice";
import { useEffect } from "react";
export const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = JSON.parse(localStorage.getItem("cart"));
  let price = 0;

  const getPrice = () => {
    cartItems.map((item) => {
      price += item.price;
    });
    return price
  };

  useEffect(() => {
    getPrice()
  })

  return (
    <div className="container d-flex flex-wrap">
      <h2>Cart</h2>
      {cartItems.map((item) => {
        return (
          <div className="my-2 w-100" key={item._id}>
            <img src={item.src} alt="" width={200} />
            <h5>{item.name}</h5>
            <p>
              <b>Price:</b> ${item.price}
            </p>
            <button
              onClick={() => dispatch(removeFromCart({ id: item._id }))}
              className="log-btn"
            >
              Remove
            </button>
          </div>
        );
      })}
      <div className="checkout d-flex flex-wrap gap-3 my-4 w-100 justify-content-center">
        <h5 className="m-0 p-0">Total: ${getPrice()}</h5>
        <button className="w-100 log-btn">Checkout</button>
      </div>
    </div>
  );
};
