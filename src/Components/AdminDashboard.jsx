import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaUser, FaBars, FaTimes } from "react-icons/fa";
import UseAdmin from "./UseAdmin";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAdmin, isAdminLoading] = UseAdmin();

  // Check if screen is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setIsSidebarOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //  Add this function
  const handleLinkClick = () => {
    if (isMobile) setIsSidebarOpen(false);
  };

  if (isAdminLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-blue-600 font-semibold">
        Checking admin status...
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-500 font-semibold">
        Access Denied ❌
        <p className="text-sm text-gray-600 mt-2">Admins only</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative">
      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-slate-200/50 px-4 py-3 z-30 flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-blue-700 text-lg">
          SmartFit Admin
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-blue-600 text-white rounded-md"
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`${isMobile
          ? `fixed top-0 left-0 w-72 h-full z-50 bg-[#0f1f60] text-white transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300`
          : "w-72 bg-[#0f1f60] text-white min-h-screen"
          }`}
      >
        <div className="flex flex-col items-center py-6 border-b border-slate-700/50">
          <img
            src="/assets/gym logo.png"
            alt="Logo"
            className="w-12 h-12 mb-2"
          />
          <h1 className="text-xl font-semibold">Admin Panel</h1>
        </div>

        <nav className="p-4 space-y-2">
          <SidebarLink
            to="/admin-dashboard/user"
            icon={<FaUser />}
            text="Manage Users"
            onClick={handleLinkClick}
          />

          <SidebarLink
            to="/"
            icon={<FaHome />}
            text="Main Home"
            isSecondary={true}
            onClick={handleLinkClick}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 relative overflow-y-auto ${isMobile ? "pt-16" : ""
          } transition-all duration-300`}
      >
        <div className="relative z-10 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};


const SidebarLink = ({ to, icon, text, onClick, isSecondary }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) => {
      if (isActive) {
        return "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md";
      }

      if (isSecondary) {
        return "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-slate-300 hover:bg-slate-700/30 hover:text-white";
      }

      return "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-slate-300 hover:bg-slate-700/40 hover:text-white";
    }}
  >
    <span className="text-lg">{icon}</span>
    <span>{text}</span>
  </NavLink>
);

export default AdminDashboard;