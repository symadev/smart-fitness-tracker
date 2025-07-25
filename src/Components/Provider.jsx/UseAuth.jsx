import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const UseAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default UseAuth;
