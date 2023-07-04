import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: "all",
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    removeCategory: (state) => {
      state.category = null;
    },
  },
});

export const { setCategory, removeCategory } = categorySlice.actions;

export default categorySlice.reducer;
