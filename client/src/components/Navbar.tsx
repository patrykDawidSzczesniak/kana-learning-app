import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-blue-500 p-4 flex justify-between shadow-xl">
      <div>
        <Link to="/" className="no-underline text-white">Home</Link>
      </div>
      <div>
        <Link to="/login" className="no-underline text-white">Login</Link>
      </div>
    </div>
  );
}

export default Navbar;
