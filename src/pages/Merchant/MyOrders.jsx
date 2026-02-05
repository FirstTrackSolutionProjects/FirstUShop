import React, { useEffect, useState } from "react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(saved);
  }, []);

  const filtered = orders.filter((o) => (filter === "all" ? true : o.status === filter));

  if (orders.length === 0) {
    return <p className="text-center text-gray-500">No orders yet</p>;
  }

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">My Orders</h2>
        <select className="border rounded p-1" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {filtered.map((o) => (
        <div key={o.id} className="bg-white p-5 rounded-2xl shadow">
          <div className="flex justify-between">
            <div>
              <p className="font-semibold">Order #{o.id}</p>
              <p className="text-sm text-gray-500">{new Date(o.date).toLocaleString()}</p>
            </div>

            <span className="text-sm font-medium text-green-600">{o.status}</span>
          </div>

          <div className="flex justify-between items-center mt-3">
            <p className="font-semibold">₹{o.amount}</p>
            <button onClick={() => setSelected(o)} className="text-orange-500 text-sm">View Details →</button>
          </div>
        </div>
      ))}

      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white max-w-md w-full p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Order #{selected.id}</h3>
              <button onClick={() => setSelected(null)} className="text-gray-500">Close</button>
            </div>

            <div className="space-y-2 text-sm">
              <p><b>Date:</b> {new Date(selected.date).toLocaleString()}</p>

              <div className="flex items-center gap-3">
                <b>Status:</b>
                <span className="px-2 py-1 rounded bg-gray-100">{selected.status}</span>
                {/* allow merchants to update status */}
                {JSON.parse(localStorage.getItem('user') || 'null')?.isMerchant && (
                  <select value={selected.status} onChange={(e) => setSelected({ ...selected, status: e.target.value })} className="ml-2 border rounded px-2 py-1">
                    {['Processing','Shipped','Delivered','Cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                )}
              </div>

              <p><b>Amount:</b> ₹{selected.amount}</p>

              <div>
                <p className="font-medium mt-2">Items:</p>
                {selected.items && selected.items.length > 0 ? (
                  <ul className="list-disc list-inside text-sm">
                    {selected.items.map((it, i) => (
                      <li key={i}>{it.name} × {it.qty} — ₹{it.price}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No item details available</p>
                )}
              </div>

              {/* For merchants: save status */}
              {JSON.parse(localStorage.getItem('user') || 'null')?.isMerchant && (
                <div className="pt-3">
                  <button onClick={() => {
                    // persist status change
                    const saved = JSON.parse(localStorage.getItem('orders')||'[]');
                    const updated = saved.map(o => o.id === selected.id ? selected : o);
                    localStorage.setItem('orders', JSON.stringify(updated));
                    setSelected(null);
                    window.location.reload();
                  }} className="py-2 px-3 bg-orange-500 text-white rounded">Save status</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
