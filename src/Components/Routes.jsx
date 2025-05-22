import {
  createBrowserRouter,
  
} from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "./Home";


const router = createBrowserRouter([
  {
    path: "/",
    element: <div><MainLayout></MainLayout></div>,
     children: [
      {
        path: "/",
        element:<Home></Home>,
      },
    ],
  },
]);

export default router; 
