import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

// --- SVG Icons for Categories ---
const MaleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);
const FemaleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);
const KidsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.03 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
  </svg>
);

// --- T-shirt Data ---
const tshirts = [
  { id: 1, brand: 'Volt', name: 'Graphic Print Tee', price: '₹999', image: '/image/t1.jpg', category: 'Men' },
  { id: 2, brand: 'Aura', name: 'V-Neck Cotton Tee', price: '₹799', image: '/image/t2.jpg', category: 'Women' },
  { id: 3, brand: 'PlayTime', name: 'Dino Graphic Tee', price: '₹599', image: '/image/t3.jpg', category: 'Kids' },
  { id: 4, brand: 'Volt', name: 'Vintage Logo Tee', price: '₹1,199', image: '/image/t4.jpg', category: 'Men' },
];

const Tshirt = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ brand: 'All', category: 'All' });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const filteredTshirts = useMemo(() => {
    return tshirts.filter(tshirt => {
      const brandMatch = filters.brand === 'All' || tshirt.brand === filters.brand;
      const categoryMatch = filters.category === 'All' || tshirt.category === filters.category;
      return brandMatch && categoryMatch;
    });
  }, [filters]);

  const brands = ['All', ...new Set(tshirts.map(tshirt => tshirt.brand))];
  const categories = ['All', 'Men', 'Women', 'Kids'];
  const categoryIcons = { 'Men': <MaleIcon />, 'Women': <FemaleIcon />, 'Kids': <KidsIcon /> };

  // --- Reusable Filter Button ---
  const FilterButton = ({ onClick, isActive, children }) => (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
        isActive
          ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
          : 'bg-white text-gray-800 hover:bg-gray-100 shadow-md'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div>
      <div className="bg-gray-100 min-h-screen font-sans">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* --- Header --- */}
          <header className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tighter">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                The T-Shirt Hub
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Your one-stop shop for trendy, comfortable, and unique t-shirts. Find your perfect fit with our filters.
            </p>
          </header>

          {/* --- Filter Section --- */}
          <div className="mb-12 p-6 bg-white/50 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Brands</h3>
              <div className="flex flex-wrap gap-4">
                {brands.map(brand => (
                  <FilterButton
                    key={brand}
                    isActive={filters.brand === brand}
                    onClick={() => handleFilterChange('brand', brand)}
                  >
                    {brand}
                  </FilterButton>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Categories</h3>
              <div className="flex flex-wrap gap-4">
                {categories.map(category => (
                  <FilterButton
                    key={category}
                    isActive={filters.category === category}
                    onClick={() => handleFilterChange('category', category)}
                  >
                    {categoryIcons[category]}
                    <span>{category}</span>
                  </FilterButton>
                ))}
              </div>
            </div>
          </div>

          {/* --- T-shirt Grid Section --- */}
          <main>
            {filteredTshirts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                {filteredTshirts.map((tshirt, index) => (
                  <div
                    key={tshirt.id}
                    className="group relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer"
                    onClick={() => {
                      if (index === 0) navigate('/Tsrt'); // Opens Tsrt.jsx when first card clicked
                    }}
                  >
                    <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-indigo-600 text-xs font-semibold px-2 py-1 rounded-full z-10">
                      {tshirt.brand}
                    </div>
                    <div className="h-80 overflow-hidden relative">
                      <img
                        src={tshirt.image}
                        alt={`${tshirt.brand} ${tshirt.name}`}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    </div>
                    <div className="p-5 text-center">
                      <p className="text-lg font-bold text-gray-800 truncate">{tshirt.name}</p>
                      <p className="mt-2 text-xl font-semibold text-indigo-600">{tshirt.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 px-6 bg-white rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800">No T-shirts Found</h2>
                <p className="mt-3 text-gray-500">Please broaden your filter criteria to see more results.</p>
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Tshirt;
