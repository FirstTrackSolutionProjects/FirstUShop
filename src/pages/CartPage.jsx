import React from "react";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg shadow flex items-center justify-between"
            >
              {/* Image */}
              <img
                src={item.img}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />

              {/* Info */}
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-gray-700">₹{item.price}</p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
