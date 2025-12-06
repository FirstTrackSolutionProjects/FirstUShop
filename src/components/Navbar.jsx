import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";   // ✅ FIXED

// Icons
import {
  MagnifyingGlassIcon,
  HeartIcon,
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const { cart } = useCart();     // ✅ FIXED
  const cartItemCount = cart.length;
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full shadow-lg z-50 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
      {/* MAIN ROW */}
      <div className="w-full px-4 py-3 flex items-center justify-between">
        {/* LOGO + BRAND */}
        <div className="flex items-center space-x-3">
          <Link to="/">
            <div className="w-11 h-11 rounded-full overflow-hidden border border-gray-300 shadow-lg">
              <img
                src="/image/logo.png"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

          <Link to="/" className="text-2xl font-extrabold flex gap-1">
            <span className="bg-clip-text text-transparent bg-black">
              First
            </span>
            <span className="bg-clip-text text-transparent bg-blue-600">
              U
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-pink-700">
              Shop
            </span>
          </Link>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex items-center space-x-6 font-semibold text-white text-md">
            <li><Link to="/" className="hover:text-black">Home</Link></li>
            <li><Link to="/explore" className="hover:text-black">Explore</Link></li>
            <li><Link to="/contact" className="hover:text-black">Contact</Link></li>
            <li><Link to="/about" className="hover:text-black">About</Link></li>
            <li><Link to="/login" className="hover:text-black">Log In</Link></li>
          </ul>

          <div className="flex items-center bg-white rounded-full px-3 py-1.5 shadow-inner">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm w-36 placeholder-gray-600"
            />
            <MagnifyingGlassIcon className="h-4 w-4 text-gray-600" />
          </div>

          <HeartIcon className="w-6 h-6 text-white hover:text-red-600 cursor-pointer transition" />

          <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
            <ShoppingCartIcon className="w-7 h-7 text-white" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
                {cartItemCount}
              </span>
            )}
          </div>
        </div>

        {/* MOBILE ICONS */}
        <div className="md:hidden flex items-center space-x-5">
          <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
            <ShoppingCartIcon className="w-7 h-6 text-white" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
                {cartItemCount}
              </span>
            )}
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            {isMenuOpen ? <XMarkIcon className="w-7 h-7" /> : <Bars3Icon className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-[65%] max-w-[200px] shadow-xl rounded-l-xl transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "linear-gradient(to bottom, #1f2937, #374151, #4b5563)",
        }}
      >
        <div className="flex justify-end px-4 py-3 border-b border-gray-700">
          <button onClick={() => setIsMenuOpen(false)}>
            <XMarkIcon className="w-7 h-7 text-white" />
          </button>
        </div>

        <ul className="flex flex-col items-start px-6 py-6 space-y-5 text-white font-semibold text-base">
          <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><Link to="/explore" onClick={() => setIsMenuOpen(false)}>Explore</Link></li>
          <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
          <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
          <li><Link to="/login" onClick={() => setIsMenuOpen(false)}>Log In</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
