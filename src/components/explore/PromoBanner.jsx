import React, { useRef, useState, useEffect } from "react";

// ---- SLIDES DATA ----
const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    title: "🔥 Mega Big Sale!",
    subtitle: "Up to 70% OFF on Best Categories",
    tag: "Limited Time Only ⏳",
  },
  {
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
    title: "✨ New Winter Collection",
    subtitle: "Trendy Jackets • Hoodies • Sweatshirts",
    tag: "Shop the Latest →",
  },
  {
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80",
    title: "🎁 Festival Special Offers",
    subtitle: "Buy 1 Get 1 • Combo Deals • Flash Sale",
    tag: "Today Only ⚡",
  },
];

const PromoBanner = () => {
  const sliderRef = useRef(null);
  const [index, setIndex] = useState(0);

  // Auto slide every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Scroll when index changes
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
      {/* Slider Container */}
      <div
        ref={sliderRef}
        className="w-full h-52 md:h-64 lg:h-72 flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="min-w-full h-full snap-start relative flex-shrink-0"
          >
            <img
              src={slide.image}
              alt="banner"
              className="w-full h-full object-cover"
            />

            {/* TEXT OVERLAY */}
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-center px-4 md:px-6 lg:px-8 text-white">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-sm md:text-base mt-1 opacity-95">{slide.subtitle}</p>

              <p className="text-xs md:text-sm mt-2 bg-white/20 w-max px-2 py-1 rounded-full backdrop-blur-sm">
                {slide.tag}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* HIDE SCROLLBAR */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default PromoBanner;
