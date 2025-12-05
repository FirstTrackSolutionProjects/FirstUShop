"use client";
import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Link } from "react-router-dom";

const categories = [
    { name: "Ethnic Wear", img: "/image/l11.jpg", link: "/ethnic" },
    { name: "TopWear", img: "/image/l7.jpg", link: "/top" },
    { name: "Bottom Wear", img: "/image/l12.jpg", link: "/bottom" },
    { name: "Footwear", img: "/image/footwear.jpeg", link: "/foot" },
    { name: "Cosmetics", img: "/image/l2.jpg", link: "/cosmetics" },
    { name: "Jewellery", img: "/image/l8.jpg", link: "/jewel" },
    { name: "Watches", img: "/image/l5.jpg", link: "/watch" },
    { name: "Accessories", img: "/image/accessories.jpeg", link: "/accessories" },
    { name: "Bags & Handbags", img: "/image/bags.jpeg", link: "/bags" },
    { name: "Kids Wear", img: "/image/kidswear.jpeg", link: "/kids-wear" },
    { name: "Home & Living", img: "/image/home.jpeg", link: "/home-living" }
    ];

// Autoplay plugin
    function Autoplay(slider) {
    let timeout;
    let mouseOver = false;

    const clearNextTimeout = () => clearTimeout(timeout);
    const nextTimeout = () => {
    clearTimeout(timeout);
    if (mouseOver) return;
    timeout = setTimeout(() => slider.next(), 2500);
    };

    slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => {
    mouseOver = true;
    clearNextTimeout();
    });
    slider.container.addEventListener("mouseout", () => {
    mouseOver = false;
    nextTimeout();
    });
    nextTimeout();
    });
    slider.on("dragStarted", clearNextTimeout);
    slider.on("animationEnded", nextTimeout);
    slider.on("updated", nextTimeout);
    }

    const Trending = () => {
    const [sliderRef] = useKeenSlider(
    {
    loop: true,
    mode: "free-snap",
    slides: { perView: 3, spacing: 16 },
    breakpoints: {
    "(min-width: 640px)": { slides: { perView: 4, spacing: 20 } },
    "(min-width: 768px)": { slides: { perView: 5, spacing: 24 } },
    "(min-width: 1024px)": { slides: { perView: 7, spacing: 28 } },
    },
    },
    [Autoplay]
    );

return ( 
    <div className="w-full px-4 md:px-12 lg:px-24 py-6">
        {/* Header */} 
      <div className="flex justify-between items-center mb-6"> <h2 className="text-lg md:text-xl font-semibold">
      Shop From{" "} <span className="text-red-600 cursor-pointer">Top Categories</span> </h2> </div>
        
        {/* Slider */}
      <div ref={sliderRef} className="keen-slider">
        {categories.map((cat, idx) => (
          <Link
            key={idx}
            to={cat.link}
            className="keen-slider__slide flex flex-col items-center text-center cursor-pointer group"
          >
            <div className="p-1 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 group-hover:shadow-xl transition-all duration-300">
              <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center rounded-full bg-gray-100 overflow-hidden transform transition-transform duration-300 group-hover:scale-105">
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
        ))}
      </div>
    </div>
  );
};

export default Trending;
