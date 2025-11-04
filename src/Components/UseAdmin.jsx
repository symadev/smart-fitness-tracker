import { useEffect, useState } from "react";
import useAuth from "../Components/Provider.jsx/UseAuth"; 
import axios from "axios";

const UseAdmin = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      const token = localStorage.getItem("access-token");
      
      if (!token) {
        console.error(" No token found in localStorage");
        setIsAdminLoading(false);
        setIsAdmin(false);
        return;
      }

      //  Email encode @ symbol 
      const encodedEmail = encodeURIComponent(user.email);
      
      console.log(" Checking admin for:", user.email);
     

     
         axios.get(`https://fitness-server-lilac.vercel.app/user/admin/${encodedEmail}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(" Admin check response:", res.data);
          setIsAdmin(res.data?.admin || false);
          setIsAdminLoading(false);
        })
        .catch((err) => {
          console.error(" Admin check error:", {
            status: err.response?.status,
            message: err.response?.data?.message || err.message,
            url: err.config?.url
          });
          setIsAdmin(false);
          setIsAdminLoading(false);
        });
    } else {
      console.log(" No user email found");
      setIsAdminLoading(false);
      setIsAdmin(false);
    }
  }, [user]);

  return [isAdmin, isAdminLoading];
};

export default UseAdmin;