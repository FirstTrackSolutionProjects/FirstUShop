import React, { useState, useMemo } from 'react';

// --- Accessories Data ---
const accessories = [
  { id: 1, brand: 'Fossil', name: 'Leather Belt', price: '₹1,299', image: '/image/a1.jpeg', category: 'Belt' },
  { id: 2, brand: 'Ray-Ban', name: 'Aviator Sunglasses', price: '₹4,499', image: '/image/a2.jpeg', category: 'Sunglasses' },
  { id: 3, brand: 'Titan', name: 'Wallet', price: '₹899', image: '/image/a3.jpeg', category: 'Wallet' },
  { id: 4, brand: 'Puma', name: 'Cap', price: '₹599', image: '/image/a4.jpeg', category: 'Cap' },
  { id: 5, brand: 'Fossil', name: 'Bracelet', price: '₹1,199', image: '/image/a5.jpeg', category: 'Bracelet' },
  { id: 6, brand: 'Ray-Ban', name: 'Wayfarer Sunglasses ', price: '₹5,299', image: '/image/a6.jpeg', category: 'Sunglasses' },
];

const Accessories = () => {
  const [filters, setFilters] = useState({ brand: 'All', category: 'All' });

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const filteredAccessories = useMemo(() => {
    return accessories.filter(item => {
      const brandMatch = filters.brand === 'All' || item.brand === filters.brand;
      const categoryMatch = filters.category === 'All' || item.category === filters.category;
      return brandMatch && categoryMatch;
    });
  }, [filters]);

  const brands = ['All', ...new Set(accessories.map(item => item.brand))];
  const categories = ['All', ...new Set(accessories.map(item => item.category))];

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-500">
              Essential Accessories
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
            Discover our curated selection of premium accessories to complete your style.
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
                      ? 'text-green-600 border-b-2 border-green-600'
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
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-600 hover:text-gray-900 hover:border-gray-400'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Accessories Grid */}
        <main>
          {filteredAccessories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAccessories.map(item => (
                <div
                  key={item.id}
                  className="group relative bg-white rounded-2xl shadow-md overflow-hidden transition transform hover:scale-105 hover:shadow-2xl cursor-pointer"
                >
                  <div className="absolute top-3 right-3 bg-white/90 text-green-600 text-xs font-semibold px-2 py-1 rounded-full z-10">
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
                    <p className="mt-2 text-xl font-semibold text-green-600">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 px-6 bg-white rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800">No Accessories Found</h2>
              <p className="mt-3 text-gray-500">Try adjusting your filters to see more products.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Accessories;
