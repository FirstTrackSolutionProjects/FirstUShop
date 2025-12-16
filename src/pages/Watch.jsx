import React, { useState, useMemo, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FaTimes, FaCheck } from "react-icons/fa";

// --- Watch Data ---
const watches = [
  {
    id: 1,
    brand: "Apex",
    name: "Chronograph Steel",
    price: 4999,
    image: "/image/watch1.jpeg",
    category: "Men",
    description: "Premium chronograph steel watch with bold masculine design."
  },
  {
    id: 2,
    brand: "Nova",
    name: "Elegance Gold",
    price: 3499,
    image: "/image/watch2.jpeg",
    category: "Women",
    description: "Elegant gold finish watch perfect for formal occasions."
  },
  {
    id: 3,
    brand: "Zephyr",
    name: "Classic Leather",
    price: 2799,
    image: "/image/watch3.jpeg",
    category: "Unisex",
    description: "Timeless leather strap watch for everyday elegance."
  },
  {
    id: 4,
    brand: "Astra",
    name: "Explorer Digital",
    price: 1299,
    image: "/image/watch4.jpeg",
    category: "Kids",
    description: "Durable digital watch designed for active kids."
  },
];

const Watch = () => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const [filters, setFilters] = useState({ brand: "All", category: "All" });
  const [quickView, setQuickView] = useState(null);

  const isInCart = (id) => cart.some((item) => item.id === id);

  const brands = ["All", ...new Set(watches.map((w) => w.brand))];
  const categories = ["All", "Men", "Women", "Kids"];

  const filteredWatches = useMemo(() => {
    return watches.filter((watch) => {
      const brandMatch =
        filters.brand === "All" || watch.brand === filters.brand;

      const categoryMatch =
        filters.category === "All" ||
        watch.category === filters.category ||
        (watch.category === "Unisex" &&
          (filters.category === "Men" || filters.category === "Women"));

      return brandMatch && categoryMatch;
    });
  }, [filters]);

  return (
    <div className="bg-gray-50 min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            Watch Collection
          </span>
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Timeless watches crafted for every lifestyle
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
                      ? "text-indigo-600 border-b-2 border-indigo-600"
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
                      ? "text-indigo-600 border-b-2 border-indigo-600"
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
          {filteredWatches.map((watch) => {
            const added = isInCart(watch.id);

            return (
              <div
                key={watch.id}
                className="group bg-white rounded-xl shadow hover:shadow-xl overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-56">
                  <img
                    src={watch.image}
                    alt={watch.name}
                    className="w-full h-full object-cover"
                  />

                  <button
                    onClick={() => setQuickView(watch)}
                    className="absolute inset-x-3 bottom-3 bg-white py-2 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition"
                  >
                    Quick View
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 text-center">
                  <h3 className="text-sm font-semibold truncate">
                    {watch.name}
                  </h3>
                  <p className="text-indigo-600 font-bold mt-1">
                    ₹{watch.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">{watch.brand}</p>

                  <button
                    onClick={() =>
                      added
                        ? removeFromCart(watch.id)
                        : addToCart(watch)
                    }
                    className={`mt-3 w-full py-2 rounded-lg text-sm font-semibold
                      ${
                        added
                          ? "bg-green-500 text-white"
                          : "bg-indigo-600 text-white hover:bg-indigo-700"
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

                  <p className="text-indigo-600 text-2xl font-bold mt-4">
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
                          : "bg-indigo-600 text-white hover:bg-indigo-700"
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

export default Watch;
