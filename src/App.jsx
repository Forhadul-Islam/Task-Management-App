import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import TaskBoard from "./pages/TaskBoard";
import useAuthCheck from "./hooks/useCheckAuth";
// import useAuth from "./hooks/useAuth";
import PublicRoute from "./components/pbulic-route/PublicRoute";
import PrivateRoute from "./components/private-route/PrivateRoute";

function App() {
  const authChecked = useAuthCheck();
  // const user = useAuth();

  //Untill I am sure about the user is logged in or not I'm not interested to show any ui
  if (!authChecked)
    return (
      <div className="h-[100vh] flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="/task-board" element={<PrivateRoute />}>
          <Route path="" element={<TaskBoard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
