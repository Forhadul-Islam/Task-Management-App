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
  },
});

export const { loadTeams, addTeam, loadTeamTasks } = teamsSlice.actions;
export default teamsSlice.reducer;
