import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import userReducer from "../slices/userSlice";
import selectedFoodReducer from "../slices/selectedFoodSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    selectedFood: selectedFoodReducer,
  },
});

export default store;
