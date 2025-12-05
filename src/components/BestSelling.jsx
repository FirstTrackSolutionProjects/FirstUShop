import React, { useEffect, useMemo, useState } from "react";

const PRODUCTS_PER_PAGE = 4;
const SKELETON_MS = 900; // simulate loading

const sampleProducts = [
  {
    id: 1,
    name: "The North Coat",
    originalPrice: 360,
    salePrice: 260,
    rating: 5,
    reviews: 65,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=60",
    badge: "Hot",
    desc: "Premium insulated coat with water resistant shell.",
  },
  {
    id: 2,
    name: "Gucci Duffle Bag",
    originalPrice: 1160,
    salePrice: 960,
    rating: 4,
    reviews: 120,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=60",
    badge: "Sale",
    desc: "Luxury duffle with roomy interior and leather handles.",
  },
  {
    id: 3,
    name: "ROB Liquid CPU Cooler",
    originalPrice: 170,
    salePrice: 160,
    rating: 5,
    reviews: 65,
    image:
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=800&q=60",
    badge: "New",
    desc: "High performance cooler for overclocking enthusiasts.",
  },
  {
    id: 4,
    name: "Small Bookshelf",
    originalPrice: null,
    salePrice: 360,
    rating: 4,
    reviews: 45,
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=60",
    badge: "Trending",
    desc: "Minimal bookshelf with oak finish and designer legs.",
  },
  {
    id: 5,
    name: "Everyday Sneakers",
    originalPrice: 120,
    salePrice: 89,
    rating: 5,
    reviews: 200,
    image:
      "https://images.unsplash.com/photo-1528701800489-4766f1d8f5d1?auto=format&fit=crop&w=800&q=60",
    badge: "Hot",
    desc: "Comfortable sneakers perfect for daily wear.",
  },
  {
    id: 6,
    name: "Silk Saree",
    originalPrice: 250,
    salePrice: 199,
    rating: 4,
    reviews: 84,
    image:
      "https://images.unsplash.com/photo-1517351931218-82f0df6398f8?auto=format&fit=crop&w=800&q=60",
    badge: "Sale",
    desc: "Traditional silk saree with rich zari border.",
  },
];

const Star = ({ filled }) => (
  <span className={`text-sm ${filled ? "text-yellow-400" : "text-gray-300"}`}>
  {filled ? "★" : "☆"}
</span>

);

export default function BestSelling() {
  const [loading, setLoading] = useState(true);
  const [products] = useState(sampleProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState({}); // { productId: qty }
  const [wishlist, setWishlist] = useState({}); // { productId: true }
  const [quickView, setQuickView] = useState(null); // product object or null

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), SKELETON_MS);
    return () => clearTimeout(t);
  }, []);

  const totalPages = Math.max(1, Math.ceil(products.length / PRODUCTS_PER_PAGE));

  const visibleProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return products.slice(start, start + PRODUCTS_PER_PAGE);
  }, [currentPage, products]);

  // Cart helpers (only card-level cart)
  // const addToCart = (p) =>
  //   setCart((prev) => ({ ...prev, [p.id]: (prev[p.id] || 0) + 1 }));

  // const decFromCart = (p) =>
  //   setCart((prev) => {
  //     const next = { ...prev };
  //     if (!next[p.id]) return prev;
  //     if (next[p.id] === 1) delete next[p.id];
  //     else next[p.id] -= 1;
  //     return next;
  //   });


  // Wishlist 
  const toggleWishlist = (p) => {
    setWishlist((prev) => {
      const next = { ...prev };
      if (next[p.id]) delete next[p.id];
      else next[p.id] = true;
      return next;
    });
  };

  // Pagination
  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  const openQuickView = (p) => setQuickView(p);
  const closeQuickView = () => setQuickView(null);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Best Selling</h2>
            <p className="text-sm text-gray-500 mt-1">
              Customer-loved picks — updated regularly
            </p>
          </div>

         
        </div>

        {/* Grid / Products */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {loading
            ? Array.from({ length: PRODUCTS_PER_PAGE }).map((_, idx) => (
                <div
                  key={idx}
                  className="animate-pulse bg-white rounded-2xl p-4 border border-gray-100"
                >
                  <div className="h-44 bg-gray-200 rounded-md" />
                  <div className="mt-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="mt-3 h-9 bg-gray-200 rounded" />
                  </div>
                </div>
              ))
            : visibleProducts.map((p) => {
                const qty = cart[p.id] || 0;
                const isW = !!wishlist[p.id];

                return (
                  <div
                    key={p.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1 overflow-hidden"
                  >
                    <div className="relative">
                      <div className="h-48 overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>

                      {/* Badge */}
                      <span
                        className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                          p.badge === "Sale"
                            ? "bg-red-600 text-white"
                            : p.badge === "New"
                            ? "bg-blue-600 text-white"
                            : p.badge === "Hot"
                            ? "bg-orange-500 text-white"
                            : "bg-emerald-600 text-white"
                        }`}
                      >
                        {p.badge}
                      </span>

                      {/* Wishlist with bounce animation (Option A) */}
                      <button
                        onClick={() => toggleWishlist(p)}
                        aria-label="Wishlist"
                        className={`absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow transition-transform
                          ${isW ? "animate-wishlist-bounce scale-110" : "hover:scale-105"}`
                        }
                      >
                       <span
                          className={`text-xl ${isW ? "text-red-500" : "text-gray-500"}`}
                        >
                          {isW ? "❤️" : "🤍"}
                        </span>

                      </button>
                    </div>

                    <div className="p-4">
                      <h3 className="text-sm md:text-base font-semibold text-gray-900 line-clamp-1">
                        {p.name}
                      </h3>

                      <div className="flex items-center mt-2">
                        <div className="flex mr-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} filled={i < p.rating} />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">({p.reviews})</span>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div>
                          {p.originalPrice && (
                            <span className="text-xs text-gray-400 line-through mr-2">
                              ${p.originalPrice}
                            </span>
                          )}
                          <span className="text-lg font-bold text-gray-900">${p.salePrice}</span>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-2">
                        {/* {qty > 0 ? (
                          <div className="flex items-center space-x-2 bg-blue-50 px-2 py-1 rounded-full">
                            <button
                              onClick={() => decFromCart(p)}
                              className="text-blue-700 font-bold px-2"
                            >
                              -
                            </button>
                            <span className="font-medium text-blue-800">{qty}</span>
                            <button
                              onClick={() => addToCart(p)}
                              className="text-blue-700 font-bold px-2"
                            >
                              +
                            </button>
                          </div> */}
                        {/* ) : ( */}
                          <button
                            onClick={() => addToCart(p)}
                            className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                          >
                            <span className="text-xl text-gray-700">➕</span>
                            Add
                          </button>
                        {/* )} */}

                        <button
                          onClick={() => openQuickView(p)}
                          className="px-3 py-2 rounded-lg bg-white border border-gray-200 hover:shadow-sm transition text-sm"
                        >
                          Quick View
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-center space-x-3">
          <button
            onClick={goPrev}
            className="px-3 py-2 rounded-lg bg-white shadow-sm hover:shadow-md"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <div className="text-sm text-gray-600">
            Page <span className="font-semibold text-gray-900">{currentPage}</span> of{" "}
            <span className="font-medium">{totalPages}</span>
          </div>
          <button
            onClick={goNext}
            className="px-3 py-2 rounded-lg bg-white shadow-sm hover:shadow-md"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Quick View Glassmorphism Modal */}
      {quickView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            onClick={closeQuickView}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
          />
          <div className="relative z-10 max-w-4xl w-full mx-4">
            <div className="bg-white/8 backdrop-blur-md border border-white/8 rounded-2xl overflow-hidden shadow-2xl">
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={quickView.image}
                    alt={quickView.name}
                    className="w-full h-80 object-cover rounded-lg shadow-inner"
                  />
                </div>

                <div className="text-white">
                  <div className="flex items-start justify-between">
                    <h3 className="text-2xl font-bold text-white">{quickView.name}</h3>
                    <button onClick={closeQuickView} className="text-white/70 hover:text-white">✕</button>
                  </div>

                  <p className="mt-2 text-sm text-white/80">{quickView.desc}</p>

                  <div className="mt-4">
                    <div className="flex items-center gap-3">
                      <div className="text-xl font-bold text-white">${quickView.salePrice}</div>
                      {quickView.originalPrice && (
                        <div className="text-sm line-through text-white/60">${quickView.originalPrice}</div>
                      )}
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} filled={i < quickView.rating} />
                        ))}
                      </div>
                      <div className="text-sm text-white/80">({quickView.reviews} reviews)</div>
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                      <button
                        onClick={() => {
                          addToCart(quickView);
                          closeQuickView();
                        }}
                        className="bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-emerald-700"
                      >
                        Add to Cart
                      </button>

                      <button
                        onClick={() => {
                          toggleWishlist(quickView);
                        }}
                        className="bg-white/10 text-white py-2 px-4 rounded-lg border border-white/20"
                      >
                        {wishlist[quickView.id] ? "Saved" : "Add to Wishlist"}
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 text-sm text-white/80">
                    <div>- Free returns within 14 days</div>
                    <div>- Fast shipping available</div>
                    <div>- Secure payment</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-gradient-to-r from-emerald-400 to-blue-400 opacity-10 blur-3xl pointer-events-none" />
          </div>
        </div>
      )}

      {/* Tailwind helper animation (scope: global) */}
      <style jsx>{`
        @keyframes wishlist-bounce {
          0% { transform: translateY(0) scale(1); }
          30% { transform: translateY(-6px) scale(1.15); }
          60% { transform: translateY(0) scale(1.05); }
          100% { transform: translateY(0) scale(1); }
        }
        .animate-wishlist-bounce {
          animation: wishlist-bounce 420ms ease;
        }
      `}</style>
    </div>
  );
}
