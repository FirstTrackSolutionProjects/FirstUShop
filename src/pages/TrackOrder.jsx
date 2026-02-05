import React, { useState } from 'react';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);

  const handleTrack = () => {
    const saved = JSON.parse(localStorage.getItem('orders') || '[]');
    const found = saved.find(o => String(o.id) === String(orderId));
    if (!found) return alert('Order not found');
    setOrder(found);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Track Order</h1>

      <div className="bg-white p-4 rounded shadow space-y-3">
        <div className="flex gap-2">
          <input value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="Enter Order ID" className="border p-2 rounded w-full" />
          <button onClick={handleTrack} className="px-4 py-2 bg-orange-500 text-white rounded">Track</button>
        </div>

        {order && (
          <div className="mt-4">
            <p><b>Order #{order.id}</b></p>
            <p>Status: <span className="font-medium">{order.status}</span></p>
            <p>Amount: ₹{order.amount}</p>
            <p>Date: {new Date(order.date).toLocaleString()}</p>

            <div className="mt-3">
              <p className="font-medium">Items:</p>
              <ul className="list-disc list-inside text-sm">
                {order.items && order.items.map((it, i) => <li key={i}>{it.name} × {it.qty} — ₹{it.price}</li>)}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;