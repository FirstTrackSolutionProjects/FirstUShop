import { useParams } from "react-router-dom";
import { products } from "../data/products";

const CategoryPage = () => {
  const { slug } = useParams();

  const filteredProducts = products.filter(
    (p) => p.category === slug
  );

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        {slug.replace("-", " ")} 
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.length === 0 ? (
          <p>No products found in this category.</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={product.image}
                className="w-full h-48 object-cover rounded"
                alt=""
              />
              <h2 className="mt-3 font-semibold text-lg">{product.name}</h2>

              <p className="text-gray-600 mt-1">
                ₹{product.price}{" "}
                <span className="line-through text-red-400">
                  ₹{product.oldPrice}
                </span>
              </p>

              <button className="mt-4 bg-pink-600 text-white px-4 py-2 rounded-lg">
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
