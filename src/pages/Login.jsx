/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserByEmailId } from "../API/api";
import { userLoggedIn } from "../auth/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    getUserByEmailId(email)
      .then((user) => {
        if (user?.username) {
          if (password == user.password) {
            userLoggedIn(user);
            navigate("/task-board");
          } else {
            setError("Wrong password");
          }
        } else {
          setError("User not found!");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-slate-300/30 min-h-screen flex justify-center items-center">
      <div className="flex h- md:w-96 justify-center  shadow-md rounded-md items-center bg-white">
        <form onSubmit={(e) => handleLogin(e)} className="bg-white p-6">
          <h3 className="text-center my-5 text-2xl font-semibold">Log In</h3>

          <div className="flex items-center  border-2 py-2 px-3 text-black rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              id="email-address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="email"
              type="email"
              autoComplete="email"
              required
              className="pl-2 outline-none border-none  text-balck"
              placeholder="Email address"
            />
          </div>
          <div className="flex items-center text-black border-2 py-2 px-3 rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className=" pl-2 outline-none border-none text-balck"
              placeholder="Password"
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            {isLoading ? "Loggin in.." : "Log In"}
          </button>
          <span className="text-sm ml-2 text-black hover:text-blue-500 cursor-pointer">
            Forgot Password ?
          </span>
          <div className="text-sm ml-2 text-gray-900  cursor-pointer">
            Dont have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-500 cursor-pointer font-medium underline"
            >
              Create Account
            </Link>
            {error.length > 0 && <div className="text-red-600 ">{error}</div>}
          </div>
          <div></div>
        </form>
      </div>
    </div>
  );
};

export default Login;
