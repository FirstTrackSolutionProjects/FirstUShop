import React, { useState, useMemo } from 'react';

// --- Product Data ---
const products = [
  { id: 1, brand: 'Fenty Beauty', name: "Pro Filt'r Foundation", price: '₹3,499', image: '/image/cos1.jpeg', category: 'Makeup' },
  { id: 2, brand: 'Dior', name: "J'adore Eau de Perfume", price: '₹12,999', image: '/image/cos2.jpeg', category: 'Fragrance' },
  { id: 3, brand: 'The Ordinary', name: 'Niacinamide 10% + Zinc 1%', price: '₹899', image: '/image/cos3.jpeg', category: 'Skincare' },
  { id: 4, brand: 'MAC', name: 'Ruby Woo Lipstick', price: '₹1,799', image: '/image/cos4.jpeg', category: 'Makeup' },
];

const Cosmetic = () => {
  const [filters, setFilters] = useState({ brand: 'All', category: 'All' });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const filteredProducts = useMemo(() => {
    return products.filter(item => {
      const brandMatch = filters.brand === 'All' || item.brand === filters.brand;
      const categoryMatch = filters.category === 'All' || item.category === filters.category;
      return brandMatch && categoryMatch;
    });
  }, [filters]);

  const brands = ['All', ...new Set(products.map(item => item.brand))];
  const categories = ['All', 'Makeup', 'Skincare', 'Fragrance'];

  const FilterButton = ({ onClick, isActive, children }) => {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
          isActive
            ? 'bg-rose-600 text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-500">
              Cosmetic Collection
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
            Discover premium beauty products curated just for you.
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
                          ? "text-red-600 border-b-2 border-red-600"
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
                          ? "text-red-600 border-b-2 border-red-600"
                          : "text-gray-600 hover:text-gray-900 hover:border-gray-400"}`
                      }
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

        {/* Product Grid */}
        <main>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(item => (
                <div
                  key={item.id}
                  className="group relative bg-white rounded-2xl shadow-md overflow-hidden transition transform hover:scale-105 hover:shadow-2xl cursor-pointer"
                >
                  <div className="absolute top-3 right-3 bg-white/90 text-rose-600 text-xs font-semibold px-2 py-1 rounded-full z-10">
                    {item.brand}
                  </div>
                  <div className="h-80 overflow-hidden">
                    <img
                      src={item.image}
                      alt={`${item.brand} ${item.name}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-5 text-center">
                    <p className="text-lg font-bold text-gray-800 truncate">{item.name}</p>
                    <p className="mt-2 text-xl font-semibold text-rose-600">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 px-6 bg-white rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800">No Products Found</h2>
              <p className="mt-3 text-gray-500">Try adjusting your filters to see more products.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Cosmetic;
