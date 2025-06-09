import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import toast from "react-hot-toast";

const PrivateRoute = () => {
  const user = useAuth();

  if (!user?.token) {
    toast.error("You must be logged in to reach this part of the app!", {id: 'accessDenied'});
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRoute;
