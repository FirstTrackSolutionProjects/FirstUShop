import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { EyeIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

const ProductCard = ({ item }) => {
  const { cart, addToCart } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);

  const isAdded = cart.some((p) => p.id === item.id);

  return (
    <>
      <div className="border rounded-xl p-3 shadow-sm hover:shadow-md transition">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-44 object-cover rounded-lg"
        />

        <h3 className="font-semibold mt-2">{item.name}</h3>
        <p className="text-lg font-bold text-indigo-600">₹{item.price}</p>
        <p className="text-sm line-through text-gray-500">₹{item.oldPrice}</p>

        <div className="flex gap-2 mt-3">
          {/* ADD TO CART BUTTON */}
          {isAdded ? (
            <button
              className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold cursor-default"
            >
              ✓ Added
            </button>
          ) : (
            <button
              onClick={() => addToCart(item)}
              className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              Add to Cart
            </button>
          )}

          {/* QUICK VIEW */}
          <button
            onClick={() => setShowModal(true)}
            className="p-2 border rounded-lg hover:bg-gray-100"
          >
            <EyeIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* QUICK VIEW MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white w-80 p-4 rounded-xl">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-lg"
            />

            <h2 className="font-bold text-xl mt-2">{item.name}</h2>
            <p className="text-lg font-bold text-indigo-600">₹{item.price}</p>
            <p className="text-sm text-gray-500 line-through">₹{item.oldPrice}</p>

            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
