import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "./Provider.jsx/UseAuth";


const PrivateTrainerRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();

  if (loading) return <progress className="progress w-56"></progress>;

  if (!user || user.role !== "trainer") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateTrainerRoute;
