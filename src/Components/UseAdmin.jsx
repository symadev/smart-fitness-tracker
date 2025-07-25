import { useEffect, useState } from "react";
import useAuth from "../Components/Provider.jsx/UseAuth"; 
import axios from "axios";

const UseAdmin = () => {
  const { user } = useAuth(); // current logged in user
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    if (user) {
         axios.get(`http://localhost:5000/user/admin/${user.email}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`
          }
        })

        .then(res => {
          setIsAdmin(res.data.admin);
          setIsAdminLoading(false);
        });
    }
  }, [user]);

  return [isAdmin, isAdminLoading];
};

export default UseAdmin;



//  users/admin/:email this is for the backend route , that tell that if the email user is an admin