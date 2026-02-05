// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// /* ================= INFO ROW ================= */
// const Info = ({ label, value }) => (
//   <div className="flex justify-between border-b py-3 text-sm">
//     <span className="text-gray-500">{label}</span>
//     <span className="font-medium text-gray-800">{value || "-"}</span>
//   </div>
// );

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [loadingOrders, setLoadingOrders] = useState(false);

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("Dashboard");

//   const [now, setNow] = useState(new Date());

//   /* EDIT PROFILE STATE */
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({ name: "", email: "" });

//   const navigate = useNavigate();
//   const { logout } = useAuth();

//   /* ================= LIVE TIME ================= */
//   useEffect(() => {
//     const timer = setInterval(() => setNow(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   /* ================= GREETING ================= */
//   const hour = now.getHours();
//   const greeting =
//     hour < 12
//       ? "Good Morning 🌅"
//       : hour < 17
//       ? "Good Afternoon ☀️"
//       : hour < 22
//       ? "Good Evening 🌆"
//       : "Good Night 🌙";

//   /* ================= USER LOAD ================= */
//   useEffect(() => {
//     const stored = localStorage.getItem("user");
//     if (!stored) return navigate("/login");
//     const u = JSON.parse(stored);
//     setUser(u);
//     setFormData({ name: u.name, email: u.email });
//   }, [navigate]);

//   /* ================= ORDERS LOAD ================= */
//   useEffect(() => {
//     if (!user) return;

//     const fetchOrders = async () => {
//       setLoadingOrders(true);
//       try {
//         const res = await fetch("/api/orders");
//         const data = await res.json();
//         setOrders(
//           Array.isArray(data)
//             ? data.filter(
//                 (o) =>
//                   Number(o.userId) ===
//                   Number(user.id || user.userId || user._id)
//               )
//             : []
//         );
//       } catch {
//         setOrders([]);
//       } finally {
//         setLoadingOrders(false);
//       }
//     };

//     fetchOrders();
//   }, [user]);

//   /* ================= LOGOUT ================= */
//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   /* ================= SAVE PROFILE ================= */
//   const handleSaveProfile = () => {
//     const updatedUser = { ...user, ...formData };
//     localStorage.setItem("user", JSON.stringify(updatedUser));
//     setUser(updatedUser);
//     setEditMode(false);
//   };

//   if (!user) return null;

//   const menuItems = [
//     "Dashboard",
//     "My Profile",
//     "My Orders",
//     "My Addresses",
//     "Wishlist",
//     "Support",
//     "Logout",

//   ];

//   return (
//     <div className="h-screen flex bg-gray-100 relative">

//       {/* ================= MOBILE/TABLET OVERLAY ================= */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-30 lg:hidden cursor-pointer"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* ================= SIDEBAR ================= */}
//      <aside
//         className={`fixed lg:static z-40 top-0 left-0 h-full w-64
//         bg-gradient-to-r from-orange-500 to-red-600 text-white flex flex-col
//         mt-16 lg:mt-0
//         transform transition-transform duration-300
//         ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
//         lg:translate-x-0`}
//       >

//         <div className="p-6 border-b border-orange-300 flex justify-between ">
//           <h2 className="text-xl font-bold">My Account</h2>
//           <button
//             className="lg:hidden w-9 h-9 flex items-center justify-center 
//              bg-white text-orange-600 rounded-full shadow 
//              hover:bg-gray-100 transition"
//                aria-label="Close menu"
//             onClick={() => setSidebarOpen(false)}
//           >
//             ✕
//           </button>
//         </div>

//         <nav className="flex-1 py-4 space-y-1">
//           {menuItems.map((item) => (
//             <div
//               key={item}
//                onClick={() => {
//                 if (item === "Logout") {
//                   handleLogout();
//                 } else {
//                   setActiveTab(item);
//                   setSidebarOpen(false);
//                 }
//               }}
//               className={`px-6 py-3 cursor-pointer rounded-l-full ml-3 transition
//               ${
//                 item === "Logout"
//                   ? "text-red-100 hover:bg-red-500 font-semibold"
//                   : activeTab === item
//                   ? "bg-white text-orange-600 font-semibold"
//                   : "hover:bg-yellow-500"
//               }`}
//             >
//               {item}
//             </div>
//           ))}
//         </nav>

     
//       </aside>

//       {/* ================= MAIN ================= */}
//       <main className="flex-1 p-4 md:p-6 overflow-y-auto">

//         {/* Mobile/Tablet Header */}
//         <div className="lg:hidden flex items-center justify-between mb-4">
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="text-2xl font-bold"
//           >
//             ☰
//           </button>
//           <h1 className="font-semibold">{activeTab}</h1>
//         </div>

//         {/* ================= DASHBOARD ================= */}
//         {activeTab === "Dashboard" && (
//           <div className="bg-gradient-to-tr from-purple-100 to-pink-100 p-6 rounded-xl shadow">
//             <h2 className="text-2xl font-semibold">{greeting},</h2>
//             <p className="text-purple-700 text-xl font-bold mt-1">
//               {user.name}
//             </p>
//             <p className="text-gray-600 mt-3">
//               {now.toLocaleDateString("en-IN", {
//                 weekday: "long",
//                 day: "numeric",
//                 month: "long",
//               })}
//             </p>
//             <span className="inline-block mt-2 px-4 py-1 bg-white rounded-full shadow text-sm">
//               {now.toLocaleTimeString()}
//             </span>
//           </div>
//         )}

//             {/* ================= MY PROFILE ================= */}
//       {activeTab === "My Profile" && (
//         <div className="max-w-2xl bg-white rounded-2xl shadow-sm border">

//           {/* HEADER */}
//           <div className="flex items-center justify-between p-6 border-b">
//             <div className="flex items-center gap-4">
//               {/* Avatar */}
//               <div className="w-14 h-14 rounded-full bg-orange-100 text-orange-600 
//                 flex items-center justify-center text-xl font-bold">
//                 {user.name?.charAt(0)?.toUpperCase()}
//               </div>

//               <div>
//                 <h2 className="text-lg font-semibold text-gray-800">
//                   My Profile
//                 </h2>
//                 <p className="text-sm text-gray-500">
//                   Manage your personal information
//                 </p>
//               </div>
//             </div>

//             {!editMode && (
//               <button
//                 onClick={() => setEditMode(true)}
//                 className="px-4 py-2 text-sm bg-orange-500 text-white rounded-lg
//                           hover:bg-orange-600 transition"
//               >
//                 Edit Profile
//               </button>
//             )}
//           </div>

//           {/* BODY */}
//           <div className="p-6">
//             {!editMode ? (
//               <div className="divide-y">
//                 <Info label="Name" value={user.name} />
//                 <Info label="Email" value={user.email} />
//                 <Info label="Phone" value={user.phone} />
//               </div>
//             ) : (
//               <div className="grid gap-5">

//                 {/* NAME */}
//                 <div>
//                   <label className="block text-sm text-gray-500 mb-1">
//                     Full Name
//                   </label>
//                   <input
//                     className="w-full border rounded-lg px-4 py-2 focus:ring-2 
//                               focus:ring-orange-400 outline-none"
//                     value={formData.name}
//                     onChange={(e) =>
//                       setFormData({ ...formData, name: e.target.value })
//                     }
//                   />
//                 </div>

//                 {/* EMAIL */}
//                 <div>
//                   <label className="block text-sm text-gray-500 mb-1">
//                     Email Address
//                   </label>
//                   <input
//                     className="w-full border rounded-lg px-4 py-2 focus:ring-2 
//                   focus:ring-orange-400 outline-none"
//                     value={formData.email}
//                     onChange={(e) =>
//                       setFormData({ ...formData, email: e.target.value })
//                     }
//                   />
//                 </div>

//                 {/* PHONE */}
//                 <div>
//                   <label className="block text-sm text-gray-500 mb-1">
//                     Phone Number
//                   </label>
//                   <input
//                     className="w-full border rounded-lg px-4 py-2 focus:ring-2 
//                     focus:ring-orange-400 outline-none"
//                     value={formData.phone}
//                     onChange={(e) =>
//                       setFormData({ ...formData, phone: e.target.value })
//                     }
//                   />
//                 </div>

//                 {/* ACTIONS */}
//                 <div className="flex justify-end gap-3 pt-4">
//                   <button
//                     onClick={() => setEditMode(false)}
//                     className="px-5 py-2 rounded-lg border text-gray-600 hover:bg-gray-50"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleSaveProfile}
//                     className="px-5 py-2 rounded-lg bg-green-500 text-white
//                     hover:bg-green-600"
//                   >
//                     Save Changes
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}


//         {/* ================= ORDERS ================= */}
//         {activeTab === "My Orders" && (
//           <div className="bg-white p-6 rounded-xl shadow">
//             <h2 className="text-xl font-semibold mb-4">My Orders</h2>

//             {loadingOrders ? (
//               <p>Loading...</p>
//             ) : orders.length === 0 ? (
//               <p className="text-gray-500">No orders yet.</p>
//             ) : (
//               <div className="space-y-3">
//                 {orders.map((o) => (
//                   <div
//                     key={o.id}
//                     className="border rounded p-4 hover:shadow transition"
//                   >
//                     <p className="font-semibold">Order #{o.id}</p>
//                     <p className="text-sm text-gray-500">
//                       Status: {o.status || "Processing"}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* ================= PLACEHOLDERS ================= */}
//         {["My Addresses", "Wishlist", "Support"].includes(activeTab) && (
//           <div className="bg-white p-6 rounded-xl shadow text-gray-500">
//             {activeTab} section coming soon 🚀
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Tabs
import Dashboard from "./Merchant/Dashboard";
import MyProfile from "./Merchant/MyProfile";
import MyOrders from "./Merchant/MyOrders";
import MyAddresses from "./Merchant/MyAddresses";
import Wishlist from "./Merchant/Wishlist";
// import Support from "./Merchant/Support";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const { logout } = useAuth();

  /* ================= USER LOAD ================= */
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(stored));
  }, [navigate]);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  /* ================= BACK TO STORE ================= */
  const handleBackToStore = () => {
    navigate("/"); // 🔁 change to "/merchant/home" if needed
  };

  if (!user) return null;

  const menuItems = [
    "Dashboard",
    "My Profile",
    "My Orders",
    "My Addresses",
    "Wishlist",
    // "Support",
  ];

  /* ================= TAB RENDER ================= */
  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <Dashboard user={user} />;

      case "My Profile":
        return <MyProfile user={user} />;

      case "My Orders":
        return <MyOrders user={user} />;

      case "My Addresses":
        return <MyAddresses user={user} />;

      case "Wishlist":
        return <Wishlist user={user} />;

      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex bg-gray-100 relative">

      {/* ================= OVERLAY (MOBILE) ================= */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed lg:static z-40 top-0 left-0 h-full w-64
        bg-gradient-to-r from-orange-500 to-red-600 text-white flex flex-col
        mt-16 lg:mt-0
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Header */}
        <div className="p-6 border-b border-orange-300 flex justify-between items-center">
          <h2 className="text-xl font-bold">My Account</h2>
          <button
            className="lg:hidden w-9 h-9 flex items-center justify-center
            bg-white text-orange-600 rounded-full shadow"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Menu */}
        <nav className="py-4 space-y-1 flex-1">

          {menuItems.map((item) => (
            <div
              key={item}
              onClick={() => {
                setActiveTab(item);
                setSidebarOpen(false);
              }}
              className={`px-6 py-3 ml-3 rounded-l-full cursor-pointer transition
              ${
                activeTab === item
                  ? "bg-white text-orange-600 font-semibold"
                  : "hover:bg-yellow-500"
              }`}
            >
              {item}
            </div>
          ))}

          {/* BACK TO STORE */}
          <div
            onClick={handleBackToStore}
            className="px-6 py-3 ml-3 mt-4 rounded-l-full cursor-pointer
             hover:bg-yellow-500 transition"
          >
            ← Back to Store
          </div>

          {/* LOGOUT */}
          <div
            onClick={handleLogout}
            className="px-6 py-3 ml-3 mt-2 rounded-l-full cursor-pointer
             hover:bg-red-600 text-white"
          >
            Logout
          </div>
        </nav>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-2xl font-bold"
          >
            ☰
          </button>
          <h1 className="font-semibold">{activeTab}</h1>
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

export default Profile;
