import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaUtensils } from "react-icons/fa";

const FloatingBanner = () => {
  const [isVisible, setIsVisible] = useState(false); // Start hidden
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // logic:
      // 1. Show if scrolling UP
      // 2. Hide if scrolling DOWN
      // 3. Always hide if near the very top (so it doesn't cover the Hero section)

      if (currentScrollY < 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
        >
          {/* The Card Container 
            pointer-events-auto: Re-enables clicking (parent is none to let clicks pass through sides)
          */}
          <div className="pointer-events-auto bg-white/90 backdrop-blur-md border border-orange-100 shadow-2xl rounded-2xl p-4 md:px-8 md:py-4 flex flex-col md:flex-row items-center gap-4 md:gap-8 max-w-3xl w-full">

            {/* Text Content */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-gray-900 font-bold text-lg flex items-center justify-center md:justify-start gap-2">
                <FaUtensils className="text-orange-500" />
                Get a cook & comfort instantly.
              </p>
              <p className="text-sm text-gray-500 hidden md:block">
                Enjoy a risk-free trial without asking why!
              </p>
            </div>

            {/* CTA Button */}
            <button className="group bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-orange-200 flex items-center gap-2 w-full md:w-auto justify-center">
              Book Now
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingBanner;