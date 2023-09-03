/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loggedIn } from "../features/auth/authSlice";
import { getUsers } from "../API/api";
import { loadUsers } from "../features/users/usersSlice";

export default function useAuthCheck() {
  const [authChecked, setAuthChecked] = useState(false);
  const dispatch = useDispatch();
  const localAuth = localStorage.getItem("auth");

  useEffect(() => {
    if (localAuth) {
      const user = JSON.parse(localAuth);
      //in near futre we will store this in out centralized store
      dispatch(loggedIn(user));

      //when a user is logged in, all users information may be needed in future
      getUsers().then((users) => dispatch(loadUsers(users)));
    }
    setAuthChecked(true);
  }, [localAuth, dispatch]);

  return authChecked;
}
