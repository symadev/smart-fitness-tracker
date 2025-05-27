import {
  createBrowserRouter,
  
} from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import PrivateAdminRoute from "./PrivateAdminRoute";
import DashBoard from "./Pages/DashBoard";


const router = createBrowserRouter([
  {
    path: "/",
    element: <div><MainLayout></MainLayout></div>,
     children: [
      {
        path: "/",
        element:<Home></Home>,
      },
      {
        path: "login",
        element:<Login></Login>
      },
      {
        path: "register",
        element:<Register></Register>
      },
       {
        path: "/dashboard",
        element:<PrivateAdminRoute><DashBoard></DashBoard></PrivateAdminRoute>,
       },
    ],
  },
]);

export default router; 
