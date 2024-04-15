import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const newCart = [...cart];
      newCart.push(action.payload);
      state.cart.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(newCart));
    },
    removeFromCart: (state, action) => {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const filteredCart = cart.filter((x) => x._id !== action.payload.id);
      console.log(filteredCart);
      localStorage.setItem('cart', JSON.stringify(filteredCart))
      state.cart = state.cart.filter((x) => x._id !== action.payload.id);
      window.location.reload()
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart } = cartSlice.actions;
