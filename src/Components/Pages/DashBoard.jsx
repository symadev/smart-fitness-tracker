// Dashboard.jsx
import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaDumbbell, FaRobot, FaCog } from "react-icons/fa";
import logo from "../../assets/images/gym logo.png"

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-[#0f1f60] text-white flex flex-col">
        {/* Logo */}
        <div className="grid items-center gap-2 ml-24  py-6">
          <div className=" w-16 h-16 rounded-full  items-center justify-center text-xl font-bold">
           <img src={logo} alt="" />
              <span className="text-xl font-bold">SmartFit</span>
          </div>
         
        </div>

        {/* Section Title */}
        <h2 className="text-xs  text-gray-400 px-6 mb-4">MENU</h2>

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
        <div className="mt-auto px-6 text-xs text-white py-6">
          <h3 className="mb-1">SmartFit</h3>
          <p className="mb-4">Be stronger than your excuses. Welcome to SmartFit</p>
         
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
