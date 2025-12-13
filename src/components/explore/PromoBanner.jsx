import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";   // ✅ ADD THIS

// ---- SLIDES DATA ----
const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    title: "🔥 Mega Big Sale!",
    subtitle: "Up to 70% OFF on Best Categories",
    tag: "Limited Time Only ⏳",
    type: "mega-sale", // ✅ ADD TYPE
  },
  {
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
    title: "✨ New Winter Collection",
    subtitle: "Trendy Jackets • Hoodies • Sweatshirts",
    tag: "Shop the Latest →",
    type: "winter", // ✅ ADD TYPE
  },
  {
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80",
    title: "🎁 Festival Special Offers",
    subtitle: "Buy 1 Get 1 • Combo Deals • Flash Sale",
    tag: "Today Only ⚡",
    type: "festival", // ✅ ADD TYPE
  },
];

const PromoBanner = () => {
  const sliderRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: sliderRef.current.clientWidth * index,
        behavior: "smooth",
      });
    }
  }, [index]);

  return (
    <div className="w-full rounded-3xl overflow-hidden shadow-lg mb-6">
      <div
        ref={sliderRef}
        className="w-full h-52 md:h-64 lg:h-72 flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
      >
        {slides.map((slide, i) => (
          <Link
            key={i}
            to={`/promo?type=${slide.type}`}  // ✅ CLICKABLE SLIDE
            className="min-w-full h-full snap-start relative flex-shrink-0"
          >
            <img src={slide.image} alt="banner" className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-black/30 flex flex-col justify-center px-4 md:px-6 lg:px-8 text-white">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-sm md:text-base mt-1 opacity-95">{slide.subtitle}</p>
              <p className="text-xs md:text-sm mt-2 bg-white/20 w-max px-2 py-1 rounded-full backdrop-blur-sm">
                {slide.tag}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default PromoBanner;
