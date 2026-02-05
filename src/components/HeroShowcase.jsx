import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTshirt } from "react-icons/fa";

const defaultSlides = [
  {
    series: "The Minimalist Collection",
    title: "Effortless Style",
    image: "/image/slide1.jpg",
    alt: "A collection of colorful t-shirts",
  },
  {
    series: "Denim Essentials",
    title: "Your Everyday Wear",
    image: "/image/slide2.jpg",
    alt: "A pair of classic blue jeans",
  },
  {
    series: "Casual Comfort",
    title: "Relaxed Fits",
    image: "/image/slide3.jpeg",
    alt: "A person wearing a comfortable hoodie",
  },
];

const HeroShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [slides, setSlides] = useState(() => {
    try {
      const raw = localStorage.getItem("heroItems");
      if (!raw) return defaultSlides;
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) && parsed.length ? parsed : defaultSlides;
    } catch (e) {
      return defaultSlides;
    }
  });

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => paginate(1), 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  // listen for other tabs or admin updates
  useEffect(() => {
    const handler = (e) => {
      if (e?.key === "heroItems") {
        try {
          const parsed = JSON.parse(e.newValue || "[]");
          if (Array.isArray(parsed) && parsed.length) setSlides(parsed);
          else setSlides(defaultSlides);
        } catch (err) {
          setSlides(defaultSlides);
        }
      }
    };

    const customHandler = () => {
      try {
        const raw = localStorage.getItem("heroItems");
        const parsed = JSON.parse(raw || "[]");
        setSlides(Array.isArray(parsed) && parsed.length ? parsed : defaultSlides);
      } catch (err) {
        setSlides(defaultSlides);
      }
    };

    window.addEventListener("storage", handler);
    window.addEventListener("heroItemsChanged", customHandler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("heroItemsChanged", customHandler);
    };
  }, []);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = slides.length - 1;
      if (next >= slides.length) next = 0;
      return next;
    });
  };

  // ensure currentIndex is valid when slides change
  useEffect(() => {
    if (!slides || slides.length === 0) return;
    if (currentIndex >= slides.length) setCurrentIndex(0);
  }, [slides, currentIndex]);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 120 : -120,
      opacity: 0,
      scale: 0.98,
    }),
  };

  return (
    <div className="font-sans flex items-center justify-center w-full min-h-[85vh] bg-neutral-50 p-4 sm:p-8 overflow-hidden">
      <div className="relative w-full max-w-[1300px] min-h-[65vh] md:min-h-[75vh] flex flex-col-reverse md:flex-row rounded-3xl overflow-hidden shadow-xl bg-white">

        {/* ---------- TEXT SECTION ---------- */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 lg:p-16 flex flex-col justify-center text-center md:text-left">
          <div className="transition-all duration-700">
            <div className="flex items-center justify-center md:justify-start mb-4 text-red-700">
              <FaTshirt className="w-6 h-6 md:w-8 md:h-8 mr-2" />
              <p className="text-sm sm:text-base font-medium tracking-widest uppercase">
                {slides[currentIndex].series}
              </p>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-5 leading-tight">
              {slides[currentIndex].title}
            </h1>

            <p className="text-gray-600 max-w-lg mx-auto md:mx-0 text-base sm:text-lg mb-8">
              Discover our curated collection of essential pieces, designed to elevate your everyday style with effortless comfort.
            </p>

            <button className="px-10 py-3 text-sm sm:text-base font-semibold text-white bg-red-700 hover:bg-red-800 transition duration-300 rounded-full shadow-lg hover:shadow-xl">
              Shop Now
            </button>
          </div>
        </div>

        {/* ---------- IMAGE SECTION ---------- */}
        <div className="relative w-full md:w-1/2 h-[45vh] md:h-auto overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={slides[currentIndex].image}
              src={slides[currentIndex].image}
              alt={slides[currentIndex].alt}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 180, damping: 22 },
                opacity: { duration: 0.4 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.x < -80 || velocity.x < -500) paginate(1);
                else if (offset.x > 80 || velocity.x > 500) paginate(-1);
              }}
              className="w-full h-full object-cover object-center cursor-grab select-none rounded-none"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/1000x1200/FFFFFF/000000?text=Clothing";
              }}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default HeroShowcase;
