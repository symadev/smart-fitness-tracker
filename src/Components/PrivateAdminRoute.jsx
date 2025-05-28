import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Components/Provider.jsx/UseAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <progress className="progress w-56"></progress>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;

// this privateroute only for the user
