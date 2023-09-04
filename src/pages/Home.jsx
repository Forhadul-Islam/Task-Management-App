/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Localbase from "localbase";
import useAuth from "../hooks/useAuth";

const db = new Localbase("db");
//For now let's redirect the user to LongIn page.

const Home = () => {
  const auth = useAuth();
  return auth.id ? <Navigate to="/task-board" /> : <Navigate to="/login" />;
};

export default Home;
