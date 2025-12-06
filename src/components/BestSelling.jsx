import React, { useEffect, useMemo, useState, useContext } from "react";
// import { CartContext } from "../context/CartContext";
import { useCart } from "../context/CartContext";

const PRODUCTS_PER_PAGE = 4;
const SKELETON_MS = 900;

const sampleProducts = [
  {
    id: 1,
    name: "The North Coat",
    originalPrice: 360,
    salePrice: 260,
    rating: 5,
    reviews: 65,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=60",
    badge: "Hot",
    desc: "Premium insulated coat with water-resistant shell.",
    material: "Nylon Shell, Soft Polyester Inner",
    sizes: "M, L, XL",
    warranty: "6 Months",
  },
  {
    id: 2,
    name: "Gucci Duffle Bag",
    originalPrice: 1160,
    salePrice: 960,
    rating: 4,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=60",
    badge: "Sale",
    desc: "Luxury duffle with roomy interior and leather handles.",
    material: "Genuine Leather",
    sizes: "One Size",
    warranty: "1 Year",
  },
  {
    id: 3,
    name: "ROB Liquid CPU Cooler",
    originalPrice: 170,
    salePrice: 160,
    rating: 5,
    reviews: 65,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=800&q=60",
    badge: "New",
    desc: "High-performance cooler for overclocking enthusiasts.",
    material: "Copper Plate, RGB Fans",
    sizes: "240mm Radiator",
    warranty: "2 Years",
  },
  {
    id: 4,
    name: "Small Bookshelf",
    originalPrice: null,
    salePrice: 360,
    rating: 4,
    reviews: 45,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=60",
    badge: "Trending",
    desc: "Minimal bookshelf with oak finish and designer legs.",
    material: "Solid Oak Wood",
    sizes: "3 Shelves",
    warranty: "1 Year",
  },
];

const Star = ({ filled }) => (
  <span className={`text-sm ${filled ? "text-yellow-400" : "text-gray-300"}`}>
    {filled ? "★" : "☆"}
  </span>
);

export default function BestSelling() {
  // const { addToCart, cart } = useContext(CartContext);
  const { addToCart, cart } = useCart();


  const [loading, setLoading] = useState(true);
  const [products] = useState(sampleProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState({});
  const [quickView, setQuickView] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), SKELETON_MS);
    return () => clearTimeout(t);
  }, []);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const visibleProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return products.slice(start, start + PRODUCTS_PER_PAGE);
  }, [currentPage, products]);

  const toggleWishlist = (p) =>
    setWishlist((prev) => ({ ...prev, [p.id]: !prev[p.id] }));

  

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-2">Best Selling</h2>
        <p className="text-sm text-gray-500 mb-8">
          Customer-loved picks — updated regularly
        </p>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
                <div key={i} className="animate-pulse bg-white p-4 rounded-2xl border">
                  <div className="h-44 bg-gray-200 rounded-md" />
                </div>
              ))
            : visibleProducts.map((p) => {
                const isAdded = cart.some((item) => item.id === p.id);

                const isW = !!wishlist[p.id];

                return (
                  <div
                    key={p.id}
                    className="bg-white rounded-2xl p-4 border shadow-sm hover:shadow-lg transition overflow-hidden"
                  >
                    {/* IMAGE */}
                    <div className="relative">
                      <img src={p.image} className="w-full h-48 object-cover rounded-lg" />

                      <span
                        className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white ${
                          p.badge === "Sale"
                            ? "bg-red-600"
                            : p.badge === "New"
                            ? "bg-blue-600"
                            : p.badge === "Hot"
                            ? "bg-orange-500"
                            : "bg-green-600"
                        }`}
                      >
                        {p.badge}
                      </span>

                      <button
                        onClick={() => toggleWishlist(p)}
                        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
                      >
                        <span className={`text-xl ${isW ? "text-red-500" : "text-gray-500"}`}>
                          {isW ? "❤️" : "🤍"}
                        </span>
                      </button>
                    </div>

                    {/* DETAILS */}
                    <h3 className="mt-3 font-semibold">{p.name}</h3>

                    <div className="flex items-center mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} filled={i < p.rating} />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">({p.reviews})</span>
                    </div>

                    <div className="mt-2">
                      {p.originalPrice && (
                        <span className="line-through text-gray-400 mr-2 text-sm">
                          ${p.originalPrice}
                        </span>
                      )}
                      <span className="text-lg font-bold">${p.salePrice}</span>
                    </div>

                    {/* BUTTONS */}
                    <div className="mt-4 flex gap-2">
                      {!isAdded ? (
                        <button
                          onClick={() => addToCart({...p, price: p.salePrice, img: p.image})}
                          className="flex-1 py-2 bg-blue-600 text-white rounded-lg"
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <button className="flex-1 py-2 bg-green-600 text-white rounded-lg cursor-default">
                          ✓ Added
                        </button>
                      )}

                      <button
                        onClick={() => setQuickView(p)}
                        className="px-3 py-2 border rounded-lg"
                      >
                        Quick View
                      </button>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* PAGINATION */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 border rounded-lg bg-white"
            disabled={currentPage === 1}
          >
            Prev
          </button>

          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-4 py-2 border rounded-lg bg-white"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        {/* QUICK VIEW MODAL */}
        {quickView && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 w-11/12 max-w-lg rounded-2xl shadow-xl">
              <img src={quickView.image} className="w-full h-60 object-cover rounded-xl" />

              <h2 className="text-xl font-bold mt-4">{quickView.name}</h2>
              <p className="mt-2 text-gray-600">{quickView.desc}</p>

              <div className="mt-4 text-sm">
                <p><strong>Material:</strong> {quickView.material}</p>
                <p><strong>Sizes:</strong> {quickView.sizes}</p>
                <p><strong>Warranty:</strong> {quickView.warranty}</p>
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  className="flex-1 py-2 border rounded-lg"
                  onClick={() => setQuickView(null)}
                >
                  Close
                </button>

              {cart.some((item) => item.id === quickView.id) ? (
                  <button className="flex-1 py-2 bg-green-600 text-white rounded-lg">
                    ✓ Added
                  </button>
                ) : (
                  <button
                    className="flex-1 py-2 bg-blue-600 text-white rounded-lg"
                    onClick={() => {
                      addToCart({...quickView, price: quickView.salePrice, img: quickView.image});
                    
                    }}
                  >
                    Add to Cart
                  </button>
                )}

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
