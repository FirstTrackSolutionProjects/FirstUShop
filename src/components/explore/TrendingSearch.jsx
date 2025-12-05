import React from "react";
import {
  Shirt,
  Baby,
  Sparkles,
  Watch,
  Headphones,
  ShoppingBag,
  Home,
  CookingPot,
  Zap,
} from "lucide-react";

// Icon mapping (auto picked best icons)
const tagIcons = {
  "Men Shirts": <Shirt size={16} />,
  Jeans: <ShoppingBag size={16} />,
  "Kids Wear": <Baby size={16} />,
  Makeup: <Sparkles size={16} />,
  "Sports Shoes": <Zap size={16} />,
  Sandals: <Zap size={16} />,
  Saree: <ShoppingBag size={16} />,
  Jewellery: <Sparkles size={16} />,
  Toys: <Baby size={16} />,
  "Bluetooth Earbuds": <Headphones size={16} />,
  Smartwatch: <Watch size={16} />,
  Bags: <ShoppingBag size={16} />,
  "Home Decor": <Home size={16} />,
 
  "Kitchen Set": <CookingPot size={16} />,
};

const tags = [
  "Men Shirts", "Tshirts", "Jeans", "Kids Wear", "Makeup",
  "Sports Shoes", "Sandals", "Saree", "Jewellery", "Toys",
  "Bluetooth Earbuds", "Smartwatch", "Bags", "Home Decor", "Kitchen Set"
];

const TrendingSearch = () => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-3">🔥 Trending Searches</h3>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="
              flex items-center gap-2
              px-4 py-2
              text-sm font-semibold
              rounded-full
              shadow-md
              cursor-pointer
              backdrop-blur-md
              bg-white/20
              border border-white/30
              text-black
              whitespace-nowrap
              transition-all duration-300
              hover:bg-white/30 hover:scale-105 hover:shadow-lg
            "
          >
            {tagIcons[tag] || <Sparkles size={16} />}
            #{tag}
          </span>
        ))}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default TrendingSearch;
