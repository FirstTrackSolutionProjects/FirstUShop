import React, { useState } from 'react';
import Footer from '../components/Footer';

// --- Product Data (Back to a single object) ---
const productDetails = {
  id: 1,
  name: 'Graphic Print Tee',
  rating: 4.7, 
  price: '₹999',
  
  // A master list of all possible sizes for the UI buttons
  allSizes: ['S', 'M', 'L', 'XL', 'XXL'], 
  
  // Each color contains its own variants (size + specific images)
  colors: [
    {
      name: 'White/Black',
      colorValue: 'bg-white',
      variants: [
        { 
          size: 'S', 
          img1: 'https://via.placeholder.com/400x400.png?text=White+T-Shirt+(S)', 
          img2: 'https://via.placeholder.com/400x400.png?text=Black+T-Shirt+(S)' 
        },
        { 
          size: 'M', 
          img1: 'https://via.placeholder.com/400x400.png?text=White+T-Shirt+(M)', 
          img2: 'https://via.placeholder.com/400x400.png?text=Black+T-Shirt+(M)' 
        },
        { 
          size: 'L', 
          img1: 'https://via.placeholder.com/400x400.png?text=White+T-Shirt+(L)', 
          img2: 'https://via.placeholder.com/400x400.png?text=Black+T-Shirt+(L)' 
        },
        { 
          size: 'XL', 
          img1: 'https://via.placeholder.com/400x400.png?text=White+T-Shirt+(XL)', 
          img2: 'https://via.placeholder.com/400x400.png?text=Black+T-Shirt+(XL)' 
        },
        { 
          size: 'XXL', 
          img1: 'https://via.placeholder.com/400x400.png?text=White+T-Shirt+(XXL)', 
          img2: 'https://via.placeholder.com/400x400.png?text=Black+T-Shirt+(XXL)' 
        }
      ]
    },
    {
      name: 'Red/Blue',
      colorValue: 'bg-red-500',
      variants: [
        { 
          size: 'M', 
          img1: 'https://via.placeholder.com/400x400.png?text=Red+T-Shirt+(M)', 
          img2: 'https://via.placeholder.com/400x400.png?text=Blue+T-Shirt+(M)' 
        },
        { 
          size: 'L', 
          img1: 'https://via.placeholder.com/400x400.png?text=Red+T-Shirt+(L)', 
          img2: 'https://via.placeholder.com/400x400.png?text=Blue+T-Shirt+(L)' 
        },
        { 
          size: 'XL', 
          img1: 'https://via.placeholder.com/400x400.png?text=Red+T-Shirt+(XL)', 
          img2: 'https://via.placeholder.com/400x400.png?text=Blue+T-Shirt+(XL)' 
        },
        { 
          size: 'XXL', 
          img1: 'https://via.placeholder.com/400x400.png?text=Red+T-Shirt+(XXL)', 
          img2: 'https://via.placeholder.com/400x400.png?text=Blue+T-Shirt+(XXL)' 
        }
      ]
    }
  ]
};
// ---------------------------------------------

// --- Star Icon Components (using SVG for clean, scalable icons) ---

const FullStar = () => (
  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
  </svg>
);
const HalfStar = () => (
  <div className="relative inline-block"><EmptyStar /><div className="absolute top-0 left-0 w-1/2 overflow-hidden"><FullStar /></div></div>
);
const EmptyStar = () => (
  <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
  </svg>
);

// --- Star Rating Logic Component ---
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) stars.push(<FullStar key={i} />);
    else if (i - 0.5 <= rating) stars.push(<HalfStar key={i} />);
    else stars.push(<EmptyStar key={i} />);
  }
  return <div className="flex justify-center">{stars}</div>;
};

// --- Main T-Shirt Page Component ---
const Tsrt = () => {
  const [zoomedImage, setZoomedImage] = useState(null);
  
  // State is now back in the main component
  const [selectedColorName, setSelectedColorName] = useState(productDetails.colors[0].name);
  const [selectedSize, setSelectedSize] = useState(productDetails.colors[0].variants[0].size);

  // --- LOGIC TO FIND CURRENT DATA ---
  
  const currentColorObj = productDetails.colors.find(c => c.name === selectedColorName) || productDetails.colors[0];

  const currentVariant = 
    currentColorObj.variants.find(v => v.size === selectedSize) || 
    currentColorObj.variants[0];

  const availableSizesForColor = currentColorObj.variants.map(v => v.size);

  // --- EVENT HANDLERS ---

  const handleColorClick = (color) => {
    setSelectedColorName(color.name);
    
    const isSizeAvailable = color.variants.some(v => v.size === selectedSize);
    
    if (!isSizeAvailable) {
      setSelectedSize(color.variants[0].size);
    }
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };
  
  const handleImageClick = (imageUrl) => {
    setZoomedImage(imageUrl);
  };

  const handleCloseZoom = () => {
    setZoomedImage(null);
  };

  return (
    // Page container centers the single card
    <div>
    <div className="p-5 font-sans min-h-screen bg-gray-50 flex items-center justify-center">
      
      {/* The Single Product Card */}
      <div className="border border-gray-200 rounded-lg p-5 bg-white w-full max-w-md text-center shadow-2xl">
        
        {/* --- IMAGE CONTAINER --- */}
        <div className="flex gap-4 mb-4">
          <img
            src={currentVariant.img1}
            alt={`${productDetails.name} - ${currentColorObj.name} 1`}
            className="w-1/2 h-64 object-cover rounded-md cursor-pointer transition-opacity duration-200 hover:opacity-80"
            onClick={() => handleImageClick(currentVariant.img1)}
          />
          <img
            src={currentVariant.img2}
            alt={`${productDetails.name} - ${currentColorObj.name} 2`}
            className="w-1/2 h-64 object-cover rounded-md cursor-pointer transition-opacity duration-200 hover:opacity-80"
            onClick={() => handleImageClick(currentVariant.img2)}
          />
        </div>
        
        {/* Product Details */}
        <h3 className="text-2xl font-bold my-3 text-gray-900">{productDetails.name}</h3>
        
        <div className="flex justify-center items-center gap-2 my-2">
          <StarRating rating={productDetails.rating} />
          <span className="text-md text-gray-600">({productDetails.rating} / 5)</span>
        </div>

        <p className="text-xl font-bold text-blue-600 my-3">{productDetails.price}</p>
        
        {/* --- COLOR SELECTOR --- */}
        <div className="my-5 text-left">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color: <span className="font-bold">{currentColorObj.name}</span>
          </label>
          <div className="flex justify-center gap-3 flex-wrap">
            {productDetails.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorClick(color)}
                className={`
                  w-8 h-8 rounded-full border-2 p-0.5
                  ${selectedColorName === color.name 
                    ? 'border-blue-600 ring-2 ring-blue-300' 
                    : 'border-gray-300'}
                `}
                title={color.name}
              >
                <div className={`w-full h-full rounded-full ${color.colorValue} border border-gray-400`}></div>
              </button>
            ))}
          </div>
        </div>
        
        {/* --- SIZE SELECTOR --- */}
        <div className="my-5 text-left">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Size: <span className="font-bold">{selectedSize}</span>
          </label>
          <div className="flex justify-center gap-2 flex-wrap">
            {productDetails.allSizes.map((size) => {
              
              const isAvailable = availableSizesForColor.includes(size);
              
              return (
                <button
                  key={size}
                  onClick={() => handleSizeClick(size)}
                  disabled={!isAvailable} 
                  className={`
                    w-10 h-10 rounded-md border flex items-center justify-center 
                    font-semibold cursor-pointer transition-all duration-200
                    ${selectedSize === size 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'bg-white text-gray-800 border-gray-300'}
                    
                    ${isAvailable
                      ? 'hover:bg-gray-100' 
                      : 'bg-gray-100 text-gray-400 opacity-70 cursor-not-allowed'}
                  `}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
        
        <button className="bg-blue-600 text-white border-none py-3 px-6 rounded-md text-base font-bold cursor-pointer w-full transition-colors duration-200 hover:bg-blue-700">
          Pay Now
        </button>
      </div>
      
      {/* --- Zoom Modal (No change) --- */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50 p-5" 
          onClick={handleCloseZoom}
        >
          <span 
            className="absolute top-5 right-8 text-white text-5xl font-light cursor-pointer leading-none" 
            onClick={handleCloseZoom}
          >
            &times;
          </span>
          <img
            src={zoomedImage}
            alt="Zoomed product"
            className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
    <Footer/>
    </div>
  );
};

export default Tsrt;