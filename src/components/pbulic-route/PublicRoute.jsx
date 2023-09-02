import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PublicRoute = () => {
  const auth = useAuth();

  if (auth?.username) {
    return <Navigate to="/task-board" replace />;
  } else {
    return <Outlet />;
  }
};

export default PublicRoute;
