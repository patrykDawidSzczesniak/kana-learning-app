import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Navbar() {
  const auth = useAuth();

  return (
    <div className="bg-blue-500 p-4 flex justify-between shadow-xl">
      <div className="flex gap-3">
        <Link to="/" className="no-underline text-white">
          Home
        </Link>
        {auth?.token && (
          <Link to="/profile" className="no-underline text-white">
            Profile
          </Link>
        )}
      </div>
      <div>
        {auth?.token ? (
          <button onClick={auth.logoutFunction} className="text-white bg-transparent border-none cursor-pointer shrink-0">
            Logout
          </button>
        ) : (
          <Link to="/login" className="no-underline text-white">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
