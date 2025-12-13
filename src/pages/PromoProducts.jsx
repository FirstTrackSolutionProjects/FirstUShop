// import React from "react";
// import { useLocation } from "react-router-dom";
// import { products } from "../data/products";

// const PromoProducts = () => {
//   const { search } = useLocation();
//   const query = new URLSearchParams(search);
//   const type = query.get("type");

//   // Filter products based on promoTag
//   const filteredProducts = products.filter(
//     (item) => item.promoTag === type
//   );

//   return (
//     <div className="px-4 py-6">
//       <h1 className="text-2xl font-bold mb-4">
//         🔥 {type.replace("-", " ").toUpperCase()} – Best Discounts
//       </h1>

//       {filteredProducts.length === 0 ? (
//         <p className="text-gray-500">No products found for this offer.</p>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {filteredProducts.map((item) => (
//             <div
//               key={item.id}
//               className="bg-white rounded-xl shadow p-3 cursor-pointer"
//             >
//               <img
//                 src={item.image}
//                 className="h-40 w-full object-cover rounded-lg"
//               />
//               <h3 className="mt-2 font-semibold">{item.name}</h3>
//               <p className="text-indigo-600 font-bold">₹{item.price}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PromoProducts;

import React from "react";
import { useLocation } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard"; // <-- ADD THIS

const PromoProducts = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const type = query.get("type");

  // Filter products by promoTag
  const filteredProducts = products.filter(
    (item) => item.promoTag === type
  );

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">
        🔥 {type.replace("-", " ").toUpperCase()} – Best Discounts
      </h1>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-500">No products found for this offer.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((item) => (
            <ProductCard key={item.id} item={item} />   // <-- UPDATED CARD
          ))}
        </div>
      )}
    </div>
  );
};

export default PromoProducts;
