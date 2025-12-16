import React, { useState, useMemo, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FaTimes, FaCheck } from "react-icons/fa";

// --- Accessories Data ---
const accessories = [
  {
    id: 1,
    brand: "Fossil",
    name: "Leather Belt",
    price: 1299,
    image: "/image/a1.jpeg",
    category: "Belt",
    description: "Premium genuine leather belt for everyday and formal wear."
  },
  {
    id: 2,
    brand: "Ray-Ban",
    name: "Aviator Sunglasses",
    price: 4499,
    image: "/image/a2.jpeg",
    category: "Sunglasses",
    description: "Classic aviator sunglasses with UV protection."
  },
  {
    id: 3,
    brand: "Titan",
    name: "Wallet",
    price: 899,
    image: "/image/a3.jpeg",
    category: "Wallet",
    description: "Compact and stylish wallet with multiple compartments."
  },
  {
    id: 4,
    brand: "Puma",
    name: "Cap",
    price: 599,
    image: "/image/a4.jpeg",
    category: "Cap",
    description: "Sporty cap with breathable fabric for daily use."
  },
  {
    id: 5,
    brand: "Fossil",
    name: "Bracelet",
    price: 1199,
    image: "/image/a5.jpeg",
    category: "Bracelet",
    description: "Minimal bracelet with a premium metal finish."
  },
  {
    id: 6,
    brand: "Ray-Ban",
    name: "Wayfarer Sunglasses",
    price: 5299,
    image: "/image/a6.jpeg",
    category: "Sunglasses",
    description: "Iconic wayfarer sunglasses with bold styling."
  },
];

const Accessories = () => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const [filters, setFilters] = useState({ brand: "All", category: "All" });
  const [quickView, setQuickView] = useState(null);

  const isInCart = (id) => cart.some((item) => item.id === id);

  const brands = ["All", ...new Set(accessories.map((i) => i.brand))];
  const categories = ["All", ...new Set(accessories.map((i) => i.category))];

  const filteredAccessories = useMemo(() => {
    return accessories.filter((item) => {
      const brandMatch =
        filters.brand === "All" || item.brand === filters.brand;
      const categoryMatch =
        filters.category === "All" || item.category === filters.category;
      return brandMatch && categoryMatch;
    });
  }, [filters]);

  return (
    <div className="bg-gray-50 min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-500">
            Essential Accessories
          </span>
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Premium accessories to complete your everyday style
        </p>

        {/* Filters */}
        <div className="space-y-10 mb-12">
          <div>
            <h3 className="font-bold mb-3">Brand</h3>
            <div className="flex flex-wrap gap-6">
              {brands.map((b) => (
                <button
                  key={b}
                  onClick={() => setFilters({ ...filters, brand: b })}
                  className={`pb-1 ${
                    filters.brand === b
                      ? "text-green-600 border-b-2 border-green-600"
                      : "text-gray-600"
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
                  className={`pb-1 ${
                    filters.category === c
                      ? "text-green-600 border-b-2 border-green-600"
                      : "text-gray-600"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAccessories.map((item) => {
            const added = isInCart(item.id);

            return (
              <div
                key={item.id}
                className="group bg-white rounded-xl shadow hover:shadow-xl overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-56">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />

                  <button
                    onClick={() => setQuickView(item)}
                    className="absolute inset-x-3 bottom-3 bg-white py-2 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition"
                  >
                    Quick View
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 text-center">
                  <h3 className="text-sm font-semibold truncate">
                    {item.name}
                  </h3>
                  <p className="text-green-600 font-bold mt-1">
                    ₹{item.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">{item.brand}</p>

                  <button
                    onClick={() =>
                      added
                        ? removeFromCart(item.id)
                        : addToCart(item)
                    }
                    className={`mt-3 w-full py-2 rounded-lg text-sm font-semibold
                      ${
                        added
                          ? "bg-green-500 text-white"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                  >
                    {added ? "Added ✓" : "Add to Cart"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* QUICK VIEW MODAL */}
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

                  <p className="text-green-600 text-2xl font-bold mt-4">
                    ₹{quickView.price.toLocaleString()}
                  </p>

                  <p className="mt-4 text-gray-700">
                    {quickView.description}
                  </p>

                  <button
                    onClick={() => addToCart(quickView)}
                    disabled={isInCart(quickView.id)}
                    className={`mt-8 w-full py-3 rounded-2xl font-semibold
                      ${
                        isInCart(quickView.id)
                          ? "bg-green-500 text-white"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                  >
                    {isInCart(quickView.id) ? (
                      <>
                        <FaCheck className="inline mr-1" /> Added
                      </>
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Accessories;
