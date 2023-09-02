/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Localbase from "localbase";

const db = new Localbase("db");
//For now let's redirect the user to LongIn page.

const Home = () => {
  //   useEffect(() => {
  // console.log("hello");
  // db.collection("users").add({
  //   id: 1,
  //   name: "Bill",
  //   age: 47,
  // });
  //   }, []);
  return <Navigate to="/login" />;
};

export default Home;
