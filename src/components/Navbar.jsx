import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";  
import { useWishlist } from "../context/WishlistContext"; 
import {
  BellIcon,
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  HeartIcon
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const { cart } = useCart();     
  const { wishlist } = useWishlist(); 
  const cartItemCount = cart.length;
  const wishlistCount = wishlist.length; 
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const readUser = () => {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
      else setUser(null);
    };

    // initial read
    readUser();

    // update on navigation
    const unlisten = () => readUser();

    // update when profile saves (fires from MyProfile)
    window.addEventListener("user-updated", readUser);

    return () => {
      window.removeEventListener("user-updated", readUser);
    };
  }, [location]);

  return (
    <nav className="fixed top-0 left-0 w-full shadow-lg z-50 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
      <div className="w-full px-4 py-3 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center space-x-3">
          <Link to="/">
            <div className="w-11 h-11 rounded-full overflow-hidden border-gray-300 shadow-lg">
              <img src="/image/logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
          </Link>
          <Link to="/" className="text-2xl font-extrabold flex items-baseline">
            <span className="bg-clip-text text-transparent bg-black mr-1">First</span>
            <span className="flex items-baseline">
              <span className="bg-clip-text text-transparent bg-red-600">U</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-pink-700">Shop</span>
            </span>
          </Link>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-6">
          {user ? (
            // Logged in: show only icons
            <>
              {/* NOTIFICATION ICON */}
              <div className="relative cursor-pointer ">
                <BellIcon className="w-6 h-6 text-white hover:text-red-600 transition" />
              </div>

              {/* WISHLIST ICON */}
              <div
                onClick={() => navigate("/wishlist")}
                className="relative cursor-pointer"
              >
                <HeartIcon className="w-7 h-7 text-white hover:text-red-600" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </div>

              {/* USER / PROFILE ICON (and Admin link if applicable) */}
              <div className="relative cursor-pointer">
                <div className="flex items-center gap-3">
                    {user.role === 'superadmin' ? (
                    <Link to="/admin" className="text-white text-sm px-3 py-1 rounded-md bg-black/20 hover:bg-black/30">Super Admin</Link>
                  ) : user.isAdmin ? (
                    <Link to="/admin" className="text-white text-sm px-3 py-1 rounded-md bg-black/20 hover:bg-black/30">Admin</Link>
                  ) : null}
                  {user.isMerchant && !user.isAdmin && (
                    <Link to="/merchant/dashboard" className="text-white text-sm px-3 py-1 rounded-md bg-black/20 hover:bg-black/30">Merchant</Link>
                  )}

                  {/* Show avatar if available */}
                  <Link to={user.isAdmin ? "/admin/profile" : user.isMerchant ? "/merchant/profile" : "/profile"} className="flex items-center gap-2">
                    {user.avatar ? (
                      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm">
                        <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <UserCircleIcon className="w-7 h-7 text-white hover:text-black" />
                    )}
                  </Link>
                </div>
              </div>

              {/* CART ICON */}
              <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
                <ShoppingCartIcon className="w-7 h-7 text-white" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </>
          ) : (
            // Not logged in: show full nav links + icons
            <>
              <ul className="flex items-center space-x-6 font-semibold text-white text-md">
                <li><Link to="/" className="hover:text-black">Home</Link></li>
                <li><Link to="/explore" className="hover:text-black">Explore</Link></li>
                <li><Link to="/blog" className="hover:text-black">Blog</Link></li>
                <li><Link to="/about" className="hover:text-black">About</Link></li>
                <li><Link to="/contact" className="hover:text-black">Contact</Link></li>
              </ul>

              {/* NOTIFICATION ICON */}
              <div className="relative cursor-pointer ">
                <BellIcon className="w-6 h-6 text-white hover:text-red-600 transition" />
              </div>

              {/* WISHLIST ICON */}
              <div
                onClick={() => navigate("/wishlist")}
                className="relative cursor-pointer"
              >
                <HeartIcon className="w-7 h-7 text-white hover:text-red-600" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </div>

              {/* USER / LOGIN ICON */}
              <div className="relative cursor-pointer">
                {user ? (
                  <div className="flex items-center gap-3">
                    {user.isAdmin && (
                      <Link to="/admin" className="text-white text-sm px-3 py-1 rounded-md bg-black/20 hover:bg-black/30">Admin</Link>
                    )}
                    <Link to="/profile">
                      <UserCircleIcon className="w-7 h-7 text-white hover:text-black" />
                    </Link>
                  </div>
                ) : (
                  <Link to="/login">
                    <UserCircleIcon className="w-7 h-7 text-white hover:text-black" />
                  </Link>
                )}
              </div>

              {/* CART ICON */}
              <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
                <ShoppingCartIcon className="w-7 h-7 text-white" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        {/* MOBILE MENU ICONS */}
        <div className="md:hidden flex items-center space-x-5">
          <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
            <ShoppingCartIcon className="w-7 h-6 text-white" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
                {cartItemCount}
              </span>
            )}
          </div>

          <div onClick={() => navigate("/wishlist")} className="relative cursor-pointer">
            <HeartIcon className="w-7 h-6 text-white" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
                {wishlistCount}
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
        className={`fixed top-0 right-0 h-full w-[65%] max-w-[200px] shadow-xl rounded-l-xl transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ background: "linear-gradient(to bottom, #1f2937, #374151, #4b5563)" }}
      >
        <div className="flex justify-end px-4 py-3 border-b border-gray-700">
          <button onClick={() => setIsMenuOpen(false)}>
            <XMarkIcon className="w-7 h-7 text-white" />
          </button>
        </div>

        <ul className="flex flex-col items-start px-6 py-6 space-y-5 text-white font-semibold text-base">
          {user ? (
            // Logged in: show only icon items for quick access
            <>
              <li onClick={() => { navigate("/cart"); setIsMenuOpen(false); }} className="flex items-center gap-2">
                <ShoppingCartIcon className="w-6 h-6 text-white" />
                {cartItemCount > 0 && <span className="ml-2">{cartItemCount}</span>}
              </li>

              <li onClick={() => { navigate("/wishlist"); setIsMenuOpen(false); }} className="flex items-center gap-2">
                <HeartIcon className="w-6 h-6 text-white" />
                {wishlistCount > 0 && <span className="ml-2">{wishlistCount}</span>}
              </li>

              <li onClick={() => { navigate(user?.isAdmin ? '/admin/profile' : user?.isMerchant ? '/merchant/profile' : '/profile'); setIsMenuOpen(false); }} className="flex items-center gap-2">
                <UserCircleIcon className="w-6 h-6 text-white" />
                <span className="ml-2">Profile</span>
              </li>

              <li onClick={() => { /* notifications placeholder */ setIsMenuOpen(false); }} className="flex items-center gap-2">
                <BellIcon className="w-6 h-6 text-white" />
                <span className="ml-2">Notifications</span>
              </li>
            </>
          ) : (
            // Not logged in: show full navigation
            <>
              <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
              <li><Link to="/explore" onClick={() => setIsMenuOpen(false)}>Explore</Link></li>
              <li><Link to="/blog" onClick={() => setIsMenuOpen(false)}>Blog</Link></li>
              <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
              <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
              <li>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <UserCircleIcon className="w-7 h-7 text-white" />
                </Link>
              </li>
              <li onClick={() => { navigate("/wishlist"); setIsMenuOpen(false); }} className="flex items-center gap-2">
                <HeartIcon className="w-6 h-6 text-white" />
                <span>{wishlistCount}</span>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
