import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/cartSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();
  const sliceCart = useSelector((state) => state.cart.cart);
  const cartItems = JSON.parse(localStorage.getItem("cart"));
  const navigate = useNavigate();

  const getPrice = () => {
    let price = 0;
    cartItems.forEach((item) => {
      price += item.price * item.quantity;
    });
    setTotalPrice(price);
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleCheckout = async () => {
    const currentCart = JSON.parse(localStorage.getItem("cart"));
    const user = localStorage.getItem("auth")
    console.log(user);
    console.log(currentCart);

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
        <button onClick={() => handleCheckout()} className="w-100 log-btn">
          Checkout
        </button>
      </div>
    </div>
  );
};
