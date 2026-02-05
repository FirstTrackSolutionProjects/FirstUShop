import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [addressId, setAddressId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const subtotal = useMemo(() => cart.reduce((t, i) => t + i.price * i.quantity, 0), [cart]);
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  const addresses = JSON.parse(localStorage.getItem(`addresses_${JSON.parse(localStorage.getItem('user')||'null')?.id || 'guest'}`) || '[]');

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return alert('Cart is empty');
    if (!addressId && addresses.length === 0) return alert('Please add an address from Merchant → Addresses');

    setLoading(true);
    try {
      // build order
      const user = JSON.parse(localStorage.getItem('user')) || { id: 'guest' };
      const order = {
        id: Date.now(),
        userId: user.id,
        status: 'Processing',
        items: cart.map(i => ({ id: i.id, name: i.name, qty: i.quantity, price: i.price })),
        amount: Number(total.toFixed(2)),
        address: addresses.find(a => a.id === addressId) || addresses[0] || null,
        paymentMethod,
        date: new Date().toISOString()
      };

      // try backend
      try {
        const res = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(order) });
        if (res.ok) {
          const data = await res.json();
          // clear cart
          clearCart();
          alert(`Order placed: ${data.id}`);
          navigate('/my-orders');
          return;
        }
      } catch (e) {
        // ignore
      }

      // fallback: localStorage
      const saved = JSON.parse(localStorage.getItem('orders') || '[]');
      saved.unshift(order);
      localStorage.setItem('orders', JSON.stringify(saved));

      clearCart();
      alert(`Order placed successfully! Order ID: ${order.id}`);
      navigate('/my-orders');
    } catch (err) {
      console.error(err);
      alert('Could not place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Checkout</h1>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-medium">Delivery Address</h3>
        {addresses.length === 0 ? (
          <p className="text-sm text-gray-500">No addresses found. Add one in Merchant → Addresses.</p>
        ) : (
          <div className="space-y-2 mt-3">
            {addresses.map((a) => (
              <label key={a.id} className="block p-2 border rounded">
                <input type="radio" name="addr" className="mr-2" checked={addressId === a.id || (!addressId && addresses[0].id === a.id)} onChange={() => setAddressId(a.id)} />
                <span className="font-medium">{a.name}</span>
                <div className="text-sm text-gray-600">{a.address} • {a.phone}</div>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-medium">Payment</h3>
        <div className="mt-2 flex gap-3">
          <label className={`p-3 border rounded cursor-pointer ${paymentMethod==='card' ? 'border-orange-400' : ''}`}><input type="radio" name="pm" className="mr-2" checked={paymentMethod==='card'} onChange={() => setPaymentMethod('card')} />Card</label>
          <label className={`p-3 border rounded cursor-pointer ${paymentMethod==='upi' ? 'border-orange-400' : ''}`}><input type="radio" name="pm" className="mr-2" checked={paymentMethod==='upi'} onChange={() => setPaymentMethod('upi')} />UPI</label>
          <label className={`p-3 border rounded cursor-pointer ${paymentMethod==='cod' ? 'border-orange-400' : ''}`}><input type="radio" name="pm" className="mr-2" checked={paymentMethod==='cod'} onChange={() => setPaymentMethod('cod')} />Cash on Delivery</label>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow space-y-2">
        <h3 className="font-medium">Order Summary</h3>
        <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between"><span>GST</span><span>₹{gst.toFixed(2)}</span></div>
        <hr />
        <div className="flex justify-between font-semibold text-lg"><span>Total</span><span>₹{total.toFixed(2)}</span></div>

        <button onClick={handlePlaceOrder} disabled={loading} className="mt-4 w-full py-3 bg-orange-500 text-white rounded">{loading ? 'Placing...' : 'Place Order'}</button>
      </div>
    </div>
  );
};

export default Checkout;