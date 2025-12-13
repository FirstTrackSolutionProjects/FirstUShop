import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Bottom Wear Data ---
const bottomWear = [
  { id: 1, brand: 'UrbanFit', name: 'Men Slim Fit Jeans', price: '₹1,499', image: '/image/mbottom1.jpeg', category: 'Men' },
  { id: 2, brand: 'StyleAura', name: 'Women A-Line Skirt', price: '₹999', image: '/image/wbottom1.jpeg', category: 'Women' },
  { id: 3, brand: 'UrbanFit', name: 'Men Chino Pants', price: '₹1,299', image: '/image/mbottom2.jpeg', category: 'Men' },
  { id: 4, brand: 'StyleAura', name: 'Women Palazzos', price: '₹1,099', image: '/image/wbottom2.jpeg', category: 'Women' },
  { id: 5, brand: 'UrbanFit', name: 'Men Cargo Shorts', price: '₹1,199', image: '/image/mbottom3.jpeg', category: 'Men' },
  { id: 6, brand: 'StyleAura', name: 'Women Pencil Skirt', price: '₹1,299', image: '/image/wbottom3.jpeg', category: 'Women' },
];

const BottomWear = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ brand: 'All', category: 'All' });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const filteredItems = useMemo(() => {
    return bottomWear.filter(item => {
      const brandMatch = filters.brand === 'All' || item.brand === filters.brand;
      const categoryMatch = filters.category === 'All' || item.category === filters.category;
      return brandMatch && categoryMatch;
    });
  }, [filters]);

  const brands = ['All', ...new Set(bottomWear.map(item => item.brand))];
  const categories = ['All', 'Men', 'Women'];

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* --- Header --- */}
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              The BottomWear Hub
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of bottom wear for men, women, and kids. Filter by brand or category to find your perfect outfit.
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

        {/* --- Grid Section --- */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="relative group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => index === 0 && navigate('/bottomwearDetail')}
              >
                <div className="overflow-hidden h-72 relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">{item.name}</h3>
                  <p className="text-indigo-600 font-bold mt-2">{item.price}</p>
                  <span className="inline-block mt-2 text-xs text-gray-500">{item.brand}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-6 bg-white rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800">No Items Found</h3>
            <p className="mt-2 text-gray-500">Please broaden your filter criteria to see more results.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomWear;
