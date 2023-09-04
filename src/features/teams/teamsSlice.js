import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teams: [],
  teamTasks: [],
};

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    loadTeams: (state, action) => {
      state.teams = action.payload;
    },
    addTeam: (state, action) => {
      state.teams.push(action.payload);
    },
    loadTeamTasks: (state, action) => {
      state.teamTasks = action.payload;
    },
    addTeamTask: (state, action) => {
      state.teamTasks.push(action.payload);
    },
    updateTeamTask: (state, action) => {
      const { taskId, updatedTask } = action.payload;
      state.teamTasks = state.teamTasks.map((task) => {
        if (task.id == taskId) return updatedTask;
        else return task;
      });
    },
    removeTeamTask: (state, action) => {
      const deletedTaskId = action.payload;
      state.teamTasks = state.teamTasks.filter(
        (task) => task.id !== deletedTaskId
      );
    },
  },
});

export const {
  loadTeams,
  addTeam,
  loadTeamTasks,
  addTeamTask,
  updateTeamTask,
  removeTeamTask,
} = teamsSlice.actions;
export default teamsSlice.reducer;
