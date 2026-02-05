import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { useWishlist } from "../../context/WishlistContext";

const recommendedProducts = [
  { id: 1, name: "Laptop Backpack", price: 45999, image: "/image/recommend 1.jpg", tag: "Best Seller" },
  { id: 2, name: "Stainless Steel Water Bottle", price: 1299, image: "/image/recommend 2.jpg", tag: "Trending" },
  { id: 3, name: "Sneakers", price: 2599, image: "/image/recommend 3.jpg", tag: "Hot" },
  { id: 4, name: "Sunglasses", price: 1299, image: "/image/recommend 4.jpg", tag: "New" },
  { id: 5, name: "Wireless Mouse", price: 999, image: "/image/recommend 5.jpg", tag: "Popular" },
];

const Recommended = ({ sortBy }) => {
  const { addToCart, cart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const isInCart = (id) => cart.some((item) => item.id === id);
  const isWished = (id) => wishlist.some((w) => w.id === id);

  // Sort recommended products
  const sortedProducts = [...recommendedProducts];
  if (sortBy === "lowToHigh") sortedProducts.sort((a, b) => a.price - b.price);
  else if (sortBy === "highToLow") sortedProducts.sort((a, b) => b.price - a.price);
  else if (sortBy === "newest") sortedProducts.sort((a, b) => b.id - a.id);

  return (
    <div className="mb-10 px-2 md:px-0">
      <h3 className="text-2xl md:text-3xl font-bold mb-4">✨ Recommended for You</h3>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
        {sortedProducts.map((product) => {
          const added = isInCart(product.id);
          return (
            <div key={product.id} className="flex-shrink-0 w-44 md:w-52 bg-white rounded-2xl shadow-md overflow-hidden snap-start">
              <div className="relative h-40 md:h-44 w-full">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-t-2xl" />
                <span className="absolute top-2 left-2 text-xs bg-indigo-600 text-white px-2 py-1 rounded-full">{product.tag}</span>

                {/* WISHLIST BUTTON */}
                <button
                  onClick={() => (isWished(product.id) ? removeFromWishlist(product.id) : addToWishlist(product))}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow"
                  aria-label={isWished(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                >
                  {isWished(product.id) ? <HeartSolid className="h-5 w-5 text-red-500" /> : <HeartOutline className="h-5 w-5 text-gray-400" />}
                </button>

                <button onClick={() => setQuickViewProduct(product)} className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white px-2 py-1 text-xs rounded shadow">Quick View</button>
              </div>

              <div className="p-3 text-center">
                <h4 className="font-semibold text-sm md:text-base truncate">{product.name}</h4>
                <p className="text-sm md:text-lg font-bold mt-1">₹{product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  disabled={added}
                  className={`mt-2 w-full py-2 rounded-lg text-white text-sm ${added ? "bg-gray-400 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-700"}`}
                >
                  {added ? "Added ✓" : "Add to Cart"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {quickViewProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
          <div className="bg-white p-5 rounded-2xl w-full max-w-md relative">
            <button onClick={() => setQuickViewProduct(null)} className="absolute top-3 right-3 text-xl">✖</button>
            <img src={quickViewProduct.image} alt={quickViewProduct.name} className="w-full h-56 object-cover rounded-xl" />
            <h2 className="mt-4 text-2xl font-bold capitalize">{quickViewProduct.name}</h2>
            <p className="text-xl font-semibold text-pink-600">₹{quickViewProduct.price}</p>
            <button
              onClick={() => addToCart(quickViewProduct)}
              disabled={isInCart(quickViewProduct.id)}
              className={`mt-5 w-full py-2 rounded-xl text-white font-semibold ${isInCart(quickViewProduct.id) ? "bg-gray-400 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-700"}`}
            >
              {isInCart(quickViewProduct.id) ? "Added ✓" : "Add to Cart"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommended;
