import React, { useState, useMemo } from 'react';

// --- Watch Data ---
const watches = [
  { id: 1, brand: 'Apex', name: 'Chronograph Steel', price: '₹4,999', image: '/image/watch1.jpeg', category: 'Men' },
  { id: 2, brand: 'Nova', name: 'Elegance Gold', price: '₹3,499', image: '/image/watch2.jpeg', category: 'Women' },
  { id: 3, brand: 'Zephyr', name: 'Classic Leather', price: '₹2,799', image: '/image/watch3.jpeg', category: 'Unisex' },
  { id: 4, brand: 'Astra', name: 'Explorer Digital', price: '₹1,299', image: '/image/watch4.jpeg', category: 'Kids' },
];

const Watch = () => {
  const [filters, setFilters] = useState({ brand: 'All', category: 'All' });

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const filteredWatches = useMemo(() => {
    return watches.filter(watch => {
      const brandMatch = filters.brand === 'All' || watch.brand === filters.brand;
      const categoryMatch = filters.category === 'All' || watch.category === filters.category || (watch.category === 'Unisex' && (filters.category === 'Men' || filters.category === 'Women'));
      return brandMatch && categoryMatch;
    });
  }, [filters]);

  const brands = ['All', ...new Set(watches.map(watch => watch.brand))];
  const categories = ['All', 'Men', 'Women', 'Kids'];

  const FilterButton = ({ onClick, isActive, children }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        isActive ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              Timeless Collections
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
            Explore our curated selection of exquisite watches. Find your perfect timepiece with our advanced filters.
          </p>
        </header>

        {/* --- Filter Section --- */}
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
        {/* Watch Grid */}
        <main>
          {filteredWatches.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredWatches.map(watch => (
                <div
                  key={watch.id}
                  className="group relative bg-white rounded-2xl shadow-md overflow-hidden transition transform hover:scale-105 hover:shadow-2xl cursor-pointer"
                >
                  <div className="absolute top-3 right-3 bg-white/90 text-indigo-600 text-xs font-semibold px-2 py-1 rounded-full z-10">
                    {watch.brand}
                  </div>
                  <div className="h-72 overflow-hidden">
                    <img
                      src={watch.image}
                      alt={`${watch.brand} ${watch.name}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-5 text-center">
                    <p className="text-lg font-bold text-gray-800 truncate">{watch.name}</p>
                    <p className="mt-2 text-xl font-semibold text-indigo-600">{watch.price}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 px-6 bg-white rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800">No Watches Found</h2>
              <p className="mt-3 text-gray-500">Try adjusting your filters to see more products.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Watch;
