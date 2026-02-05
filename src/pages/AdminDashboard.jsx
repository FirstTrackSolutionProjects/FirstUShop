import React, { useEffect, useState } from "react";
import AdminHeroManager from "../components/AdminHeroManager";
import AdminSidebar from "../components/AdminSidebar";
// Admin views
import AdminProducts from './Admin/Products';
import AdminOrders from './Admin/Orders';

import Users from './Admin/User';
import AdminManagement from './SuperAdmin/AdminManagement';
import SuperDashboard from './SuperAdmin/SuperDashboard';
import Settings from './SuperAdmin/Settings';
import SecurityLogs from './SuperAdmin/SecurityLogs';
import Analytics from './SuperAdmin/Analytics';
import SuperUsers from './SuperAdmin/User';
import SuperProfile from './SuperAdmin/Profile';
import { useNavigate } from "react-router-dom";
import { getProductsForUser, saveProductForUser } from "../utils/productStorage";
import { getDeliveryPartners, saveDeliveryPartner, updateDeliveryPartner } from "../utils/deliveryStorage";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [partners, setPartners] = useState([]);

  const navigate = useNavigate();
  const [view, setView] = useState("dashboard");
  // If Super Admin, expose Admin Management view
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [newPartnerName, setNewPartnerName] = useState("");
  const [newPartnerMobile, setNewPartnerMobile] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    // 🔐 Frontend Admin Protection
    if (!token || !user || !user.isAdmin) {
      navigate("/login");
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const fetchAdminData = async () => {
      setLoading(true);
      try {
        const [usersRes, ordersRes, productsRes] = await Promise.all([
          fetch("/api/users", { headers }),
          fetch("/api/orders", { headers }),
          fetch("/api/products", { headers }),
        ]);

        if (!usersRes.ok) throw new Error("Failed to fetch users");
        if (!ordersRes.ok) throw new Error("Failed to fetch orders");

        const usersData = await usersRes.json();
        const ordersData = await ordersRes.json();
        const productsData = await productsRes.json();

        setUsers(Array.isArray(usersData) ? usersData : []);
        setOrders(Array.isArray(ordersData) ? ordersData : []);

        // Merge server products with any locally saved products for the current admin (or creator)
        let merged = Array.isArray(productsData) ? productsData : [];
        try {
          const admin = JSON.parse(localStorage.getItem('user')) || null;
          if (admin && admin.id) {
            const localSaved = getProductsForUser(admin.id);
            // append localSaved items that aren't present on server
            const existingIds = new Set(merged.map((p) => p.id || p.sku));
            localSaved.forEach((lp) => {
              const key = lp.id || lp.sku;
              if (key && !existingIds.has(key)) merged.push(lp);
            });
          }
        } catch {}

        setProducts(merged);
        // load persisted delivery partners
        try {
          const localPartners = getDeliveryPartners();
          setPartners(Array.isArray(localPartners) ? localPartners : []);
        } catch {}
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [navigate]);

  const AdminProfileInline = () => {
    let admin = null;
    try {
      admin = JSON.parse(localStorage.getItem('user')) || null;
    } catch {
      admin = null;
    }

    if (!admin) return <p className="text-gray-500">No admin data</p>;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Full Name</p>
          <p className="font-medium">{admin.name || admin.fullName || admin.username || '-'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{admin.email || '-'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Mobile</p>
          <p className="font-medium">{admin.phone || admin.mobile || 'Not provided'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Member since</p>
          <p className="font-medium">{admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : '-'}</p>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading Admin Dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-100 relative">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row">
        <div className="md:w-64 flex-shrink-0">
          <AdminSidebar selectedView={view} onSelect={setView} />
        </div>

        <main className="flex-1 p-4 md:p-6 space-y-6">
          {/* Header */}
          <div className="bg-gradient-to-tr from-pink-200 to-purple-200 p-6 rounded-2xl shadow-lg text-purple-700">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/")}
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                >
                  Go to Website
                </button>
              </div>
            </div>
          </div>

          {/* Render content based on selected view */}
          {view === 'dashboard' && user && user.role === 'superadmin' ? (
            <SuperDashboard onNavigate={setView} />
          ) : view === 'dashboard' && (
            <>
              <div className="bg-white rounded-2xl shadow p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div>
                    <p className="text-sm text-gray-500">Total Users</p>
                    <p className="text-2xl font-bold">{users.length}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <p className="text-2xl font-bold">{orders.length}</p>
                  </div>

                  <div className="text-sm text-gray-500 text-right md:text-left">
                    <p className="text-sm text-gray-500">Revenue (Paid Orders)</p>
                    <p className="text-2xl font-bold">₹{orders.filter(o => o.isPaid).reduce((sum,o) => sum + Number(o.totalPrice || 0), 0)}</p>
                  </div>
                </div>



              </div>

            </>
          )}

              {user && user.role === 'superadmin' && view === 'analytics' ? (
        <section className="bg-white shadow rounded-xl p-6 space-y-6">
          <Analytics />
        </section>
      ) : view === "analytics" && (
        <section className="bg-white shadow rounded-xl p-6 space-y-6">
          <h2 className="text-xl font-semibold">Admin Analytics</h2>

          {/* Top Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-indigo-50">
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-bold text-indigo-600">
                {users.length}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-green-50">
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-green-600">
                {orders.length}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-yellow-50">
              <p className="text-sm text-gray-500">Total Products</p>
              <p className="text-2xl font-bold text-yellow-600">
                {products.length}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-pink-50">
              <p className="text-sm text-gray-500">Revenue (Paid Orders)</p>
              <p className="text-2xl font-bold text-pink-600">
                ₹
                {orders
                  .filter((o) => o.isPaid)
                  .reduce((sum, o) => sum + (o.totalPrice || 0), 0)}
              </p>
            </div>
          </div>

          {/* Charts Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Orders Overview</h3>
              <div className="h-40 flex items-center justify-center text-gray-400">
                Chart will be added here
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Product Growth</h3>
              <div className="h-40 flex items-center justify-center text-gray-400">
                Chart will be added here
              </div>
            </div>
          </div>
        </section>
      )}


          {view === 'orders' && (
            <section className="bg-white shadow rounded-xl p-6">
              <AdminOrders />
            </section>
          )}

          {user && user.role === 'superadmin' && view === 'users' ? (
            <section className="bg-white shadow rounded-xl p-6">
              <SuperUsers />
            </section>
          ) : view === 'users' && (
            <section className="bg-white shadow rounded-xl p-6">
              <Users />
            </section>
          )}

          {view === 'partners' && (
            <section className="bg-white shadow rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Delivery Partners Management</h2>

              <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                <div className="md:col-span-1 bg-white rounded-lg p-4 shadow border-l-4 border-pink-500">
                  <p className="text-sm text-gray-500">Total Partners Issued</p>
                  <p className="text-2xl font-bold mt-2">{partners.length}</p>
                </div>

                <div className="md:col-span-2 bg-white rounded-lg p-4 shadow">
                  <h3 className="font-medium mb-3">Issue New ID</h3>
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <input value={newPartnerName} onChange={(e) => setNewPartnerName(e.target.value)} placeholder="Partner Name" className="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-200" />
                    <input value={newPartnerMobile} onChange={(e) => setNewPartnerMobile(e.target.value)} placeholder="Mobile Number" className="w-48 px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-200" />
                    <button
                      onClick={() => {
                        const name = newPartnerName.trim();
                        const mobile = newPartnerMobile.trim();
                        if (!name || !mobile) return alert('Provide name and mobile');
                        const uniqueId = `DP-${Date.now()}-${Math.floor(Math.random()*900)+100}`;
                        const partner = { name, mobile, uniqueId, status: 'Active', joinedDate: new Date().toISOString() };
                        saveDeliveryPartner(partner);
                        setPartners((s) => [partner, ...s]);
                        setNewPartnerName('');
                        setNewPartnerMobile('');
                      }}
                      className="px-4 py-2 rounded-md bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold shadow"
                    >
                      Generate Unique ID
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow">
                <h3 className="font-medium mb-3">Registered Partners</h3>
                {partners.length === 0 ? (
                  <p className="text-gray-500">No partners registered</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="text-sm text-indigo-700 bg-indigo-50">
                          <th className="py-3 px-4">Name</th>
                          <th className="py-3 px-4">Unique ID</th>
                          <th className="py-3 px-4">Mobile</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">Joined Date</th>
                          <th className="py-3 px-4">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {partners.map((p, idx) => (
                          <tr key={p.uniqueId} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}>
                            <td className="py-3 px-4">{p.name}</td>
                            <td className="py-3 px-4"><span className="bg-gray-100 px-2 py-1 rounded text-xs">{p.uniqueId}</span></td>
                            <td className="py-3 px-4">{p.mobile}</td>
                            <td className="py-3 px-4">{p.status === 'Active' ? <span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs">Active</span> : <span className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs">{p.status}</span>}</td>
                            <td className="py-3 px-4">{p.joinedDate ? new Date(p.joinedDate).toLocaleDateString() : '-'}</td>
                            <td className="py-3 px-4">
                              <button onClick={() => {
                                if (!confirm('Terminate this partner?')) return;
                                const updated = updateDeliveryPartner(p.uniqueId, { status: 'Terminated' });
                                setPartners(updated);
                              }} className="px-3 py-1 rounded bg-red-500 text-white">Terminate</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>
          )}

          {view === 'products' && (
            <section className="bg-white shadow rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Product Management</h2>
              <AdminProducts />
            </section>
          )}





          {view === 'hero' && (
            <section className="bg-white shadow rounded-xl p-6">
              <AdminHeroManager />
            </section>
          )}

          {view === 'profile' && (
            <section className="bg-white shadow rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Profile</h2>
              <AdminProfileInline />
            </section>
          )}

          {/* Super Admin: Admin Management, Settings and Security logs */}
          {view === 'admin-management' && user && user.role === 'superadmin' && (
            <section className="bg-white shadow rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Admin Management</h2>
              <AdminManagement />
            </section>
          )}

          {view === 'settings' && user && user.role === 'superadmin' && (
            <section className="bg-white shadow rounded-xl p-6">
              <Settings />
            </section>
          )}

          {view === 'security-logs' && user && user.role === 'superadmin' && (
            <section className="bg-white shadow rounded-xl p-6">
              <SecurityLogs />
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
