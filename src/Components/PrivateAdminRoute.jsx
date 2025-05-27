import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Components/Provider.jsx/UseAuth";
import useAdmin from "../Components/UseAdmin";

const PrivateAdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

//   console.log("User:", user);  // Log the entire user object for debugging
//   console.log("Is Admin:", isAdmin); // Log if user is admin

  if (loading || isAdminLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // If no user is logged in, redirect to login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default PrivateAdminRoute;
