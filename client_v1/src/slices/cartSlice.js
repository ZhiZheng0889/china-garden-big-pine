import { createSlice } from "@reduxjs/toolkit";
import Storage from "../utils/Storage";
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: Storage.get("cart") ?? [],
  },
  reducers: {
    addItem: (state, action) => {
      Storage.set("cart", action.payload);
      state.cart = action.payload;
    },
    removeItem: (state) => {
      Storage.remove("cart");
      state.cart = null;
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
