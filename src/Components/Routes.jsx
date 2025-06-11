import {
  createBrowserRouter,
  
} from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import PrivateAdminRoute from "./PrivateAdminRoute";
import DashBoard from "./Pages/DashBoard";
import DashboardHome from "./Pages/DashboardHome";
import WorkoutLogs from "./Pages/WorkoutLogs";
import AiCoach from "./Pages/AiCoach";

import AboutUs from "./AboutUs";
import Users from "./Pages/Users";


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
        path: "AboutUs",
        element:<AboutUs></AboutUs>,
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
        path: "dashboard",
        element:<PrivateAdminRoute><DashBoard></DashBoard></PrivateAdminRoute>,
        children: [
          {
      index: true, //  This makes DashboardHome the default
      element: <DashboardHome />,
    },
    
    {
      path: "home",
      element: <DashboardHome />,
    },
    {
      path: "user",
      element:<Users></Users>,
    },
    {
      path: "workouts",
      element: <WorkoutLogs />,
    },
    {
      path: "ai-coach",
      element: <AiCoach/>,
    },
   
  ],
       },
    ],
  },
]);

export default router; 
