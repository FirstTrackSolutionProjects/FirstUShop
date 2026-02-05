import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

const AdminSidebar = ({ className = "", selectedView = "dashboard", onSelect }) => {
  const navigate = useNavigate();
  const [openMobile, setOpenMobile] = useState(false);
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkClass = (name) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
      selectedView === name
        ? (user && user.role === 'superadmin' ? "bg-white text-black font-semibold" : "bg-white text-orange-600 font-semibold")
        : "text-white/90 hover:bg-white/10"
    }`;

  const MenuButtons = ({ mobile = false }) => {
    // Super Admin gets a focused set of capabilities
    if (user && user.role === 'superadmin') {
      return (
        <>
          <button onClick={() => onSelect("dashboard")} className={linkClass("dashboard")}>📊 Dashboard</button>
          <button onClick={() => onSelect("analytics")} className={linkClass("analytics")}>📈 Analytics</button>
          <button onClick={() => onSelect("users")} className={linkClass("users")}>👥 Users</button>
          <button onClick={() => onSelect("admin-management")} className={linkClass("admin-management")}>⚙️ Admin Management</button>
          <button onClick={() => onSelect("settings")} className={linkClass("settings")}>🔧 Settings</button>
          <button onClick={() => onSelect("security-logs")} className={linkClass("security-logs")}>� Security Logs</button>
          <button onClick={() => onSelect("profile")} className={linkClass("profile")}>👤 Profile</button>
        </>
      );
    }

    // Regular admin menu
    return (
      <>
        <button onClick={() => onSelect("dashboard")} className={linkClass("dashboard")}>Dashboard</button>
        <button onClick={() => onSelect("analytics")} className={linkClass("analytics")}>Analytics</button>
        <button onClick={() => onSelect("orders")} className={linkClass("orders")}>Orders</button>
        <button onClick={() => onSelect("products")} className={linkClass("products")}>Products</button>
        <button onClick={() => onSelect("partners")} className={linkClass("partners")}>Delivery Partners</button>
        <button onClick={() => onSelect("hero")} className={linkClass("hero")}>Hero Manager</button>
        <button onClick={() => onSelect("profile")} className={linkClass("profile")}>Profile</button>
      </>
    );
  };


  return (
    <aside className={className}>
      {/* Desktop */}
      <div className="hidden md:block bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl p-6">
        <div className="mb-6 text-center">
          <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center font-bold text-xl ${user && user.role === 'superadmin' ? 'bg-black text-white' : 'bg-white text-orange-600'}`}>
            {user && user.role === 'superadmin' ? 'SA' : 'A'}
          </div>
          <p className="mt-3 font-semibold">{user && user.role === 'superadmin' ? 'Super Admin' : 'Admin'}</p>
          <p className="text-xs opacity-90">{user && user.role === 'superadmin' ? 'Platform owner' : 'Manage store'}</p>
        </div>

        <nav className="space-y-2">
          <MenuButtons />
        </nav>

        <button
          onClick={handleLogout}
          className="mt-6 w-full px-3 py-3 rounded-lg bg-white text-red-600 font-semibold hover:bg-white/90"
        >
          Logout
        </button>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="flex items-center justify-between bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl p-3">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${user && user.role === 'superadmin' ? 'bg-black text-white' : 'bg-white text-orange-600'}`}>
              {user && user.role === 'superadmin' ? 'SA' : 'A'}
            </div>
            <div>
              <p className="text-sm font-semibold">{user && user.role === 'superadmin' ? 'Super Admin' : 'Admin'}</p>
              <p className="text-xs opacity-90">{user && user.role === 'superadmin' ? 'Platform owner' : 'Manage store'}</p>
            </div>
          </div>
          <button
            onClick={() => setOpenMobile(!openMobile)}
            className="px-3 py-2 bg-white/20 rounded-md"
          >
            {openMobile ? "Close" : "Menu"}
          </button>
        </div>

        {openMobile && (
          <div className="mt-3 bg-white rounded-xl shadow p-3 space-y-2">
            <MenuButtons />
            <button
              onClick={handleLogout}
              className="w-full px-3 py-2 rounded-md bg-red-600 text-white"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default AdminSidebar;
