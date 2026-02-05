import React, { useState } from "react";
import { ShoppingCartIcon, EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const deals = [
  { id: 1, name: "Leather Wallet", price: 799, oldPrice: 1299, image: "/image/deal 1.jpg", tag: "50% OFF" },
  { id: 2, name: "Bluetooth Speaker", price: 1499, oldPrice: 2499, image: "/image/deal 2.jpg", tag: "Hot Deal" },
  { id: 3, name: "Smart Watch", price: 2999, oldPrice: 4999, image: "/image/deal 3.jpg", tag: "Trending" },
  { id: 4, name: "Running Shoes", price: 1999, oldPrice: 3499, image: "/image/deal 4.jpg", tag: "Limited Offer" },
  { id: 5, name: "Wireless Earbuds", price: 999, oldPrice: 1999, image: "/image/deal 5.jpg", tag: "Best Seller" },
];

const DealsOfTheDay = ({ sortBy }) => {
  const { addToCart, cart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [quickView, setQuickView] = useState(null);

  const isInCart = (id) => cart.some((item) => item.id === id);
  const isWished = (id) => wishlist.some((w) => w.id === id);

  // Sort deals based on sortBy prop
  const sortedDeals = [...deals];
  if (sortBy === "lowToHigh") sortedDeals.sort((a, b) => a.price - b.price);
  else if (sortBy === "highToLow") sortedDeals.sort((a, b) => b.price - a.price);
  else if (sortBy === "newest") sortedDeals.sort((a, b) => b.id - a.id); // or date field

  return (
    <div className="mt-4 mb-8 px-2 md:px-0">
      <h2 className="text-xl md:text-2xl font-bold mb-4">🔥 Deals of the Day</h2>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
        {sortedDeals.map((deal) => (
          <div key={deal.id} className="flex-shrink-0 w-44 md:w-52 bg-white rounded-2xl shadow-md overflow-hidden snap-start">
            <div className="relative h-36 md:h-44 w-full">
              <img src={deal.image} alt={deal.name} className="w-full h-full object-cover rounded-t-2xl" />
              <span className="absolute top-2 left-2 text-xs bg-red-600 text-white px-2 py-1 rounded-full">{deal.tag}</span>

              {/* WISHLIST BUTTON */}
              <button
                onClick={() => (isWished(deal.id) ? removeFromWishlist(deal.id) : addToWishlist(deal))}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow"
                aria-label={isWished(deal.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                {isWished(deal.id) ? <HeartSolid className="h-5 w-5 text-red-500" /> : <HeartOutline className="h-5 w-5 text-gray-400" />}
              </button>

              {/* QUICK VIEW */}
              <button onClick={() => setQuickView(deal)} className="absolute top-2 right-12 bg-white p-2 rounded-full shadow">
                <EyeIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="p-3 text-center">
              <h3 className="font-semibold text-sm md:text-base truncate">{deal.name}</h3>
              <p className="text-sm md:text-lg mt-1">
                <span className="line-through text-gray-400 mr-1">₹{deal.oldPrice}</span>
                <span className="text-indigo-600 font-bold">₹{deal.price}</span>
              </p>
              <button
                onClick={() => addToCart(deal)}
                disabled={isInCart(deal.id)}
                className={`mt-2 w-full py-2 rounded-lg text-white text-sm flex items-center justify-center gap-2 ${
                  isInCart(deal.id) ? "bg-gray-300 text-gray-700 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                <ShoppingCartIcon className="h-4 w-4" />
                {isInCart(deal.id) ? "Added ✓" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* QUICK VIEW */}
      {quickView && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
          <div className="bg-white p-5 rounded-2xl w-full max-w-md relative">
            <button onClick={() => setQuickView(null)} className="absolute top-3 right-3">
              <XMarkIcon className="h-6 w-6" />
            </button>

            <img src={quickView.image} alt={quickView.name} className="w-full h-52 object-cover rounded-lg" />
            <h3 className="mt-4 font-bold text-lg">{quickView.name}</h3>
            <p className="mt-1">
              <span className="line-through text-gray-400 mr-1">₹{quickView.oldPrice}</span>
              <span className="text-indigo-600 font-bold">₹{quickView.price}</span>
            </p>
            <button
              onClick={() => addToCart(quickView)}
              disabled={isInCart(quickView.id)}
              className={`mt-4 w-full py-2 rounded-lg text-white ${isInCart(quickView.id) ? "bg-gray-300" : "bg-indigo-600 hover:bg-indigo-700"}`}
            >
              {isInCart(quickView.id) ? "Added ✓" : "Add to Cart"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DealsOfTheDay;
