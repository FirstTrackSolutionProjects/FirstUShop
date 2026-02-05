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

const trends = [
  { label: "Men Shirts", icon: Shirt },
  { label: "T-Shirts", icon: Shirt },
  { label: "Jeans", icon: ShoppingBag },
  { label: "Kids Wear", icon: Baby },
  { label: "Makeup", icon: Sparkles },
  { label: "Sports Shoes", icon: Zap },
  { label: "Sandals", icon: Zap },
  { label: "Saree", icon: ShoppingBag },
  { label: "Jewellery", icon: Sparkles },
  { label: "Toys", icon: Baby },
  { label: "Bluetooth Earbuds", icon: Headphones },
  { label: "Smartwatch", icon: Watch },
  { label: "Bags", icon: ShoppingBag },
  { label: "Home Decor", icon: Home },
  { label: "Kitchen Set", icon: CookingPot },
];

const TrendingSearch = ({ onSelect }) => {
  return (
    <section className="bg-white rounded-2xl shadow-sm p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🔥</span>
        <h3 className="text-lg font-semibold text-gray-800">
          Trending Searches
        </h3>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {trends.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={() => onSelect?.(item.label)}
              className="
                group flex items-center gap-2
                px-4 py-3
                rounded-xl
                bg-gray-50
                border border-gray-200
                text-sm font-medium text-gray-700
                transition-all duration-200
                hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500
                hover:text-white hover:border-transparent
                hover:shadow-lg
              "
            >
              <Icon
                size={16}
                className="text-gray-500 group-hover:text-white"
              />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default TrendingSearch;
