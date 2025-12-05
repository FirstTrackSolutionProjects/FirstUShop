import React from "react";

// Sample recommended products
const recommendedProducts = [
  { id: 1, name: "Leather Wallet", price: 799, image: "https://images.unsplash.com/photo-1593032465172-032e5a4cba40?auto=format&fit=crop&w=500&q=80", tag: "Top Pick" },
  { id: 2, name: "Bluetooth Speaker", price: 1499, image: "https://images.unsplash.com/photo-1583224150018-93a7d2dbf9c3?auto=format&fit=crop&w=500&q=80", tag: "Trending" },
  { id: 3, name: "Sneakers", price: 2599, image: "https://images.unsplash.com/photo-1585386959984-a4155225d9d2?auto=format&fit=crop&w=500&q=80", tag: "Hot" },
  { id: 4, name: "Sunglasses", price: 1299, image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=500&q=80", tag: "New" },
];

const Recommended = () => {
  return (
    <div className="mb-10 px-2 md:px-0">
      <h3 className="text-2xl md:text-3xl font-bold mb-4">✨ Recommended for You</h3>

      {/* MOBILE → horizontal scroll | LAPTOP → grid */}
      <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-2 scroll-smooth">
        {recommendedProducts.map((product) => (
          <div
            key={product.id}
            className="min-w-[200px] md:min-w-0 bg-white rounded-2xl shadow-md cursor-pointer overflow-hidden flex-shrink-0 group transition transform hover:scale-105 hover:shadow-xl"
          >
            <div className="relative h-40 md:h-48 w-full overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />

              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

              {/* Top-left tag */}
              {product.tag && (
                <span className="absolute top-2 left-2 text-xs md:text-sm bg-indigo-600 text-white px-2 md:px-3 py-1 rounded-full shadow">
                  {product.tag}
                </span>
              )}
            </div>

            <div className="p-3 md:p-4">
              <h4 className="text-sm md:text-base font-semibold text-gray-800 truncate">{product.name}</h4>
              <p className="text-lg md:text-xl font-bold text-gray-900 mt-1">₹{product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Hide scrollbar */}
      <style>
        {`
          .scroll-smooth::-webkit-scrollbar { display: none; }
          .scroll-smooth { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>
    </div>
  );
};

export default Recommended;
