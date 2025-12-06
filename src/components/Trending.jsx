"use client";
import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";


const categories = [
  { name: "Ethnic Wear", img: "/image/ethnicwear.jpg", link: "/ethnic" },
  { name: "TopWear", img: "/image/topwear.jpg", link: "/top" },
  { name: "Bottom Wear", img: "/image/bottomwear.jpg", link: "/bottom" },
  { name: "Footwear", img: "/image/footwear.jpeg", link: "/foot" },
  { name: "Cosmetics", img: "/image/cosmetics.jpg", link: "/cosmetics" },
  { name: "Jewellery", img: "/image/jewellery.jpg", link: "/jewel" },
  { name: "Watches", img: "/image/watch.jpg", link: "/watch" },
  { name: "Accessories", img: "/image/accessories.jpeg", link: "/accessories" },
  { name: "Bags & Handbags", img: "/image/bags.jpeg", link: "/bags" },
  { name: "Kids Wear", img: "/image/kidswear.jpeg", link: "/kids-wear" },
  { name: "Home & Living", img: "/image/home.jpeg", link: "/home-living" },
];

const Trending = () => {
  return (
    <div className="w-full px-4 md:px-12 lg:px-24 py-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg md:text-xl font-semibold">
          Shop From{" "}
          <span className="text-red-600 cursor-pointer transition-colors">
            Top Categories
          </span>
        </h2>
      </div>

      {/* Smooth Swiper Slider */}
      <Swiper
        modules={[Autoplay, FreeMode]}
        freeMode={true}
        loop={true}
        grabCursor={true}
        autoplay={{
          delay: 1800,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: { slidesPerView: 3, spaceBetween: 14 },
          640: { slidesPerView: 4, spaceBetween: 18 },
          768: { slidesPerView: 5, spaceBetween: 22 },
          1024: { slidesPerView: 7, spaceBetween: 26 },
        }}
        className="w-full"
      >
        {categories.map((cat, idx) => (
          <SwiperSlide key={idx}>
            <Link
              to={cat.link}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="p-1 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 transition-all duration-300 group-hover:shadow-xl">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <p className="mt-2 text-sm sm:text-base font-medium text-gray-700 group-hover:text-red-600 transition-colors duration-300">
                {cat.name}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Trending;
