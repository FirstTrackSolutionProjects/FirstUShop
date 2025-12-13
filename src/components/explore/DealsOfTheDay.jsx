import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRightIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "../../context/CartContext"; // ✅ Correct path

// Sample products for Deals of the Day
const deals = [
  {
    id: 1,
    name: "Leather Wallet",
    price: 799,
    oldPrice: 1299,
    image:
      "https://images.unsplash.com/photo-1593032465172-032e5a4cba40?auto=format&fit=crop&w=500&q=80",
    tag: "50% OFF",
  },
  {
    id: 2,
    name: "Bluetooth Speaker",
    price: 1499,
    oldPrice: 2499,
    image:
      "https://images.unsplash.com/photo-1580910051071-7a6ed53b37b5?auto=format&fit=crop&w=500&q=80",
    tag: "Hot Deal",
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 2999,
    oldPrice: 4999,
    image:
      "https://images.unsplash.com/photo-1612831661425-bd8d25b8e7d8?auto=format&fit=crop&w=500&q=80",
    tag: "Trending",
  },
  {
    id: 4,
    name: "Wireless Earbuds",
    price: 1999,
    oldPrice: 3499,
    image:
      "https://images.unsplash.com/photo-1598674721614-fb08f6d2fcd2?auto=format&fit=crop&w=500&q=80",
    tag: "Best Seller",
  },
];

const DealsOfTheDay = () => {
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();

  // Check if item is already in cart
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
            className="min-w-[180px] md:min-w-[220px] bg-white rounded-2xl shadow-md cursor-pointer overflow-hidden group transition-all duration-300 hover:shadow-xl"
          >
            {/* Image */}
            <div
              className="relative h-36 md:h-44 w-full overflow-hidden"
              onClick={() => navigate(`/product/${deal.id}`)}
            >
              <img
                src={deal.image}
                alt={deal.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute top-3 left-3 text-xs md:text-sm bg-red-600 text-white px-2 md:px-3 py-1 rounded-full">
                {deal.tag}
              </div>
            </div>

            {/* Text */}
            <div className="p-3 md:p-4">
              <h3 className="font-bold text-base md:text-lg text-gray-800">
                {deal.name}
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                <span className="line-through mr-2">₹{deal.oldPrice}</span>
                <span className="text-indigo-600 font-semibold">₹{deal.price}</span>
              </p>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(deal)}
                disabled={isInCart(deal.id)}
                className={`mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isInCart(deal.id)
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                <ShoppingCartIcon className="h-4 w-4" />
                {isInCart(deal.id) ? "Added" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Hide Scrollbar */}
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>
    </div>
  );
};

export default DealsOfTheDay;
