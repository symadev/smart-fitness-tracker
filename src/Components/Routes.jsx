import {
  createBrowserRouter,
  
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
     children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
]);

export default router; 
