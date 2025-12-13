import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { ShoppingCartIcon, EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";

const CategoryPage = () => {
  const { slug } = useParams();
  const { addToCart, cart } = useCart();

  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const isInCart = (id) => cart.some((item) => item.id === id);

  const filteredProducts = products.filter((p) => p.category === slug);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        {slug.replace("-", " ")}
      </h1>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.length === 0 ? (
          <p>No products found in this category.</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow hover:shadow-lg transition relative"
            >
              {/* PRODUCT IMAGE */}
              <div className="relative group">
                <img
                  src={product.image}
                  className="w-full h-48 object-cover rounded"
                  alt={product.name}
                />

                {/* QUICK VIEW BUTTON */}
                <button
                  onClick={() => setQuickViewProduct(product)}
                  className="
                    absolute top-2 right-2
                    bg-white shadow p-2 rounded-full
                    opacity-0 group-hover:opacity-100
                    transition
                  "
                >
                  <EyeIcon className="h-5 w-5 text-gray-700" />
                </button>
              </div>

              {/* TITLE */}
              <h2 className="mt-3 font-semibold text-lg">{product.name}</h2>

              {/* PRICE */}
              <p className="text-gray-600 mt-1">
                ₹{product.price}{" "}
                <span className="line-through text-red-400">
                  ₹{product.oldPrice}
                </span>
              </p>

              {/* ADD TO CART BUTTON */}
              <button
                onClick={() => addToCart(product)}
                disabled={isInCart(product.id)}
                className={`mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium
                  ${
                    isInCart(product.id)
                      ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                      : "bg-pink-600 text-white hover:bg-pink-700"
                  }
                `}
              >
                <ShoppingCartIcon className="h-5 w-5" />
                {isInCart(product.id) ? "Added" : "Add to Cart"}
              </button>
            </div>
          ))
        )}
      </div>

      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-xl p-6 relative shadow-xl">
            {/* Close button */}
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-3 right-3 bg-gray-200 p-1.5 rounded-full"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            {/* IMAGE */}
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="w-full h-56 object-cover rounded-lg"
            />

            <h2 className="text-2xl font-bold mt-4">
              {quickViewProduct.name}
            </h2>

            <p className="text-gray-700 mt-2">
              {quickViewProduct.description || "No description available."}
            </p>

            <p className="text-xl font-semibold mt-3">
              ₹{quickViewProduct.price}{" "}
              <span className="line-through text-red-400 text-lg">
                ₹{quickViewProduct.oldPrice}
              </span>
            </p>

            <button
              onClick={() => {
                addToCart(quickViewProduct);
                setQuickViewProduct(null);
              }}
              disabled={isInCart(quickViewProduct.id)}
              className={`
                mt-5 w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2 
                ${
                  isInCart(quickViewProduct.id)
                    ? "bg-gray-300 text-gray-700"
                    : "bg-pink-600 text-white hover:bg-pink-700"
                }
              `}
            >
              <ShoppingCartIcon className="h-5 w-5" />
              {isInCart(quickViewProduct.id) ? "Added" : "Add to Cart"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
