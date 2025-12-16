import React, { useState, useMemo, useContext } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import { CartContext } from "../context/CartContext";

// --- Product Data ---
const products = [
  {
    id: 1,
    brand: "Fenty Beauty",
    name: "Pro Filt'r Foundation",
    price: 3499,
    image: "/image/cos1.jpeg",
    category: "Makeup",
    description: "Long-wear, buildable foundation with a natural matte finish.",
  },
  {
    id: 2,
    brand: "Dior",
    name: "J'adore Eau de Perfume",
    price: 12999,
    image: "/image/cos2.jpeg",
    category: "Fragrance",
    description: "An iconic floral fragrance with a sensual feminine touch.",
  },
  {
    id: 3,
    brand: "The Ordinary",
    name: "Niacinamide 10% + Zinc 1%",
    price: 899,
    image: "/image/cos3.jpeg",
    category: "Skincare",
    description: "Reduces blemishes, balances oil & improves skin texture.",
  },
  {
    id: 4,
    brand: "MAC",
    name: "Ruby Woo Lipstick",
    price: 1799,
    image: "/image/cos4.jpeg",
    category: "Makeup",
    description: "Classic matte red lipstick loved by professionals.",
  },
];

const Cosmetic = () => {
  const { cart, addToCart } = useContext(CartContext);

  const [filters, setFilters] = useState({ brand: "All", category: "All" });
  const [quickView, setQuickView] = useState(null);

  const isAdded = (id) => cart.some((i) => i.id === id);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const brandOk = filters.brand === "All" || item.brand === filters.brand;
      const catOk =
        filters.category === "All" || item.category === filters.category;
      return brandOk && catOk;
    });
  }, [filters]);

  const brands = ["All", ...new Set(products.map((p) => p.brand))];
  const categories = ["All", "Makeup", "Skincare", "Fragrance"];

  return (
    <div className="bg-gray-50 min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-500">
            Cosmetic Collection
          </span>
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Premium beauty & skincare products curated for you
        </p>

        {/* Filters */}
        <div className="space-y-8 mb-12">
          <div>
            <h3 className="font-bold mb-3">Brand</h3>
            <div className="flex flex-wrap gap-6">
              {brands.map((b) => (
                <button
                  key={b}
                  onClick={() => setFilters({ ...filters, brand: b })}
                  className={`pb-1 transition
                    ${
                      filters.brand === b
                        ? "text-rose-600 border-b-2 border-rose-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-3">Category</h3>
            <div className="flex flex-wrap gap-6">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilters({ ...filters, category: c })}
                  className={`pb-1 transition
                    ${
                      filters.category === c
                        ? "text-rose-600 border-b-2 border-rose-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
            >
              <div className="relative h-60">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />

                {/* Quick View */}
                <button
                  onClick={() => setQuickView(item)}
                  className="absolute inset-x-0 bottom-3 mx-3 py-2 bg-white rounded-xl text-sm font-semibold opacity-0 group-hover:opacity-100 transition"
                >
                  Quick View
                </button>

                <span className="absolute top-2 right-2 bg-white text-xs px-2 py-1 rounded-full text-rose-600 font-semibold">
                  {item.brand}
                </span>
              </div>

              <div className="p-4 text-center">
                <h3 className="text-sm font-semibold truncate">{item.name}</h3>
                <p className="text-rose-600 font-bold mt-1">₹{item.price}</p>

                <button
                  onClick={() => addToCart(item)}
                  disabled={isAdded(item.id)}
                  className={`mt-3 w-full py-2 rounded-lg font-semibold transition
                    ${
                      isAdded(item.id)
                        ? "bg-green-500 text-white cursor-not-allowed"
                        : "bg-rose-600 text-white hover:bg-rose-700"
                    }`}
                >
                  {isAdded(item.id) ? (
                    <>
                      <FaCheck className="inline mr-1" /> Added
                    </>
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- QUICK VIEW MODAL ---------------- */}
      {quickView && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 relative">
            <button
              onClick={() => setQuickView(null)}
              className="absolute top-4 right-4 text-xl"
            >
              <FaTimes />
            </button>

            <div className="grid md:grid-cols-2 gap-6">
              <img
                src={quickView.image}
                alt={quickView.name}
                className="w-full h-80 object-cover rounded-2xl"
              />

              <div>
                <h2 className="text-2xl font-bold">{quickView.name}</h2>
                <p className="text-gray-500">{quickView.brand}</p>

                <p className="text-rose-600 text-2xl font-bold mt-4">
                  ₹{quickView.price}
                </p>

                <p className="mt-4 text-gray-700">
                  {quickView.description}
                </p>

                <button
                  onClick={() => addToCart(quickView)}
                  disabled={isAdded(quickView.id)}
                  className={`mt-8 w-full py-3 rounded-2xl font-semibold
                    ${
                      isAdded(quickView.id)
                        ? "bg-green-500 text-white"
                        : "bg-rose-600 text-white hover:bg-rose-700"
                    }`}
                >
                  {isAdded(quickView.id) ? "Added to Cart ✓" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cosmetic;
