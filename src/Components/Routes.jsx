import {
  createBrowserRouter,
  
} from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";


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
    ],
  },
]);

export default router; 
