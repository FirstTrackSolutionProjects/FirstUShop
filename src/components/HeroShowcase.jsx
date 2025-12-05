// HeroShowcase.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTshirt } from "react-icons/fa";

const slides = [
  {
    series: "The Minimalist Collection",
    title: "Effortless Style",
    image: "/image/s2.jpg",
    alt: "A collection of colorful t-shirts",
  },
  {
    series: "The Urban Explorer",
    title: "Ready for the City",
    image: "/image/l5.jpg",
    alt: "A stylish brown leather jacket",
  },
  {
    series: "Denim Essentials",
    title: "Your Everyday Wear",
    image: "/image/s6.jpg",
    alt: "A pair of classic blue jeans",
  },
];

const HeroShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Auto-slide every 5s
  useEffect(() => {
    const interval = setInterval(() => paginate(1), 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = slides.length - 1;
      if (next >= slides.length) next = 0;
      return next;
    });
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className="font-sans flex items-center justify-center min-h-screen w-full bg-neutral-50 p-4 sm:p-8 overflow-hidden">
      <div className="relative w-full h-full flex flex-col-reverse md:flex-row rounded-3xl overflow-hidden shadow-2xl bg-white">

        {/* Text Section */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center text-center md:text-left">
          <div className="transition-all duration-700">
            <div className="flex items-center justify-center md:justify-start mb-4 text-red-700">
              <FaTshirt className="w-6 h-6 md:w-8 md:h-8 mr-2" />
              <p className="text-sm sm:text-base font-medium tracking-widest uppercase">{slides[currentIndex].series}</p>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              {slides[currentIndex].title}
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto md:mx-0 text-base sm:text-lg mb-8">
              Discover our curated collection of essential pieces, designed to elevate your everyday style with simplicity and grace.
            </p>
            <button className="px-8 py-3 text-sm sm:text-base font-semibold text-white bg-red-700 hover:bg-red-800 transition-colors duration-300 rounded-full shadow-lg hover:shadow-xl">
              Shop Now
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative w-full md:w-1/2 h-full overflow-hidden">
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
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.x < -50 || velocity.x < -500) paginate(1);
                else if (offset.x > 50 || velocity.x > 500) paginate(-1);
              }}
              className="w-full h-full object-cover object-center cursor-grab select-none"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1000x1200/FFFFFF/000000?text=Clothing'; }}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default HeroShowcase;
