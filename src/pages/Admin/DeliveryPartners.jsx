import React from "react";

const DeliveryPartners = ({ partners = [] }) => {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Delivery Partners</h2>
      {partners.length === 0 ? (
        <p className="text-gray-500">No partners registered</p>
      ) : (
        <ul className="space-y-2">
          {partners.map((p) => (
            <li key={p.uniqueId} className="border p-3 rounded flex justify-between">
              <span>{p.name}</span>
              <span>{p.uniqueId}</span>
              <span>{p.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeliveryPartners;
