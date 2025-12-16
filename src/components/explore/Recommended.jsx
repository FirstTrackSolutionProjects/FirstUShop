import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";

const recommendedProducts = [
  { id: 1, name: "Laptop Backpack", price: 45999, image: "/image/recommend 1.jpg", tag: "Best Seller" },
  { id: 2, name: "Stainless Steel Water Bottle", price: 1299, image: "/image/recommend 2.jpg", tag: "Trending" },
  { id: 3, name: "Sneakers", price: 2599, image: "/image/recommend 3.jpg", tag: "Hot" },
  { id: 4, name: "Sunglasses", price: 1299, image: "/image/recommend 4.jpg", tag: "New" },
];

const Recommended = ({ search }) => {
  const { addToCart, cart } = useContext(CartContext);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const isInCart = (id) => cart.some((item) => item.id === id);

  const filteredProducts = recommendedProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mb-10 px-2 md:px-0">
      <h3 className="text-2xl md:text-3xl font-bold mb-4">✨ Recommended for You</h3>

      <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-2">
        {filteredProducts.map((product) => {
          const added = isInCart(product.id);

          return (
            <div
              key={product.id}
              className="min-w-[220px] bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              {/* IMAGE */}
              <div className="relative h-44 w-full">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />

                <span className="absolute top-2 left-2 text-xs bg-indigo-600 text-white px-2 py-1 rounded-full">
                  {product.tag}
                </span>

                <button
                  onClick={() => setQuickViewProduct(product)}
                  className="absolute bottom-2 right-2 bg-white text-black px-3 py-1 text-xs rounded shadow"
                >
                  Quick View
                </button>
              </div>

              {/* DETAILS */}
              <div className="p-4">
                <h4 className="font-semibold capitalize">{product.name}</h4>
                <p className="text-lg font-bold">₹{product.price}</p>

                <button
                  onClick={() => addToCart(product)}
                  disabled={added}
                  className={`mt-3 w-full py-2 rounded-lg text-white ${
                    added ? "bg-green-500 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-700"
                  }`}
                >
                  {added ? "Added ✓" : "Add to Cart"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
          <div className="bg-white p-5 rounded-2xl w-full max-w-md relative">

            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-3 right-3 text-xl"
            >
              ✖
            </button>

            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="w-full h-56 object-cover rounded-xl"
            />

            <h2 className="mt-4 text-2xl font-bold capitalize">
              {quickViewProduct.name}
            </h2>

            <p className="text-xl font-semibold text-pink-600">
              ₹{quickViewProduct.price}
            </p>

            <p className="mt-3 text-sm text-gray-600">
              Premium quality product with stylish design and long-lasting durability.
            </p>

            <button
              onClick={() => addToCart(quickViewProduct)}
              disabled={isInCart(quickViewProduct.id)}
              className={`mt-5 w-full py-2 rounded-xl text-white font-semibold ${
                isInCart(quickViewProduct.id)
                  ? "bg-green-500 cursor-not-allowed"
                  : "bg-pink-600 hover:bg-pink-700"
              }`}
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
