import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const u = JSON.parse(stored);
        if (!u.isAdmin) navigate('/login');
        setUser(u);
      } else navigate('/login');
    } catch {
      navigate('/login');
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
      

        <main className="md:col-span-3 space-y-6">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-pink-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-extrabold">
              {(user.name || user.username || "A")[0].toUpperCase()}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-semibold">{user.name || user.fullName || user.username}</h1>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-sm text-gray-400 mt-1">{user.role || (user.isAdmin ? 'Administrator' : 'Staff')}</p>
            </div>
            <div className="mt-3 md:mt-0">
              <button onClick={() => navigate('/admin')} className="px-3 py-2 bg-gray-100 rounded-md">Back</button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Account</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{user.name || user.fullName || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Mobile</p>
                <p className="font-medium">{user.phone || user.mobile || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Member since</p>
                <p className="font-medium">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-4 py-2 rounded-md bg-indigo-600 text-white">Manage Users</button>
              <button className="px-4 py-2 rounded-md bg-yellow-500 text-white">View Orders</button>
              <button className="px-4 py-2 rounded-md bg-green-500 text-white">Site Settings</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminProfile;


