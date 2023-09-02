/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loggedIn } from "../features/auth/authSlice";

export default function useAuthCheck() {
  const [authChecked, setAuthChecked] = useState(false);
  const dispatch = useDispatch();
  const localAuth = localStorage?.getItem("auth");

  useEffect(() => {
    if (localAuth) {
      const user = JSON.parse(localAuth);
      //in near futre we will store this in out centralized store
      console.log(user);
      dispatch(loggedIn(user));
    }
    setAuthChecked(true);
  }, [localAuth, dispatch]);

  return authChecked;
}
