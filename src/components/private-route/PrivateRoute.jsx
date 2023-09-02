import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PrivateRoute = () => {
  const auth = useAuth();
  const location = useLocation();

  if (auth?.username) {
    return <Outlet />;
  }
  return <Navigate to="/login" state={{ from: location }} replace={true} />;
};

export default PrivateRoute;
