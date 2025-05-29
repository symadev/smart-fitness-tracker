import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import router from './Components/Routes';

import { RouterProvider } from 'react-router-dom';
import AuthProvider from './Components/Provider.jsx/AuthContext';
// ✅ নিশ্চিত করুন সঠিক path


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* ✅ এখানে AuthProvider দিয়ে RouterProvider-কে wrap করা হয়েছে */}
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
