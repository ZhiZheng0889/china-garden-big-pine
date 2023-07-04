import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import userReducer from "../slices/userSlice";
import selectedFoodReducer from "../slices/selectedFoodSlice";
import categoryReducer from "../slices/categorySlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    selectedFood: selectedFoodReducer,
    category: categoryReducer,
  },
});

export default store;
