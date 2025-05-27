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
   return <progress className="progress w-56"></progress>
  }

 if (!user) {
  return <Navigate to="/login" state={{ from: location }} replace />;
}

if (loading || isAdminLoading) {
  return <progress className="progress w-56"></progress>;
}

};

export default PrivateAdminRoute;
