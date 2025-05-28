// Dashboard.jsx
import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaDumbbell, FaRobot, FaCog } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-[#0D1124] text-white flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-6">
          <div className="bg-gradient-to-br from-blue-400 to-cyan-500 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold">
            L
          </div>
          <span className="border px-2 py-1 rounded text-sm">LOGO</span>
        </div>

        {/* Section Title */}
        <h2 className="text-xs text-gray-400 px-6 mb-4">MENU</h2>

        {/* Navigation Links */}
        <ul className="flex flex-col gap-2 px-4 text-sm font-medium">
          <li>
            <SidebarLink to="/dashboard/home" icon={<FaHome />} text="Dashboard Home" />
          </li>
          <li>
            <SidebarLink to="/dashboard/workouts" icon={<FaDumbbell />} text="Workout Logs" />
          </li>
          <li>
            <SidebarLink to="/dashboard/ai-coach" icon={<FaRobot />} text="AI Coach" />
          </li>
          <li>
            <SidebarLink to="/dashboard/settings" icon={<FaCog />} text="Settings" />
          </li>
        </ul>

        {/* Footer */}
        <div className="mt-auto px-6 text-xs text-gray-400 py-6">
          <h3 className="mb-1">LOREM IPSUM</h3>
          <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
          <button className="bg-[#1E213A] hover:bg-[#2d3160] text-white text-sm px-4 py-2 rounded shadow-md">
            LOREM
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

const SidebarLink = ({ to, icon, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg w-full transition-all duration-200 ${
          isActive
            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
            : 'bg-[#1E213A] text-gray-300 hover:bg-[#2d3160]'
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      <span>{text}</span>
    </NavLink>
  );
};

export default Dashboard;
