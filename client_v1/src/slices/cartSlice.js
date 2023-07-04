import { createSlice } from "@reduxjs/toolkit";
import Storage from "../utils/Storage";
import Cart from "../api/Cart";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: {},
  },
  reducers: {
    updateCart: (state, action) => {
      const foundCartId = Storage.get("cart_id");
      if (foundCartId !== action.payload._id) {
        Storage.set("cart_id", action.payload._id);
      }
      state.cart = action.payload;
    },
    removeCart: (state) => {
      Storage.remove("cart");
      state.cart = {};
    },
  },
});

export const { updateCart, removeCart } = cartSlice.actions;

export default cartSlice.reducer;
