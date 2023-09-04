import { useDispatch, useSelector } from "react-redux";
import { loggedOut } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { userLoggedOut } from "../../auth/auth";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = () => {
    userLoggedOut();
    dispatch(loggedOut());
    navigate("/login");
  };
  return (
    <nav className="flex justify-between">
      <h1 className="text-3xl font-semibold">Task Board</h1>
      <div className="flex gap-4 ">
        <div className="flex gap-2 items-center">
          <div className="font-medium">{user?.username}</div>
          <img
            className="h-10 w-10 rounded-full ring-2 ring-slate-400"
            src={user?.image}
            alt={user?.username}
          />
        </div>
        <button onClick={handleLogout} className="black_btn">
          LogOut
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
