import React from "react";

const Profile = ({ user }) => {
  if (!user) return null;
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Profile</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Full Name</p>
          <p className="font-medium">{user.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Mobile</p>
          <p className="font-medium">{user.phone || 'Not provided'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Member since</p>
          <p className="font-medium">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
