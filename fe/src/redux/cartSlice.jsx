import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
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
      console.log(action.payload);
      const filteredCart = cart.filter((x) => x._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(filteredCart));
      state.cart = state.cart.filter((x) => x._id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      const updatedCart = state.cart.map((item) =>
        item._id === _id ? { ...item, quantity } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      state.cart = updatedCart;
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
