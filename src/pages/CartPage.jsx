import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
  } = useCart();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Totals
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  const handlePlaceOrder = async () => {
    setLoading(true);

    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        alert("Please log in to place an order");
        navigate("/login");
        return;
      }

      const user = JSON.parse(storedUser);

      const items = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      const totalPrice = Number(total.toFixed(2));

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          items,
          totalPrice,
        }),
      });

      if (!res.ok) throw new Error("Order creation failed");

      const data = await res.json();

      clearCart(); // ✅ clear cart
      alert(`Order placed successfully! Order ID: ${data.id}`);

      // ✅ IMPORTANT: go to order history
      navigate("/my-orders");
    } catch (err) {
      console.error(err);
      alert("Could not place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg">
          Your cart is empty.
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* CART ITEMS */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white rounded-lg shadow flex gap-4 items-center"
              >
                <img
                  src={item.image || item.img || "/image/logo.png"}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                  onError={(e) => { e.target.onerror = null; e.target.src = '/image/logo.png'; }}
                />

                <div className="flex-1">
                  <h2 className="font-semibold text-lg">
                    {item.name}
                  </h2>
                  <p className="text-gray-700 text-sm">
                    ₹ {item.price}
                  </p>

                  <div className="flex items-center gap-3 mt-2">
                    <button
                      className="p-1 bg-gray-200 rounded"
                      onClick={() => decreaseQty(item.id)}
                    >
                      <Minus size={16} />
                    </button>

                    <span className="font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      className="p-1 bg-gray-200 rounded"
                      onClick={() => increaseQty(item.id)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="p-5 bg-white shadow rounded-lg h-fit">
            <h2 className="text-xl font-semibold mb-4">
              Order Summary
            </h2>

            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>₹ {subtotal.toFixed(2)}</p>
              </div>

              <div className="flex justify-between">
                <p>GST (18%)</p>
                <p>₹ {gst.toFixed(2)}</p>
              </div>

              <hr />

              <div className="flex justify-between font-bold text-lg">
                <p>Total</p>
                <p>₹ {total.toFixed(2)}</p>
              </div>
            </div>

            <button onClick={() => navigate('/checkout')} className="w-full mt-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
