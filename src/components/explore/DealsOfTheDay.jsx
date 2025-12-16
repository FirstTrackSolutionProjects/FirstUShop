import React, { useState } from "react";
import {
  ChevronRightIcon,
  ShoppingCartIcon,
  EyeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCart } from "../../context/CartContext";

// Sample products
const deals = [
  {
    id: 1,
    name: "Leather Wallet",
    price: 799,
    oldPrice: 1299,
    image: "/image/deal 1.jpg",
    tag: "50% OFF",
  },
  {
    id: 2,
    name: "Bluetooth Speaker",
    price: 1499,
    oldPrice: 2499,
    image: "/image/deal 2.jpg",
    tag: "Hot Deal",
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 2999,
    oldPrice: 4999,
    image: "/image/deal 3.jpg",
    tag: "Trending",
  },
  {
    id: 4,
    name: "Wireless Earbuds",
    price: 1999,
    oldPrice: 3499,
    image: "/image/deal 4.jpg",
    tag: "Best Seller",
  },
];

const DealsOfTheDay = () => {
  const { addToCart, cart } = useCart();
  const [quickView, setQuickView] = useState(null);

  const isInCart = (id) => cart.some((item) => item.id === id);

  return (
    <div className="mt-4 mb-8 px-2 md:px-0">
      {/* Heading */}
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-xl md:text-2xl font-bold">🔥 Deals of the Day</h2>
        <button className="flex items-center text-indigo-600 hover:text-indigo-800">
          View All <ChevronRightIcon className="h-5 w-5 ml-1" />
        </button>
      </div>

      {/* Slider */}
      <div className="flex space-x-4 md:space-x-6 overflow-x-auto pb-4 scrollbar-hide">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="min-w-[180px] md:min-w-[230px] bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            {/* Image */}
            <div className="relative h-36 md:h-44 w-full">
              <img
                src={deal.image}
                alt={deal.name}
                className="h-full w-full object-cover"
              />

              {/* Tag */}
              <span className="absolute top-3 left-3 text-xs bg-red-600 text-white px-3 py-1 rounded-full z-10">
                {deal.tag}
              </span>

              {/* Eye Icon */}
              <button
                onClick={() => setQuickView(deal)}
                className="absolute top-3 right-3 bg-white/90 hover:bg-indigo-600
                           text-gray-800 hover:text-white p-2 rounded-full shadow-md transition"
              >
                <EyeIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-3 md:p-4">
              <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                {deal.name}
              </h3>

              <p className="text-sm mt-1">
                <span className="line-through text-gray-400 mr-2">
                  ₹{deal.oldPrice}
                </span>
                <span className="text-indigo-600 font-bold">
                  ₹{deal.price}
                </span>
              </p>

              {/* Add to Cart */}
              <button
                onClick={() => addToCart(deal)}
                disabled={isInCart(deal.id)}
                className={`mt-3 w-full flex items-center justify-center gap-2 px-3 py-2
                text-sm rounded-lg font-medium transition ${
                  isInCart(deal.id)
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                <ShoppingCartIcon className="h-4 w-4" />
                {isInCart(deal.id) ? "Added to Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick View Modal */}
      {quickView && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white w-[90%] md:w-[420px] rounded-2xl p-5 relative">
            {/* Close */}
            <button
              onClick={() => setQuickView(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            {/* Image */}
            <img
              src={quickView.image}
              alt={quickView.name}
              className="w-full h-52 object-cover rounded-lg"
            />

            {/* Info */}
            <h3 className="mt-4 font-bold text-lg">{quickView.name}</h3>

            <p className="mt-1 text-sm">
              <span className="line-through text-gray-400 mr-2">
                ₹{quickView.oldPrice}
              </span>
              <span className="text-indigo-600 font-bold">
                ₹{quickView.price}
              </span>
            </p>

            <p className="mt-3 text-sm text-gray-600">
              Premium quality product with best deals of the day.
            </p>

            {/* Add to Cart (Synced) */}
            <button
              onClick={() => addToCart(quickView)}
              disabled={isInCart(quickView.id)}
              className={`mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-lg font-medium transition ${
                isInCart(quickView.id)
                  ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              <ShoppingCartIcon className="h-4 w-4" />
              {isInCart(quickView.id) ? "Added to Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      )}

      {/* Hide Scrollbar */}
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { scrollbar-width: none; }
        `}
      </style>
    </div>
  );
};

export default DealsOfTheDay;
