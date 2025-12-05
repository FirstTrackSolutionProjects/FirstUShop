import React, { useState, useMemo } from 'react';

// --- KidsWear Data ---
const kidswear = [
  { id: 1, brand: 'Gini & Jony', name: 'Cartoon Print T-Shirt', price: '₹799', image: '/image/k1.jpg', category: 'T-Shirt' },
  { id: 2, brand: 'H&M', name: 'Denim Shorts', price: '₹999', image: '/image/k2.jpg', category: 'Shorts' },
  { id: 3, brand: 'Mini Klub', name: 'Floral Dress', price: '₹1,299', image: '/image/k3.jpg', category: 'Dress' },
  { id: 4, brand: 'UCB', name: 'Hooded Jacket', price: '₹1,499', image: '/image/k4.jpg', category: 'Jacket' },
  { id: 5, brand: 'Gini & Jony', name: 'Striped T-Shirt', price: '₹699', image: '/image/k5.jpg', category: 'T-Shirt' },
  { id: 6, brand: 'H&M', name: 'Cargo Shorts', price: '₹1,099', image: '/image/k6.jpg', category: 'Shorts' },
];

const KidsWear = () => {
  const [filters, setFilters] = useState({ brand: 'All', category: 'All' });

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const filteredKidswear = useMemo(() => {
    return kidswear.filter(item => {
      const brandMatch = filters.brand === 'All' || item.brand === filters.brand;
      const categoryMatch = filters.category === 'All' || item.category === filters.category;
      return brandMatch && categoryMatch;
    });
  }, [filters]);

  const brands = ['All', ...new Set(kidswear.map(item => item.brand))];
  const categories = ['All', ...new Set(kidswear.map(item => item.category))];

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-600">
              KidsWear Collection
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
            Browse our colorful and comfortable kidswear collection. Find the perfect outfit for your little one.
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

        {/* KidsWear Grid */}
        <main>
          {filteredKidswear.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredKidswear.map(item => (
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
              <h2 className="text-3xl font-bold text-gray-800">No Kidswear Found</h2>
              <p className="mt-3 text-gray-500">Try adjusting your filters to see more products.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default KidsWear;
