import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { CartContext } from "../context/CartContext";

const BudgetPage = () => {
  const { max } = useParams();
  const { addToCart } = useContext(CartContext);

  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [addedItems, setAddedItems] = useState([]);

  const filtered = products.filter((p) => p.price <= Number(max));

  const handleAdd = (product) => {
    addToCart(product);
    setAddedItems((prev) => [...prev, product.id]);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Products Under ₹{max}</h1>

      {filtered.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((product) => {
            const isAdded = addedItems.includes(product.id);

            return (
              <div
                key={product.id}
                className="border p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    className="w-full h-48 object-cover rounded-lg"
                    alt=""
                  />

                  {/* Quick View Button */}
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="absolute bottom-2 right-2 bg-white text-black px-3 py-1 text-xs rounded shadow"
                  >
                    Quick View
                  </button>
                </div>

                <h2 className="mt-3 font-semibold text-lg">{product.name}</h2>

                <p className="text-gray-600 mt-1">
                  ₹{product.price}{" "}
                  {product.oldPrice && (
                    <span className="line-through text-red-400">
                      ₹{product.oldPrice}
                    </span>
                  )}
                </p>

                {/* ADD BUTTON */}
                <button
                  onClick={() => handleAdd(product)}
                  disabled={isAdded}
                  className={`mt-4 w-full py-2 rounded-lg text-white ${
                    isAdded
                      ? "bg-green-500 cursor-default"
                      : "bg-pink-600 hover:bg-pink-700"
                  }`}
                >
                  {isAdded ? "Added ✓" : "Add to Cart"}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl w-80 shadow-lg relative animate-fadeIn">
            <button
              className="absolute top-2 right-2 text-xl"
              onClick={() => setQuickViewProduct(null)}
            >
              ✖
            </button>

            <img
              src={quickViewProduct.image}
              className="w-full h-48 object-cover rounded-lg"
              alt=""
            />

            <h2 className="mt-3 font-bold text-xl">{quickViewProduct.name}</h2>
            <p className="text-lg font-semibold mt-1">
              ₹{quickViewProduct.price}
            </p>

            <p className="text-gray-600 text-sm mt-2">
              ⭐ High-quality product – Limited stock available!
            </p>

            <button
              onClick={() => {
                handleAdd(quickViewProduct);
                setQuickViewProduct(null);
              }}
              className="mt-4 bg-pink-600 text-white px-4 py-2 rounded-lg w-full"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fadeIn {
            animation: fadeIn .25s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default BudgetPage;
