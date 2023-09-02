import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: undefined,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loadUsers: (state, action) => {
      state.allUsers = action.payload;
    },
  },
});

export const { loadUsers } = usersSlice.actions;
export default usersSlice.reducer;
