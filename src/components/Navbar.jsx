import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Make sure this path is correct

// Heroicons
import {
  MagnifyingGlassIcon,
  HeartIcon,
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative shadow-lg z-50 bg-gradient-to-r from-rose-900 via-pink-700 to-red-600">
      {/* Main Row */}
      <div className="w-full px-4 py-3 flex items-center justify-between">
        {/* LEFT — LOGO */}
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
          <Link
            to="/"
            className="text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400  tracking-wide"
          >
            First UShop
          </Link>
        </div>

        {/* RIGHT — DESKTOP ITEMS */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Menu Links */}
          <ul className="flex items-center space-x-6 font-medium text-gray-100 text-sm">
            <li>
              <Link to="/" className="hover:text-gray-900 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/explore" className="hover:text-gray-900 transition">
                Explore
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-900 transition">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-900 transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-gray-900 transition">
                Log In
              </Link>
            </li>
          </ul>

          {/* Search Box */}
          <div className="flex items-center bg-white rounded-full px-3 py-1.5 shadow-inner">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm w-36 placeholder-gray-600"
            />
            <MagnifyingGlassIcon className="h-4 w-4 text-gray-600" />
          </div>

          {/* Heart */}
          <HeartIcon className="w-6 h-6 text-gray-100 hover:text-red-500 cursor-pointer transition" />

          {/* Cart */}
          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer"
          >
            <ShoppingCartIcon className="w-7 h-7 text-gray-100" />
            {cart.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-white text-black text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>
        </div>

        {/* RIGHT — MOBILE ICONS */}
        <div className="md:hidden flex items-center space-x-5">
          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer"
          >
            <ShoppingCartIcon className="w-7 h-6 text-white" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] rounded-full h-3.5 w-3.5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white"
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-7 h-7" />
            ) : (
              <Bars3Icon className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-[65%] max-w-[240px] shadow-xl rounded-l-xl transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: "linear-gradient(to bottom, #ff93da, #aa179b)" }}
      >
        {/* Close Button */}
        <div className="flex justify-end px-4 py-3 border-b border-gray-300">
          <button onClick={() => setIsMenuOpen(false)}>
            <XMarkIcon className="w-7 h-7 text-gray-800" />
          </button>
        </div>

        {/* Mobile Menu Links */}
        <ul className="flex flex-col items-start px-6 py-6 space-y-5 text-gray-800 font-semibold text-base">
          <li>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/explore" onClick={() => setIsMenuOpen(false)}>
              Explore
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              Log In
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
