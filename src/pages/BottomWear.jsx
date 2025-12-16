import React, { useState, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FaTimes, FaCheck } from "react-icons/fa";

// --- Bottom Wear Data ---
const bottomWear = [
  { id: 1, brand: "UrbanFit", name: "Men Slim Fit Jeans", price: 1499, image: "/image/mbottom1.jpeg", category: "Men", description: "Comfortable slim fit jeans for daily wear." },
  { id: 2, brand: "StyleAura", name: "Women A-Line Skirt", price: 999, image: "/image/wbottom1.jpeg", category: "Women", description: "Elegant A-line skirt for casual & party wear." },
  { id: 3, brand: "UrbanFit", name: "Men Chino Pants", price: 1299, image: "/image/mbottom2.jpeg", category: "Men", description: "Stylish chinos with perfect fit." },
  { id: 4, brand: "StyleAura", name: "Women Palazzos", price: 1099, image: "/image/wbottom2.jpeg", category: "Women", description: "Trendy palazzos with soft fabric." },
  { id: 5, brand: "UrbanFit", name: "Men Cargo Shorts", price: 1199, image: "/image/mbottom3.jpeg", category: "Men", description: "Utility cargo shorts for outdoor comfort." },
  { id: 6, brand: "StyleAura", name: "Women Pencil Skirt", price: 1299, image: "/image/wbottom3.jpeg", category: "Women", description: "Formal pencil skirt with sleek design." },
];

const BottomWear = () => {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const [filters, setFilters] = useState({ brand: "All", category: "All" });
  const [quickView, setQuickView] = useState(null);

  const isInCart = (id) => cart.some(item => item.id === id);

  const filteredItems = useMemo(() => {
    return bottomWear.filter(item => {
      const brandMatch = filters.brand === "All" || item.brand === filters.brand;
      const categoryMatch = filters.category === "All" || item.category === filters.category;
      return brandMatch && categoryMatch;
    });
  }, [filters]);

  const brands = ["All", ...new Set(bottomWear.map(i => i.brand))];
  const categories = ["All", "Men", "Women"];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-14">

        {/* Header */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            BottomWear Collection
          </span>
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Trendy bottom wear for men & women
        </p>

        {/* Filters */}
        <div className="space-y-10 mb-12">
          <div>
            <h3 className="font-bold mb-3">Brand</h3>
            <div className="flex flex-wrap gap-5">
              {brands.map(b => (
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
            <div className="flex flex-wrap gap-5">
              {categories.map(c => (
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
          {filteredItems.map(item => {
            const added = isInCart(item.id);

            return (
              <div key={item.id} className="group bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden">
                
                {/* Image */}
                <div className="relative h-56">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Quick View */}
                  <button
                    onClick={() => setQuickView(item)}
                    className="absolute inset-x-3 bottom-3 bg-white py-2 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition"
                  >
                    Quick View
                  </button>

                  <span className="absolute top-2 right-2 bg-white text-xs px-2 py-1 rounded-full text-indigo-600 font-semibold">
                    {item.brand}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 text-center">
                  <h3 className="text-sm font-semibold truncate">{item.name}</h3>
                  <p className="text-indigo-600 font-bold mt-1">₹{item.price}</p>

                  <button
                    onClick={() =>
                      added ? removeFromCart(item.id) : addToCart(item)
                    }
                    className={`mt-3 w-full py-2 rounded-lg text-sm font-semibold
                      ${added ? "bg-green-500 text-white" : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
                  >
                    {added ? "Added ✓" : "Add to Cart"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ---------- QUICK VIEW MODAL ---------- */}
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
                    ₹{quickView.price}
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

export default BottomWear;
