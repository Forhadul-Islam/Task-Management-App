import { addTeam, editTeam, getTeamById, getTeams } from "../API/api";

//fetchTeams
function fetchTeams() {
  getTeams().then((data) => data);
}

// fetchTeamById
function fetchTeamById(id) {
  getTeamById(id).then((data) => data);
}

//createTeam
function createTeam(team) {
  addTeam(team).then((data) => data);
}
// updateTeam
function updateTeam({ id, team }) {
  editTeam({ id, team }).then((data) => data);
}

// deleteTask

export { fetchTeams, fetchTeamById, createTeam, updateTeam };
