import React, { useEffect, useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import bestSellingProducts from "../data/bestSellingProducts";

const PRODUCTS_PER_PAGE = 4;
const SKELETON_MS = 800;

const Star = ({ filled }) => (
  <span className={filled ? "text-yellow-400" : "text-gray-300"}>★</span>
);

export default function BestSelling() {
  const { addToCart, cart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [quickView, setQuickView] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), SKELETON_MS);
    return () => clearTimeout(t);
  }, []);

  const totalPages = Math.ceil(
    bestSellingProducts.length / PRODUCTS_PER_PAGE
  );

  const visibleProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return bestSellingProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [currentPage]);

  const isWishlisted = (id) =>
    wishlist.some((item) => item.id === id);

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-14">
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER */}
        <div className="mb-10">
          <h2 className="text-4xl font-extrabold">Best Selling</h2>
          <p className="text-gray-500 mt-1">
            Customer-loved picks — updated regularly
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[420px] bg-white rounded-2xl animate-pulse"
                />
              ))
            : visibleProducts.map((p) => {
                const added = cart.some((c) => c.id === p.id);
                const liked = isWishlisted(p.id);

                return (
                  <div
                    key={p.id}
                    className="group bg-white rounded-2xl overflow-hidden border hover:shadow-xl transition"
                  >
                    {/* IMAGE */}
                    <div className="relative h-56 bg-gray-100">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />

                      <span className="absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full bg-black text-white">
                        {p.badge}
                      </span>

                      {/* WISHLIST BUTTON */}
                      <button
                        onClick={() =>
                          liked
                            ? removeFromWishlist(p.id)
                            : addToWishlist({
                                id: p.id,
                                name: p.name,
                                price: p.salePrice,
                                image: p.image,
                              })
                        }
                        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
                      >
                        {liked ? "❤️" : "🤍"}
                      </button>
                    </div>

                    {/* INFO */}
                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold text-lg">{p.name}</h3>

                      <div className="flex items-center text-sm">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} filled={i < p.rating} />
                        ))}
                        <span className="ml-2 text-gray-500">
                          ({p.reviews})
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {p.originalPrice && (
                          <span className="line-through text-gray-400">
                            ₹{p.originalPrice}
                          </span>
                        )}
                        <span className="text-xl font-bold">
                          ₹{p.salePrice}
                        </span>
                      </div>

                      {/* ACTIONS */}
                      <div className="pt-3 flex gap-2">
                        <button
                          disabled={added}
                          onClick={() =>
                            addToCart({
                              ...p,
                              price: p.salePrice,
                              img: p.image,
                            })
                          }
                          className={`flex-1 py-2 rounded-lg text-sm font-semibold ${
                            added
                              ? "bg-green-600 text-white"
                              : "bg-blue-600 hover:bg-blue-700 text-white"
                          }`}
                        >
                          {added ? "✓ Added" : "Add to Cart"}
                        </button>

                        <button
                          onClick={() => setQuickView(p)}
                          className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                        >
                          Quick View
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-6 mt-12">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-5 py-2 border rounded-lg bg-white"
          >
            Prev
          </button>

          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-5 py-2 border rounded-lg bg-white"
          >
            Next
          </button>
        </div>

        {/* QUICK VIEW */}
        {quickView && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full">
              <img
                src={quickView.image}
                className="w-full h-64 object-cover rounded-xl"
              />
              <h3 className="text-2xl font-bold mt-4">
                {quickView.name}
              </h3>
              <p className="text-gray-600 mt-2">{quickView.desc}</p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setQuickView(null)}
                  className="flex-1 border py-2 rounded-lg"
                >
                  Close
                </button>
                <button
                  onClick={() =>
                    addToCart({
                      ...quickView,
                      price: quickView.salePrice,
                      img: quickView.image,
                    })
                  }
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
