import { createSlice } from "@reduxjs/toolkit";

export const selectedFoodSlice = createSlice({
  name: "selectedFood",
  initialState: {
    selectedFood: null,
  },
  reducers: {
    selectFood: (state, action) => {
      state.selectedFood = action.payload;
    },
    unselectFood: (state) => {
      state.selectedFood = null;
    },
  },
});

export const { selectFood, unselectFood } = selectedFoodSlice.actions;

export default selectedFoodSlice.reducer;
