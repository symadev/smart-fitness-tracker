import { Link } from "react-router-dom";
import { AuthContext } from "./Provider.jsx/AuthContext";
import { useContext, useState } from "react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out successfully"))
      .catch((error) => console.error(error));
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Role-based dashboard link
  const dashboardLink =
    user?.role === "trainer"
      ? "/trainer-dashboard"  // Fixed: match your router path
      : "/dashboard";         // admin or default user dashboard

  return (
    <nav className="relative">
      {/* Navbar background */}
      <div className="navbar sticky bg-gradient-to-r from-[#0f1f60] via-[#1a2b7a] to-[#0f1f60] backdrop-blur-md bg-opacity-95 text-white px-6 py-3 top-0 z-50 shadow-2xl border-b border-white/10">

        {/* Logo */}
        <div className="flex items-center gap-3 flex-1">
          <div className="relative group">
            <img
              className="w-12 h-12 rounded-full object-cover ring-2 ring-yellow-400/50 transition-all duration-300 group-hover:ring-yellow-400 group-hover:scale-110 group-hover:rotate-6"
              src="/assets/gym logo.png"
              alt="SmartFit Logo"
            />
            <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent hover:from-yellow-300 hover:to-yellow-100 transition-all duration-300">
            SmartFit
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-8 items-center">
          <li>
            <NavLinkWithUnderline to="/" text="Home" />
          </li>
          {user ? (
            <>
              <li>
                <NavLinkWithUnderline to={dashboardLink} text="Dashboard" />
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="relative text-white hover:text-red-400 text-[16px] font-medium transition-all duration-300 group"
                >
                  <span className="relative z-10">Logout</span>
                  <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-red-400 to-red-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </li>
            </>
          ) : (
            <li>
              <NavLinkWithUnderline to="/login" text="Login" />
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center space-y-1.5 group"
        >
          <span
            className={`block w-6 h-0.5 bg-yellow-400 transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-yellow-400 transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-yellow-400 transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          ></span>
        </button>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? "opacity-100 z-40" : "opacity-0 pointer-events-none"}`}
        onClick={toggleMenu}
      ></div>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-[#0f1f60] to-[#1a2b7a] transform transition-transform duration-300 z-50 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="pt-20 px-6">
          <ul className="space-y-6">
            <li>
              <Link
                to="/"
                onClick={toggleMenu}
                className="block text-white hover:text-yellow-400 text-lg font-medium py-3 border-b border-white/10 transition-colors duration-300"
              >
                Home
              </Link>
            </li>

            {user ? (
              <>
                <li>
                  <Link
                    to={dashboardLink}
                    onClick={toggleMenu}
                    className="block text-white hover:text-yellow-400 text-lg font-medium py-3 border-b border-white/10 transition-colors duration-300"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="block w-full text-left text-white hover:text-red-400 text-lg font-medium py-3 border-b border-white/10 transition-colors duration-300"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="block text-white hover:text-yellow-400 text-lg font-medium py-3 border-b border-white/10 transition-colors duration-300"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

// Reusable NavLink component
const NavLinkWithUnderline = ({ to, text }) => (
  <Link
    to={to}
    className="relative text-white hover:text-yellow-400 text-[16px] font-medium transition-all duration-300 group"
  >
    <span className="relative z-10">{text}</span>
    <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
  </Link>
);

export default Navbar;
