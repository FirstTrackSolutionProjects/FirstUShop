import React from "react";

// Reusable "Shop Now" Link
const ShopNowLink = () => (
  <a
    href="#"
    className="mt-4 inline-block text-red-900 dark:text-white font-semibold relative group text-sm"
  >
    <span>Shop Now</span>
    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-red-900 dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
  </a>
);

const NewArrival = () => {
  return (
   <div className="bg-gradient-to-r from-blue-100 to-indigo-200 text-gray-900 dark:text-white py-10 px-4 sm:px-8 font-sans">

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-4 h-8 bg-red-900 rounded-md"></div>
            <p className="text-red-900 font-semibold tracking-wide">Featured</p>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#A3B763]">
            New Arrival
          </h1>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Left — Highlight Card */}
          <div className="relative bg-white dark:bg-[#2a0a0a] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all p-8 min-h-[35rem] flex flex-col justify-end">
            <img
              src="/image/topwear.jpg"
              alt="Tshirt"
              className="absolute inset-0 w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 opacity-90"
              onError={(e) =>
                (e.target.src =
                  "https://placehold.co/800x800/FFFFFF/000000?text=Image+Error")
              }
            />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-red-900 drop-shadow-md">
                Men's Casual Wear
              </h2>
              <ShopNowLink />
            </div>
          </div>

          {/* Right section — Multiple Cards */}
          <div className="grid grid-cols-1 gap-10">

            {/* Women's Collection */}
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all p-8 h-[18rem] flex items-end">
              <img
                src="/image/s9.jpg"
                alt="Women"
                className="absolute inset-0 w-full h-full object-cover opacity-30"
                onError={(e) =>
                  (e.target.src =
                    "https://placehold.co/600x400/FFFFFF/000000?text=Image+Error")
                }
              />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold">Women's Fashion</h3>
                <ShopNowLink />
              </div>
            </div>

            {/* Bottom small cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

              {/* Coat Pant */}
              <div className="relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all p-8 h-[18rem] flex items-end text-center">
                <img
                  src="/image/s10.jpg"
                  alt="Coat Pant"
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                  onError={(e) =>
                    (e.target.src =
                      "https://placehold.co/400x400/FFFFFF/000000?text=Image+Error")
                  }
                />
                <div className="relative z-10 text-center w-full">
                  <h3 className="text-2xl font-bold mb-2">Men's Formal Wear</h3>
                  <ShopNowLink />
                </div>
              </div>

              {/* Perfume */}
              <div className="relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all p-8 h-[18rem] flex items-end text-center">
                <img
                  src="/image/s11.jpg"
                  alt="Perfume"
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                  onError={(e) =>
                    (e.target.src =
                      "https://placehold.co/400x400/FFFFFF/000000?text=Image+Error")
                  }
                />
                <div className="relative z-10 text-center w-full">
                  <h3 className="text-2xl font-bold mb-2">Fragrances</h3>
                  <ShopNowLink />
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default NewArrival;
