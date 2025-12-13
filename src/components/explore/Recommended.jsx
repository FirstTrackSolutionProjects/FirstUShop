import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";

const recommendedProducts = [
  { id: 1, name: "Leather Wallet", price: 799, image: "https://images.unsplash.com/photo-1593032465172-032e5a4cba40?auto=format&fit=crop&w=500&q=80", tag: "Top Pick" },
  { id: 2, name: "Bluetooth Speaker", price: 1499, image: "https://images.unsplash.com/photo-1583224150018-93a7d2dbf9c3?auto=format&fit=crop&w=500&q=80", tag: "Trending" },
  { id: 3, name: "Sneakers", price: 2599, image: "https://images.unsplash.com/photo-1585386959984-a4155225d9d2?auto=format&fit=crop&w=500&q=80", tag: "Hot" },
  { id: 4, name: "Sunglasses", price: 1299, image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=500&q=80", tag: "New" },
];

const Recommended = ({search}) => {
  const { addToCart } = useContext(CartContext);

  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Track added items
  const [addedItems, setAddedItems] = useState([]);

  const handleAdd = (product) => {
    addToCart(product);
    setAddedItems([...addedItems, product.id]);
  };
  const filteredProducts = recommendedProducts.filter((p) =>
  p.name.toLowerCase().includes(search.toLowerCase())
);

  return (
    <div className="mb-10 px-2 md:px-0">
      <h3 className="text-2xl md:text-3xl font-bold mb-4">✨ Recommended for You</h3>

      <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-2 scroll-smooth">
        {filteredProducts.map((product) => {
          const isAdded = addedItems.includes(product.id);

          return (
            <div
              key={product.id}
              className="min-w-[220px] bg-white rounded-2xl shadow-md overflow-hidden flex-shrink-0 group transition transform hover:scale-105 hover:shadow-xl"
            >
              {/* IMAGE */}
              <div className="relative h-40 md:h-48 w-full overflow-hidden cursor-pointer">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                {/* Tag */}
                {product.tag && (
                  <span className="absolute top-2 left-2 text-xs bg-indigo-600 text-white px-2 py-1 rounded-full shadow">
                    {product.tag}
                  </span>
                )}

                {/* Quick View Button */}
                <button
                  onClick={() => setQuickViewProduct(product)}
                  className="absolute bottom-2 right-2 px-3 py-1 bg-white text-black text-xs rounded shadow"
                >
                  Quick View
                </button>
              </div>

              {/* DETAILS */}
              <div className="p-3 md:p-4">
                <h4 className="text-sm md:text-base font-semibold text-gray-800 truncate">
                  {product.name}
                </h4>
                <p className="text-lg md:text-xl font-bold text-gray-900 mt-1">
                  ₹{product.price}
                </p>

                {/* ADD → ADDED BUTTON */}
                <button
                  onClick={() => handleAdd(product)}
                  className={`mt-3 w-full py-2 rounded-lg text-sm ${
                    isAdded
                      ? "bg-green-500 cursor-default"
                      : "bg-pink-600 hover:bg-pink-700"
                  } text-white`}
                  disabled={isAdded}
                >
                  {isAdded ? "Added ✓" : "Add to Cart"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* SCROLLBAR HIDE */}
     <style>
      {`
        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.25s ease-in-out; }
      `}
      </style>


      
     {/* QUICK VIEW MODAL */}
        {quickViewProduct && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div className="bg-white p-5 rounded-2xl w-full max-w-md shadow-2xl relative animate-fadeIn">

              {/* Close Button */}
              <button
                className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
                onClick={() => setQuickViewProduct(null)}
              >
                ✖
              </button>

              {/* PRODUCT IMAGE */}
              <div className="w-full h-56 rounded-xl overflow-hidden shadow">
                <img
                  src={quickViewProduct.image}
                  className="w-full h-full object-cover"
                  alt={quickViewProduct.name}
                />
              </div>

              {/* TITLE */}
              <h2 className="mt-4 font-bold text-2xl text-gray-800">
                {quickViewProduct.name}
              </h2>

              {/* PRICE */}
              <p className="text-xl font-semibold text-pink-600 mt-1">
                ₹{quickViewProduct.price}
              </p>

              {/* CATEGORY / TAG */}
              <span className="mt-2 inline-block text-xs bg-indigo-600 text-white px-2 py-1 rounded-full shadow">
                {quickViewProduct.tag || "Top Pick"}
              </span>

              {/* RATING */}
              <div className="flex items-center gap-1 mt-3">
                ⭐⭐⭐⭐☆
                <span className="text-sm text-gray-500">(4.0)</span>
              </div>

              {/* DESCRIPTION */}
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                High-quality {quickViewProduct.name} with premium build and stylish design.
                Perfect for everyday use and long-term durability.
              </p>

              {/* ADD BUTTON */}
              <button
                onClick={() => {
                  handleAdd(quickViewProduct);
                  setQuickViewProduct(null);
                }}
                className="mt-5 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-xl w-full text-center font-semibold shadow-md"
              >
                Add to Cart
              </button>

            </div>
          </div>
        )}

    </div>
  );
};

export default Recommended;
