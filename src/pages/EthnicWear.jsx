import React, { useState, useMemo } from "react";
import { FaFilter, FaTag, FaUserAlt } from "react-icons/fa";

// Kurta Data
const kurtas = [


  // --- MEN ---
  { id: 1, brand: "FabIndia", name: "Silk Blend Kurta", price: "₹2,499", image: "/image/m1.jpg", category: "Men Kurta" },
  { id: 2, brand: "Manyavar", name: "Classic Solid Kurta", price: "₹1,999", image: "/image/m2.jpeg", category: "Men Kurta" },
  { id: 3, brand: "Wrogn", name: "Textured Festive Kurta", price: "₹1,899", image: "/image/m3.jpeg", category: "Men Kurta" },
  { id: 4, brand: "FabIndia", name: "Cotton Pathani Suit", price: "₹2,299", image: "/image/m4.jpeg", category: "Men Ethnic Suit" },
  { id: 5, brand: "Manyavar", name: "Designer Sherwani", price: "₹5,999", image: "/image/m5.jpeg", category: "Men Sherwani" },

  // --- WOMEN ---
  { id: 6, brand: "Anokhi", name: "Printed Cotton Kurta", price: "₹1,799", image: "/image/w1.jpeg", category: "Women Kurta" },
  { id: 7, brand: "Biba", name: "Floral A-Line Kurta", price: "₹1,599", image: "/image/w2.jpeg", category: "Women Kurta" },
  { id: 8, brand: "Aurelia", name: "Straight Embroidered Kurta", price: "₹1,299", image: "/image/w3.jpeg", category: "Women Kurta" },
  { id: 9, brand: "Libas", name: "Geometric Print Kurta", price: "₹1,399", image: "/image/w4.jpeg", category: "Women Kurta" },
  { id: 10, brand: "SareeHub", name: "Banarasi Silk Saree", price: "₹3,499", image: "/image/w5.jpeg", category: "Women Saree" },
  { id: 11, brand: "FabIndia", name: "Embroidered Lehenga", price: "₹4,299", image: "/image/w6.jpeg", category: "Women Lehenga" },
  { id: 12, brand: "Biba", name: "Cotton Ethnic Top", price: "₹899", image: "/image/w7.jpeg", category: "Women Ethnic Top" }
];




const EthnicWear = () => {
  const [filters, setFilters] = useState({ brand: "All", category: "All" });

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const filteredKurtas = useMemo(() => {
  return kurtas.filter((kurta) => {
    const brandMatch = filters.brand === "All" || kurta.brand === filters.brand;
    const categoryMatch =
      filters.category === "All" || kurta.category.includes(filters.category);
    return brandMatch && categoryMatch;
  });
}, [filters]);


  const brands = ["All", ...new Set(kurtas.map((kurta) => kurta.brand))];
  const categories = ["All", "Men", "Women"];

  const FilterButton = ({ onClick, isActive, children }) => (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-full text-sm shadow-md transition-all duration-300
        ${isActive
          ? "bg-indigo-600 text-white scale-105 shadow-xl"
          : "bg-white hover:bg-gray-100 text-gray-800"}`
      }
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-16 font-sans">
      <div className="container mx-auto px-5">

        {/* ---------------- HEADER ---------------- */}
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
              Explore Ethnic Wear
            </span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg max-w-xl mx-auto">
            Shop the finest collection of traditional & modern ethnic wear. Filter, explore, and buy your favourites.
          </p>
        </header>

       
        {/* ---------------- FILTERS ---------------- */}
            <div className="space-y-12">

              {/* BRAND FILTER */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-5">Brand</h3>

                <div className="flex flex-wrap gap-8">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => handleFilterChange("brand", brand)}
                      className={`pb-1 text-base transition-all duration-300 font-medium
                        ${filters.brand === brand
                          ? "text-indigo-600 border-b-2 border-indigo-600"
                          : "text-gray-600 hover:text-gray-900 hover:border-gray-400"}`
                      }
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* CATEGORY FILTER */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-5">Category</h3>

                <div className="flex flex-wrap gap-10 mb-10 text-base font-medium text-gray-700">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleFilterChange("category", cat)}
                      className={`pb-1 text-base transition-all duration-300 font-medium
                        ${filters.category === cat
                          ? "text-indigo-600 border-b-2 border-indigo-600"
                          : "text-gray-600 hover:text-gray-900 hover:border-gray-400"}`
                      }
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>


        {/* ---------------- PRODUCT GRID ---------------- */}
              {filteredKurtas.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {filteredKurtas.map((item) => (
              <div
                key={item.id}
                className="relative group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Wishlist Heart */}
                <button className="absolute top-3 right-3 z-20 bg-white/90 rounded-full p-2 shadow-md hover:scale-110 transition text-red-500 font-bold text-lg">
                  ♥
                </button>


                {/* Product Image */}
                <div className="h-85 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                  />
                </div>

                {/* Hover Bottom Action Bar */}
                <div className="absolute bottom-0 inset-x-0 px-4 py-3 bg-black/50 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="w-full bg-white text-gray-900 font-semibold py-2 rounded-xl hover:bg-gray-100 transition">
                    Quick View
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4 text-center">
                  <h3 className="text-base font-bold text-gray-800 truncate">{item.name}</h3>
                  <p className="text-indigo-600 text-xl font-bold mt-1">{item.price}</p>
                  <p className="text-sm text-gray-500 mt-1">{item.brand}</p>
                </div>
              </div>
            ))}

          </div>
        ) : (
          <div className="text-center py-20 px-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800">No Items Found</h2>
            <p className="mt-3 text-gray-500">Try selecting a different brand or category.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default EthnicWear;
