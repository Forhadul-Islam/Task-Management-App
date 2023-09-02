import { getUsers } from "../API/api";

function fetchUsers() {
  getUsers().then((data) => data);
}
function fetchUserById(id) {
  getUsers(id).then((data) => data);
}

export { fetchUsers, fetchUserById };
