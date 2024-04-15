import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/cartSlice";
import { useEffect, useState } from "react";
export const Cart = () => {
  const dispatch = useDispatch();
  const sliceCart = useSelector((state) => state.cart.cart)
  const cartItems = JSON.parse(localStorage.getItem("cart"));
  const [totalPrice, setTotalPrice] = useState(0)

  let price = 0;

  const getPrice = () => {
    cartItems.forEach((item) => {
      price = item.price * (item.quantity);
    });
    setTotalPrice(price)
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
    getPrice()
  };

  useEffect(() => {
    getPrice()
  }, [sliceCart])

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
            <p>
            <b>Quantity:</b>{" "}
            <input
              type="number"
              defaultValue={item.quantity}
              onChange={(e) =>
                handleQuantityChange(item._id, parseInt(e.target.value))
              }
              min={1}
            />
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
        <h5 className="m-0 p-0">Total: ${totalPrice}</h5>
        <button className="w-100 log-btn">Checkout</button>
      </div>
    </div>
  );
};
