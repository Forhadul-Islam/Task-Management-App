import { useEffect } from "react";
import { getUserById } from "../API/api";

const Login = () => {
  function fetchUsers() {
    getUserById().then((data) => console.log({ get: data }));
  }

  useEffect(() => {
    fetchUsers();
  }, []);
  return <div>Login</div>;
};

export default Login;
