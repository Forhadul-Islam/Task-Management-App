import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import settingsReducer from "../features/settings/settingsSlice";
import usersReducer from "../features/users/usersSlice";
import tasksReducer from "../features/tasks/tasksSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingsReducer,
    users: usersReducer,
    tasks: tasksReducer,
  },
});
