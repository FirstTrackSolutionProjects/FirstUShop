import React, { useState, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FaTimes, FaCheck } from "react-icons/fa";

const products = [
  { id: 1, name: "Black Air Force 1", category: "SPORTS", price: 8999, brand: "Nike", rating: 4.5, image: "/image/shoes1.jpeg", description: "Iconic Nike Air Force 1 with premium comfort." },
  { id: 2, name: "Green & White Runner", category: "SPORTS", price: 7499, brand: "Adidas", rating: 4.2, image: "/image/shoes2.jpeg", description: "Lightweight running shoes for daily workouts." },
  { id: 3, name: "White High-Tops", category: "CASUAL", price: 12495, brand: "Converse", rating: 4.7, image: "/image/shoes3.jpeg", description: "Classic high-top sneakers with timeless style." },
  { id: 4, name: "Blue Sport Running", category: "SPORTS", price: 9499, brand: "Nike", rating: 4.3, image: "/image/shoes4.jpeg", description: "Breathable running shoes for long distance runs." },
  { id: 5, name: "Classic White Sneakers", category: "CASUAL", price: 6999, brand: "Adidas", rating: 4.8, image: "/image/shoes5.jpeg", description: "Minimal everyday sneakers with clean look." },
  { id: 6, name: "Urban Street Style", category: "CASUAL", price: 11299, brand: "Puma", rating: 4.1, image: "/image/shoes6.jpeg", description: "Street-style sneakers for modern fashion." },
  { id: 7, name: "Premium Leather Boots", category: "LEATHER", price: 15999, brand: "Woodland", rating: 4.6, image: "/image/shoes7.jpeg", description: "Durable leather boots built for rugged use." },
  { id: 8, name: "Orange Trail Runners", category: "SPORTS", price: 8299, brand: "Skechers", rating: 4.0, image: "/image/shoes8.jpeg", description: "Trail runners with strong grip & cushioning." },
  { id: 9, name: "Block Heel Sandals", category: "WOMEN HEELS", price: 2499, brand: "Catwalk", rating: 4.5, image: "/image/shoes9.jpeg", description: "Stylish block heels for party & casual wear." },
  { id: 10, name: "Purple Metallic Party Heels", category: "WOMEN HEELS", price: 3199, brand: "Metro", rating: 4.7, image: "/image/shoes10.jpeg", description: "Glamorous party heels with metallic finish." },
];

const FootWear = () => {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const [filters, setFilters] = useState({ brand: "All", category: "All" });
  const [quickView, setQuickView] = useState(null);

  const isInCart = (id) => cart.some(item => item.id === id);

  const brands = ["All", ...new Set(products.map(p => p.brand))];
  const categories = ["All", ...new Set(products.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const brandMatch = filters.brand === "All" || p.brand === filters.brand;
      const categoryMatch = filters.category === "All" || p.category === filters.category;
      return brandMatch && categoryMatch;
    });
  }, [filters]);

  return (
    <div className="bg-gray-100 min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            Footwear Collection
          </span>
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Shoes, sneakers, boots & heels for every style
        </p>

        {/* Filters */}
        <div className="space-y-10 mb-12">
          <div>
            <h3 className="font-bold mb-3">Brand</h3>
            <div className="flex flex-wrap gap-6">
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
            <div className="flex flex-wrap gap-6">
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
          {filteredProducts.map(p => {
            const added = isInCart(p.id);

            return (
              <div key={p.id} className="group bg-white rounded-xl shadow hover:shadow-xl overflow-hidden">
                
                {/* Image */}
                <div className="relative h-56">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />

                  <button
                    onClick={() => setQuickView(p)}
                    className="absolute inset-x-3 bottom-3 bg-white py-2 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition"
                  >
                    Quick View
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 text-center">
                  <h3 className="text-sm font-semibold truncate">{p.name}</h3>
                  <p className="text-indigo-600 font-bold mt-1">₹{p.price}</p>
                  <p className="text-xs text-gray-500">{p.brand}</p>

                  <button
                    onClick={() => added ? removeFromCart(p.id) : addToCart(p)}
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
                <img src={quickView.image} alt={quickView.name} className="w-full h-80 object-cover rounded-2xl" />

                <div>
                  <h2 className="text-2xl font-bold">{quickView.name}</h2>
                  <p className="text-gray-500">{quickView.brand}</p>

                  <p className="text-indigo-600 text-2xl font-bold mt-4">
                    ₹{quickView.price}
                  </p>

                  <p className="mt-4 text-gray-700">{quickView.description}</p>

                  <button
                    onClick={() => addToCart(quickView)}
                    disabled={isInCart(quickView.id)}
                    className={`mt-8 w-full py-3 rounded-2xl font-semibold
                      ${isInCart(quickView.id)
                        ? "bg-green-500 text-white"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
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

export default FootWear;
