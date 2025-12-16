import React, { useState, useMemo } from "react";
import { FaHeart, FaTimes, FaCheck } from "react-icons/fa";
import { useCart } from "../context/CartContext";

// ---------------- DATA ----------------
const kurtas = [
  {
    id: 1,
    brand: "FabIndia",
    name: "Silk Blend Kurta",
    price: "₹2,499",
    image: "/image/m1.jpg",
    category: "Men Kurta",
    description:
      "Premium silk blend kurta with intricate embroidery. Perfect for weddings and festivals.",
  },
  {
    id: 2,
    brand: "Manyavar",
    name: "Classic Solid Kurta",
    price: "₹1,999",
    image: "/image/m2.jpeg",
    category: "Men Kurta",
    description:
      "Elegant solid kurta crafted in breathable fabric. Comfortable for all-day wear.",
  },
  {
    id: 3,
    brand: "Wrogn",
    name: "Textured Festive Kurta",
    price: "₹1,899",
    image: "/image/m3.jpeg",
    category: "Men Kurta",
    description:
      "Stylish festive kurta with modern texture and relaxed fit.",
  },
  {
    id: 6,
    brand: "Biba",
    name: "Floral A-Line Kurta",
    price: "₹1,599",
    image: "/image/w2.jpeg",
    category: "Women Kurta",
    description:
      "Beautiful floral A-line kurta with soft cotton fabric for everyday elegance.",
  },
];

// ---------------- COMPONENT ----------------
const EthnicWear = () => {
  const { addToCart } = useCart();
  const [filters, setFilters] = useState({ brand: "All", category: "All" });
  const [quickView, setQuickView] = useState(null);
  const [addedItems, setAddedItems] = useState([]);

  const brands = ["All", ...new Set(kurtas.map((k) => k.brand))];
  const categories = ["All", "Men", "Women"];

  const filteredKurtas = useMemo(() => {
    return kurtas.filter((k) => {
      const brandOk = filters.brand === "All" || k.brand === filters.brand;
      const catOk =
        filters.category === "All" || k.category.includes(filters.category);
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
    <div className="min-h-screen bg-gray-100 py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* HEADER */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
          Explore Ethnic Wear
        </h1>
        <p className="text-center text-gray-600 mb-8 md:mb-14 text-sm md:text-base">
          Timeless styles crafted for every celebration
        </p>

        {/* FILTERS */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10">
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => setFilters({ ...filters, brand: b })}
              className={`text-sm md:text-base font-medium ${
                filters.brand === b
                  ? "text-indigo-600 border-b-2 border-indigo-600"
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
              className={`text-sm md:text-base font-medium ${
                filters.category === c
                  ? "text-pink-600 border-b-2 border-pink-600"
                  : "text-gray-600"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {filteredKurtas.map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
            >
              {/* Wishlist */}
              <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow z-10">
                <FaHeart className="text-red-500 text-sm" />
              </button>

              {/* Image */}
              <div className="h-44 md:h-80 overflow-hidden">
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
                <p className="text-indigo-600 font-bold text-lg md:text-xl">
                  {item.price}
                </p>
                <p className="text-xs md:text-sm text-gray-500">
                  {item.brand}
                </p>

                {/* ACTION BUTTONS (Mobile Always Visible) */}
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
                          : "bg-indigo-600 text-white"
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

                <p className="text-indigo-600 text-xl md:text-2xl font-bold mt-3">
                  {quickView.price}
                </p>

                <p className="mt-4 text-gray-700 text-sm md:text-base">
                  {quickView.description}
                </p>

                <button
                  onClick={() => handleAddToCart(quickView)}
                  disabled={isAdded(quickView.id)}
                  className={`mt-6 w-full py-3 rounded-xl font-semibold
                    ${
                      isAdded(quickView.id)
                        ? "bg-green-500 text-white"
                        : "bg-indigo-600 text-white"
                    }`}
                >
                  {isAdded(quickView.id) ? "Added to Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EthnicWear;
