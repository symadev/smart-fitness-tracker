import logo from "../assets/gym logo.png";

const Navbar = () => {
  return (
    <div className="navbar bg-[#15051c] text-white px-4">
      <div className="flex items-center gap-2 flex-1">
        <img className="w-12 h-12 rounded-full object-cover" src={logo} alt="Logo" />
        <span className="text-xl font-bold">SmartFit</span>
      </div>
      <div className="flex-none text-yellow-400">
        <ul className="menu menu-horizontal px-1 items-center gap-2">
          <li><a className="hover:text-yellow-400 text-[16px]">Dashboard</a></li>
          <li>
            <button className="btn btn-outline btn-warning rounded-xl">Get The App</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
