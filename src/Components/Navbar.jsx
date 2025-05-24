import logo from "../assets/gym logo.png";

const Navbar = () => {
  return (
    <div className="navbar bg-[#0f1f60] text-white px-4 sticky top-0 z-50 flex items-center justify-between">
      <div className="flex items-center gap-2 flex-1">
        <img className="w-12 h-12 rounded-full object-cover" src={logo} alt="Logo" />
        <span className="text-xl font-bold">SmartFit</span>
      </div>

      {/* Desktop menu */}
      <ul className="hidden md:flex gap-6 items-center text-yellow-400">
        <li>
          <a href="/login" className="hover:text-yellow-300 text-[16px] cursor-pointer">
            Login
          </a>
        </li>
        <li>
          <a href="/get-app">
            <button className="btn btn-outline btn-warning rounded-xl">Get The App</button>
          </a>
        </li>
      </ul>

      {/* Mobile menu - simple select dropdown */}
      <select
        className="block md:hidden bg-[#0f1f60] text-yellow-400 border border-yellow-400 rounded px-2 py-1"
        onChange={(e) => {
          if (e.target.value) window.location.href = e.target.value;
        }}
        defaultValue=""
      >
        <option value="" disabled>
          Menu
        </option>
        <option value="/login">Login</option>
        <option value="/get-app">Get The App</option>
      </select>
    </div>
  );
};

export default Navbar;
