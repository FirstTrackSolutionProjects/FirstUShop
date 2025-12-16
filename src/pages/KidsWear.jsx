import React, { useState, useMemo } from "react";
import { FaHeart, FaTimes, FaCheck } from "react-icons/fa";
import { useCart } from "../context/CartContext";

// --- KidsWear Data ---
const kidswear = [
  {
    id: 1,
    brand: "Gini & Jony",
    name: "Cartoon Print T-Shirt",
    price: "₹799",
    image: "/image/kid1.jpeg",
    category: "T-Shirt",
    description: "Fun cartoon print t-shirt made with soft cotton fabric.",
  },
  {
    id: 2,
    brand: "H&M",
    name: "Denim Shorts",
    price: "₹999",
    image: "/image/kid2.jpeg",
    category: "Shorts",
    description: "Comfortable denim shorts perfect for outdoor play.",
  },
  {
    id: 3,
    brand: "Mini Klub",
    name: "Floral Dress",
    price: "₹1,299",
    image: "/image/kid3.jpeg",
    category: "Dress",
    description: "Beautiful floral dress with breathable fabric.",
  },
  {
    id: 4,
    brand: "UCB",
    name: "Hooded Jacket",
    price: "₹1,499",
    image: "/image/kid4.jpeg",
    category: "Jacket",
    description: "Warm hooded jacket for winter outings.",
  },
  {
    id: 5,
    brand: "Gini & Jony",
    name: "Striped T-Shirt",
    price: "₹699",
    image: "/image/kid5.jpeg",
    category: "T-Shirt",
    description: "Classic striped t-shirt for everyday wear.",
  },
  {
    id: 6,
    brand: "H&M",
    name: "Cargo Shorts",
    price: "₹1,099",
    image: "/image/kid6.jpeg",
    category: "Shorts",
    description: "Stylish cargo shorts with multiple pockets.",
  },
];

const KidsWear = () => {
  const { addToCart } = useCart();

  const [filters, setFilters] = useState({ brand: "All", category: "All" });
  const [quickView, setQuickView] = useState(null);
  const [addedItems, setAddedItems] = useState([]);

  const brands = ["All", ...new Set(kidswear.map((i) => i.brand))];
  const categories = ["All", ...new Set(kidswear.map((i) => i.category))];

  const filteredKidswear = useMemo(() => {
    return kidswear.filter((item) => {
      const brandOk = filters.brand === "All" || item.brand === filters.brand;
      const catOk =
        filters.category === "All" || item.category === filters.category;
      return brandOk && catOk;
    });
  }, [filters]);

  const handleAddToCart = (item) => {
    if (!addedItems.includes(item.id)) {
      addToCart(item);
      setAddedItems((prev) => [...prev, item.id]);
    }
  };

  const isAdded = (id) => addedItems.includes(id);

  return (
    <div className="bg-gray-100 min-h-screen py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* HEADER */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-3 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-600">
          KidsWear Collection
        </h1>
        <p className="text-center text-gray-600 mb-10 text-sm md:text-base">
          Cute, colorful & comfy styles for kids
        </p>

        {/* FILTERS */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => setFilters({ ...filters, brand: b })}
              className={`font-medium text-sm md:text-base ${
                filters.brand === b
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-600"
              }`}
            >
              {b}
            </button>
          ))}

          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilters({ ...filters, category: c })}
              className={`font-medium text-sm md:text-base ${
                filters.category === c
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-600"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {filteredKidswear.map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
            >
              {/* Wishlist */}
              <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow z-10">
                <FaHeart className="text-pink-500 text-sm" />
              </button>

              {/* Image */}
              <div className="h-44 md:h-72 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="p-3 md:p-4 text-center">
                <h3 className="font-semibold text-sm md:text-base truncate">
                  {item.name}
                </h3>
                <p className="text-green-600 font-bold text-lg">
                  {item.price}
                </p>
                <p className="text-xs text-gray-500">{item.brand}</p>

                {/* ACTIONS */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => setQuickView(item)}
                    className="w-1/2 border py-1.5 rounded-lg text-sm"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={isAdded(item.id)}
                    className={`w-1/2 py-1.5 rounded-lg text-sm font-semibold
                      ${
                        isAdded(item.id)
                          ? "bg-green-500 text-white"
                          : "bg-teal-600 text-white"
                      }`}
                  >
                    {isAdded(item.id) ? "Added" : "Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK VIEW MODAL */}
      {quickView && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-4 md:p-6 relative">
            <button
              onClick={() => setQuickView(null)}
              className="absolute top-3 right-3 text-xl"
            >
              <FaTimes />
            </button>

            <div className="grid md:grid-cols-2 gap-6">
              <img
                src={quickView.image}
                alt={quickView.name}
                className="w-full h-64 md:h-96 object-cover rounded-xl"
              />

              <div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  {quickView.name}
                </h2>
                <p className="text-gray-500">{quickView.brand}</p>

                <p className="text-green-600 text-xl font-bold mt-3">
                  {quickView.price}
                </p>

                <p className="mt-4 text-gray-700 text-sm md:text-base">
                  {quickView.description}
                </p>

                <button
                  onClick={() => handleAddToCart(quickView)}
                  disabled={isAdded(quickView.id)}
                  className={`mt-6 w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2
                    ${
                      isAdded(quickView.id)
                        ? "bg-green-500 text-white"
                        : "bg-teal-600 text-white"
                    }`}
                >
                  {isAdded(quickView.id) ? (
                    <>
                      <FaCheck /> Added to Cart
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
  );
};

export default KidsWear;
