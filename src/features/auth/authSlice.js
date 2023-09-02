import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.user = action.payload;
    },
    loggedOut: (state) => {
      state.user = undefined;
    },
  },
});

export const { loggedIn, loggedOut } = authSlice.actions;
export default authSlice.reducer;
