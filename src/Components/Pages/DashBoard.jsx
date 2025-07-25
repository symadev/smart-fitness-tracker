
import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaDumbbell, FaRobot, FaCog, FaUser, FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/images/gym logo.png";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close sidebar when clicking outside on mobile
  const handleOverlayClick = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  // Close sidebar when navigation link is clicked on mobile
  const handleLinkClick = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative">
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={handleOverlayClick}
        />
      )}

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-0.5">
              <div className="w-full h-full flex items-center justify-center">
                <img src={logo} alt="SmartFit Logo" className="w-6 h-6 object-contain" />
              </div>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SmartFit
            </span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? (
              <FaTimes className="text-lg" />
            ) : (
              <FaBars className="text-lg" />
            )}
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`
        ${isMobile ? 'fixed' : 'relative'} 
        ${isMobile && !isSidebarOpen ? '-translate-x-full' : 'translate-x-0'}
        ${isMobile ? 'top-0 left-0 h-full w-80' : 'w-72 min-h-screen'}
        bg-[#0f1f60] text-white flex flex-col shadow-2xl z-50 
        transition-transform duration-300 ease-in-out overflow-hidden
      `}>
        
        {/* Mobile Close Button */}
        {isMobile && (
          <div className="flex justify-end p-4 lg:hidden">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
              aria-label="Close menu"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>
        )}
        
        {/* Logo Section */}
        <div className={`relative z-10 flex flex-col items-center px-6 border-b border-slate-700/50 ${isMobile ? 'py-4' : 'py-8'}`}>
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-0.5 mb-3 shadow-lg">
            <div className="w-full h-full flex items-center justify-center">
              <img src={logo} alt="SmartFit Logo" className="w-12 h-12 object-contain" />
            </div>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            SmartFit
          </span>
          <span className="text-sm text-slate-400 mt-1">Fitness Dashboard</span>
        </div>

        {/* Section Title */}
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Navigation Menu
          </h2>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
          <SidebarLink 
            to="/dashboard/home" 
            icon={<FaHome />} 
            text="Dashboard Home" 
            isMain={true}
            onClick={handleLinkClick}
          />
          <SidebarLink 
            to="/dashboard/workouts" 
            icon={<FaDumbbell />} 
            text="Workout Logs"
            onClick={handleLinkClick}
          />
          <SidebarLink 
            to="/dashboard/user" 
            icon={<FaUser />} 
            text="Manage Profile"
            onClick={handleLinkClick}
          />
          
          {/* Divider */}
          <div className="my-4 mx-2">
            <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
          </div>
          
          <SidebarLink 
            to="/" 
            icon={<FaHome />} 
            text="Main Home" 
            isSecondary={true}
            onClick={handleLinkClick}
          />
        </nav>

        {/* Footer */}
        <div className="relative z-10 mt-auto px-6 py-6 border-t border-slate-700/50">
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg p-4 backdrop-blur-sm border border-slate-600/30">
            <h3 className="font-semibold text-white mb-1">SmartFit Pro</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Be stronger than your excuses. Transform your fitness journey with smart insights.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`
        flex-1 relative overflow-hidden
        ${isMobile ? 'pt-20' : ''}
        transition-all duration-300
      `}>
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20"></div>
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59 130 246) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        ></div>
        
        {/* Content Area */}
        <div className="relative z-10 p-4 sm:p-6 lg:p-8 min-h-screen">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const SidebarLink = ({ to, icon, text, isMain, isSecondary, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => {
        const baseClasses = "flex items-center gap-4 px-4 py-3 rounded-xl w-full transition-all duration-300 group relative overflow-hidden touch-manipulation";
        
        if (isActive) {
          return `${baseClasses} bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 text-white shadow-lg transform scale-[1.02]`;
        }
        
        if (isMain) {
          return `${baseClasses} bg-slate-800/50 text-slate-200 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 hover:text-white border border-slate-700/50 hover:border-blue-500/30 active:scale-95`;
        }
        
        if (isSecondary) {
          return `${baseClasses} bg-slate-800/30 text-slate-300 hover:bg-slate-700/50 hover:text-slate-200 active:scale-95`;
        }
        
        return `${baseClasses} bg-slate-800/30 text-slate-300 hover:bg-gradient-to-r hover:from-slate-700/50 hover:to-slate-600/50 hover:text-white active:scale-95`;
      }}
    >
      {/* Hover effect background */}
      <span className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300 rounded-xl"></span>
      
      {/* Icon */}
      <span className="text-lg relative z-10 transition-transform duration-200 group-hover:scale-110 flex-shrink-0">
        {icon}
      </span>
      
      {/* Text */}
      <span className="font-medium relative z-10 truncate">{text}</span>
      
      {/* Active indicator dot */}
      <NavLink to={to}>
        {({ isActive }) => 
          isActive && (
            <span className="absolute right-3 w-2 h-2 bg-white rounded-full shadow-lg animate-pulse flex-shrink-0"></span>
          )
        }
      </NavLink>
    </NavLink>
  );
};

export default Dashboard;