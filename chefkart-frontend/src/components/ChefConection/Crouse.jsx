import React, { useState, useEffect, useCallback } from "react";
import api from "../../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Carousel = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // For slide animation direction
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // 1. Fetch Data
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await api.get("/carousel/all");
        const data = res.data.data || res.data || [];
        const formattedSlides = data.map((item) => ({
          id: item._id || Math.random(),
          title: item.title || "",
          description: item.content || "",
          bgImage: item.image || "https://via.placeholder.com/1920x1080", // Fallback
          action: item.action || "Join ChefKart",
        }));
        setSlides(formattedSlides);
      } catch (error) {
        console.error("Failed to fetch carousel data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  // 2. Navigation Logic
  const paginate = useCallback((newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = slides.length - 1;
      if (nextIndex >= slides.length) nextIndex = 0;
      return nextIndex;
    });
  }, [slides.length]);

  // 3. Auto-Play (Pauses on Hover)
  useEffect(() => {
    if (isPaused || slides.length === 0) return;
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused, slides.length, paginate]);

  // --- Animation Variants ---
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      zIndex: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  // --- Render Loading Skeleton ---
  if (loading) return <div className="w-full h-[80vh] bg-gray-200 animate-pulse" />;

  // --- Render Empty State ---
  if (!slides.length) return null;

  return (
    <div
      className="relative w-full h-[80vh] overflow-hidden bg-black group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image */}
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentIndex].bgImage})` }}
          >
            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center p-6 md:p-20">

              {/* Text Content */}
              <div className="w-full md:w-2/3 lg:w-1/2 text-white">
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight"
                >
                  {slides[currentIndex].title}
                </motion.h2>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg"
                >
                  {slides[currentIndex].description}
                </motion.p>

                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-8 py-3 rounded-full shadow-lg transition-all transform hover:scale-105"
                >
                  {slides[currentIndex].action}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* --- Controls: Arrows (Visible on Hover) --- */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => paginate(-1)}
      >
        <FaChevronLeft size={24} />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => paginate(1)}
      >
        <FaChevronRight size={24} />
      </button>

      {/* --- Controls: Dots --- */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index
              ? "bg-orange-500 w-8"
              : "bg-white/50 hover:bg-white"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;