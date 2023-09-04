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
    updateTask: (state, action) => {
      const { taskId, updatedTask } = action.payload;
      state.allTasks = state.allTasks.map((task) => {
        if (task.id == taskId) return updatedTask;
        else return task;
      });
    },
    removeTask: (state, action) => {
      const deletedTaskId = action.payload;
      state.allTasks = state.allTasks.filter(
        (task) => task.id !== deletedTaskId
      );
    },
  },
});

export const { loadTasks, addTask, updateTask, removeTask } =
  tasksSlice.actions;
export default tasksSlice.reducer;
