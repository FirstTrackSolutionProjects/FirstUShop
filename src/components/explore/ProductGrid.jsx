// import React from "react";
// import { products } from "../../data/products"; // ✅ named import
//  // Your product data

// const ProductGrid = ({ filters }) => {
//   // Filter products based on filters state
//   const filteredProducts = products.filter((product) => {
//     if (filters.category && product.category !== filters.category) return false;
//     if (filters.deal && !product.deal) return false;
//     if (filters.budget && product.price > filters.budget) return false;
//     if (filters.type && product.type !== filters.type) return false;
//     return true;
//   });

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
//       {filteredProducts.map((product) => (
//         <div key={product.id} className="border p-2 rounded">
//           <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
//           <h3 className="text-sm font-medium mt-2">{product.name}</h3>
//           <p className="text-sm text-gray-500">₹{product.price}</p>
//         </div>
//       ))}
//       {filteredProducts.length === 0 && <p className="col-span-full text-center text-gray-400">No products found.</p>}
//     </div>
//   );
// };

// export default ProductGrid;
