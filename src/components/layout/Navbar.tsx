import { Link, NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import { navItems } from "./LayoutData";



const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems("");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium relative z-50">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="logo" />
      </Link>

      {/* Desktop NavLinks */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {navItems.map(({ label, path }) => (
          <NavLink key={path} to={path} className="flex flex-col items-center gap-1">
            <p>{label}</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        ))}
      </ul>

      {/* Icons Section */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          alt="search"
          className="w-5 cursor-pointer"
        />

        {/* Profile */}
        <div className="relative group">
          <img
            onClick={() => {
              if (!token) navigate("/login");
            }}
            src={assets.profile_icon}
            alt="profile"
            className="w-5 cursor-pointer"
          />
          {token && (
            <div className="hidden group-hover:block absolute right-0 pt-4 z-40">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p onClick={() => navigate("/orders")} className="cursor-pointer hover:text-black">Orders</p>
                <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
              </div>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="cart-icon" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="menu"
        />
      </div>

      {/* Sidebar for mobile */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow transition-all duration-300 ease-in-out z-50 ${
          visible ? "w-full max-w-xs" : "w-0"
        } overflow-hidden`}
      >
        <div className="flex flex-col text-gray-600 h-full">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-4 cursor-pointer border-b"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="back" />
            <p>Back</p>
          </div>

          {navItems.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setVisible(false)}
              className="py-3 pl-6 border-b"
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
