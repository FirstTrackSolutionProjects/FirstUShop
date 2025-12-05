import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const FootWear = () => {
  const navigate = useNavigate();

const products = [

  { id: 1, name: "Black Air Force 1", category: "SPORTS", price: "₹8,999", numericPrice: 8999, brand: "Nike", color: "Black", rating: 4.5, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
  { id: 2, name: "Green & White Runner", category: "SPORTS", price: "₹7,499", numericPrice: 7499, brand: "Adidas", color: "Green", rating: 4.2, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
  { id: 3, name: "Red & White High-Tops", category: "CASUAL", price: "₹12,495", numericPrice: 12495, brand: "Converse", color: "Red", rating: 4.7, image: "https://images.unsplash.com/photo-1605030753481-bb38b08c384a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
  { id: 4, name: "Blue Sport Running", category: "SPORTS", price: "₹9,499", numericPrice: 9499, brand: "Nike", color: "Blue", rating: 4.3, image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
  { id: 5, name: "Classic White Sneakers", category: "CASUAL", price: "₹6,999", numericPrice: 6999, brand: "Adidas", color: "White", rating: 4.8, image: "https://images.unsplash.com/photo-1549289524-06cf8837ace4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
  { id: 6, name: "Urban Street Style", category: "CASUAL", price: "₹11,299", numericPrice: 11299, brand: "Puma", color: "Gray", rating: 4.1, image: "https://images.unsplash.com/photo-1560769624-6a4c2dfc7f4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
  { id: 7, name: "Premium Leather Boots", category: "LEATHER", price: "₹15,999", numericPrice: 15999, brand: "Woodland", color: "Brown", rating: 4.6, image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
  { id: 8, name: "Orange Trail Runners", category: "SPORTS", price: "₹8,299", numericPrice: 8299, brand: "Skechers", color: "Orange", rating: 4.0, image: "https://images.unsplash.com/photo-1573100925118-870b8efc799d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
  { id: 9, name: "Maroon Formal Shoes", category: "FORMAL", price: "₹10,499", numericPrice: 10499, brand: "Hush Puppies", color: "Maroon", rating: 4.4, image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
  { id: 10, name: "Purple Basketball Shoes", category: "SPORTS", price: "₹13,499", numericPrice: 13499, brand: "Nike", color: "Purple", rating: 4.9, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
];


  const brands = ['All', ...new Set(products.map(p => p.brand))];
  const categories = ['All', ...new Set(products.map(p => p.category))];

  const [filters, setFilters] = useState({ brand: 'All', category: 'All' });

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const brandMatch = filters.brand === 'All' || p.brand === filters.brand;
      const categoryMatch = filters.category === 'All' || p.category === filters.category;
      return brandMatch && categoryMatch;
    });
  }, [filters]);

  return (
    <div className="bg-gray-100 min-h-screen font-sans py-12">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              Footwear Collection
            </span>
          </h1>
          <p className="text-gray-600">Shop shoes, boots, and sports footwear by brand or category.</p>
        </header>

        {/* Filters */}
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


        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(p => (
              <div
                key={p.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
                onClick={() => navigate(`/footDetail/${p.id}`)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">{p.name}</h3>
                  <p className="text-indigo-600 font-bold mt-2">{p.price}</p>
                  <span className="text-xs text-gray-500 mt-1 inline-block">{p.brand}</span>
                  <p className="text-gray-400 text-sm mt-1">{p.category}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-6 bg-white rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800">No Items Found</h3>
            <p className="mt-2 text-gray-500">Please adjust your filters to see more results.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FootWear;
