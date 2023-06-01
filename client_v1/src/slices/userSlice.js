import { createSlice } from "@reduxjs/toolkit";
import Storage from "../utils/Storage";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
