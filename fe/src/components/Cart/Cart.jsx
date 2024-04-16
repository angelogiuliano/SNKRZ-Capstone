import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/cartSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();
  const sliceCart = useSelector((state) => state.cart.cart);
  const cartItems = JSON.parse(localStorage.getItem("cart"));
  // const navigate = useNavigate();

  const getPrice = () => {
    const currentCartItems = JSON.parse(localStorage.getItem("cart"));
    let price = 0;
    currentCartItems.forEach((item) => {
      price += item.price * item.quantity;
    });
    setTotalPrice(price);
  };

  const handleQuantityChange = (_id, quantity) => {
    dispatch(updateQuantity({ _id, quantity }));
  };

  const handleCheckout = async () => {
    const currentCart = JSON.parse(localStorage.getItem("cart"));
    const user = localStorage.getItem("auth");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/create-checkout-session`,
        currentCart,
        user
      );

      if (response.data.url) {
        console.log(response.data.url);
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPrice();
  }, [sliceCart]);

  return (
    <div className="container d-flex flex-wrap">
      <h2>Cart</h2>
      {cartItems.map((item, i) => {
        return (
          <div className="my-2 w-100" key={i}>
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
              onClick={() => dispatch(removeFromCart(item._id))}
              className="log-btn"
            >
              Remove
            </button>
          </div>
        );
      })}
      <div className="checkout d-flex flex-wrap gap-3 my-4 w-100 justify-content-center">
        <h5 className="m-0 p-0">Total: ${totalPrice}</h5>
        <button onClick={() => handleCheckout()} className="w-100 log-btn">
          Checkout
        </button>
      </div>
    </div>
  );
};
