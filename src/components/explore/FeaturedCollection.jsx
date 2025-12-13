// import React from "react";

// const collections = [
//   { id: 1, name: "Summer Vibes", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500&q=80", tag: "Trending" },
//   { id: 2, name: "Work From Home", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80", tag: "New" },
//   { id: 3, name: "Fitness Essentials", image: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0642?auto=format&fit=crop&w=500&q=80", tag: "Popular" },
//   { id: 4, name: "Travel Gear", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80", tag: "Hot" },
// ];

// const FeaturedCollections = () => {
//   return (
//     <div className="mb-8 px-2 md:px-0">
//       <h3 className="text-2xl md:text-3xl font-bold mb-4">🌟 Featured Collections</h3>

//       {/* MOBILE → horizontal scroll | LAPTOP → grid */}
//       <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-2 scroll-smooth">
//         {collections.map((collection) => (
//           <div
//             key={collection.id}
//             className="min-w-[200px] md:min-w-0 bg-white rounded-2xl shadow-md cursor-pointer overflow-hidden flex-shrink-0 group transition transform hover:scale-105 hover:shadow-xl"
//           >
//             <div className="relative h-40 md:h-48 w-full overflow-hidden">
//               <img
//                 src={collection.image}
//                 alt={collection.name}
//                 className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//               />

//               {/* Gradient overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

//               {/* Top-left tag */}
//               <span className="absolute top-3 left-3 text-xs md:text-sm bg-indigo-600 text-white px-2 md:px-3 py-1 rounded-full shadow">
//                 {collection.tag}
//               </span>
//             </div>

//             <div className="p-3 md:p-4">
//               <h4 className="text-sm md:text-base font-semibold text-gray-800">{collection.name}</h4>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Hide scrollbar */}
//       <style>
//         {`
//           .scroll-smooth::-webkit-scrollbar { display: none; }
//           .scroll-smooth { -ms-overflow-style: none; scrollbar-width: none; }
//         `}
//       </style>
//     </div>
//   );
// };

// export default FeaturedCollections;
