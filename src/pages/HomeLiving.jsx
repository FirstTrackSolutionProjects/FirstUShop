import React, { useState, useMemo } from 'react';

// --- Home Living Data ---
const homeliving = [
  { id: 1, brand: 'HomeCentre', name: 'Cotton Bedsheet Set', price: '₹2,499', image: '/image/h1.jpeg', category: 'Bedding' },
  { id: 2, brand: 'Ikea', name: 'Blackout Curtains', price: '₹1,299', image: '/image/h2.jpeg', category: 'Curtains' },
  { id: 3, brand: 'West Elm', name: 'Ceramic Vase', price: '₹899', image: '/image/h3.jpeg', category: 'Decor' },
  { id: 4, brand: 'Prestige', name: 'Non-Stick Cookware Set', price: '₹3,499', image: '/image/h4.jpeg', category: 'Kitchenware' },
  { id: 5, brand: 'HomeCentre', name: 'Throw Pillow Set', price: '₹1,199', image: '/image/h5.jpeg', category: 'Decor' },
  { id: 6, brand: 'Ikea', name: 'Kitchen Storage Rack', price: '₹1,799', image: '/image/h6.jpeg', category: 'Kitchenware' },
];

const HomeLiving = () => {
  const [filters, setFilters] = useState({ brand: 'All', category: 'All' });

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const filteredHomeLiving = useMemo(() => {
    return homeliving.filter(item => {
      const brandMatch = filters.brand === 'All' || item.brand === filters.brand;
      const categoryMatch = filters.category === 'All' || item.category === filters.category;
      return brandMatch && categoryMatch;
    });
  }, [filters]);

  const brands = ['All', ...new Set(homeliving.map(item => item.brand))];
  const categories = ['All', ...new Set(homeliving.map(item => item.category))];

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Home & Living Collection
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
            Upgrade your home with our curated collection of home living essentials. Stylish, functional, and premium quality.
          </p>
        </header>

        {/* Filters */}
        <div className="space-y-12 mb-12">
          {/* Brand Filter */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-5">Brand</h3>
            <div className="flex flex-wrap gap-8">
              {brands.map(brand => (
                <button
                  key={brand}
                  onClick={() => handleFilterChange('brand', brand)}
                  className={`pb-1 text-base transition-all duration-300 font-medium ${
                    filters.brand === brand
                      ? 'text-purple-500 border-b-2 border-purple-500'
                      : 'text-gray-600 hover:text-gray-900 hover:border-gray-400'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-5">Category</h3>
            <div className="flex flex-wrap gap-10 mb-10 text-base font-medium text-gray-700">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleFilterChange('category', category)}
                  className={`pb-1 text-base transition-all duration-300 font-medium ${
                    filters.category === category
                      ? 'text-purple-500 border-b-2 border-purple-500'
                      : 'text-gray-600 hover:text-gray-900 hover:border-gray-400'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Home Living Grid */}
        <main>
          {filteredHomeLiving.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredHomeLiving.map(item => (
                <div
                  key={item.id}
                  className="group relative bg-white rounded-2xl shadow-md overflow-hidden transition transform hover:scale-105 hover:shadow-2xl cursor-pointer"
                >
                  <div className="absolute top-3 right-3 bg-white/90 text-purple-500 text-xs font-semibold px-2 py-1 rounded-full z-10">
                    {item.brand}
                  </div>
                  <div className="h-72 overflow-hidden">
                    <img
                      src={item.image}
                      alt={`${item.brand} ${item.name}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-5 text-center">
                    <p className="text-lg font-bold text-gray-800 truncate">{item.name}</p>
                    <p className="mt-2 text-xl font-semibold text-purple-500">{item.price}</p>
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

export default HomeLiving;
