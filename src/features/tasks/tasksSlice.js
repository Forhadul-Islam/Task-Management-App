import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allTasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    loadTasks: (state, action) => {
      state.allTasks = action.payload;
    },
    addTask: (state, action) => {
      state.allTasks.push(action.payload);
    },
  },
});

export const { loadTasks, addTask } = tasksSlice.actions;
export default tasksSlice.reducer;
