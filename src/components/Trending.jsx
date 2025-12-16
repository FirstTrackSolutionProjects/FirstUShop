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
    <section className="w-full px-3 sm:px-6 lg:px-20 py-6">

      {/* Header */}
      <div className="mb-5">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold">
          Shop From{" "}
          <span className="text-red-600">Top Categories</span>
        </h2>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Autoplay, FreeMode]}
        freeMode
        loop
        grabCursor
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 3.2,
            spaceBetween: 12,
          },
          480: {
            slidesPerView: 4,
            spaceBetween: 14,
          },
          640: {
            slidesPerView: 5,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 6,
            spaceBetween: 18,
          },
          1024: {
            slidesPerView: 8,
            spaceBetween: 22,
          },
        }}
      >
        {categories.map((cat, idx) => (
          <SwiperSlide key={idx}>
            <Link
              to={cat.link}
              className="flex flex-col items-center text-center select-none"
            >
              {/* Gradient Ring */}
              <div className="p-[2px] rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">
                <div className="
                  w-20 h-20
                  sm:w-24 sm:h-24
                  md:w-28 md:h-28
                  rounded-full bg-white overflow-hidden
                  flex items-center justify-center
                ">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Text */}
              <p className="
                mt-2
                text-[11px]
                sm:text-sm
                md:text-base
                font-medium
                text-gray-700
                leading-tight
                text-center
              ">
                {cat.name}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Trending;
