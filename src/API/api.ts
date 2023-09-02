import db from "../db/db";

// user
export async function getUsers() {
  try {
    let users = await db.collection("users").get();
    return users;
  } catch (error) {
    console.log("error: ", error);
  }
}

//get single user by id
export const getUserById = async (id) => {
  try {
    const user = db.collection("users").doc({ id }).get();
    return user;
  } catch (error) {
    console.log("error: ", error);
  }
};

//add new user
export const addUser = async (data) => {
  try {
    const user = db.collection("users").add(data);
    return user;
  } catch (error) {
    console.log("error: ", error);
  }
};

//create new task
export const addTask = async (task) => {
  try {
    const newTaks = await db.collection("tasks").add(task);
    return newTaks;
  } catch (error) {
    console.log("error: ", error);
  }
};

//get all tasks
export const getTasks = async () => {
  try {
    const tasks = await db.collection("tasks").get();
    return tasks;
  } catch (error) {
    console.log("error: ", error);
  }
};

//update task by taskId
export const getTaskById = async (id) => {
  try {
    const task = await db.collection("tasks").doc({ id }).get();
    return task;
  } catch (error) {
    console.log("error: ", error);
  }
};

//edit task
export const editTask = async ({ id, task }) => {
  try {
    const editedTask = await db.collection("tasks").doc({ id }).update(task);
    return editedTask;
  } catch (error) {
    console.log("error: ", error);
  }
};

//create new team
export const addTeam = async (team) => {
  try {
    const newTeam = await db.collection("teams").add(team);
    return newTeam;
  } catch (error) {
    console.log("error: ", error);
  }
};

//get all teams
export const getTeams = async () => {
  try {
    const teams = await db.collection("teams").get();
    return teams;
  } catch (error) {
    console.log("error: ", error);
  }
};

//update task by taskId
export const getTeamById = async (id) => {
  try {
    const team = await db.collection("teams").doc({ id }).get();
    return team;
  } catch (error) {
    console.log("error: ", error);
  }
};

//edit team
export const editTeam = async ({ id, team }) => {
  try {
    const editedTeam = await db.collection("teams").doc({ id }).update(team);
    return editedTeam;
  } catch (error) {
    console.log("error: ", error);
  }
};
