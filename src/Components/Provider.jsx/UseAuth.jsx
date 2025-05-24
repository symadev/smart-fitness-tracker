import { useContext } from "react";
import { AuthContext } from "./AuthContext"; // তোমার path অনুযায়ী adjust করবে

const UseAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default UseAuth;
