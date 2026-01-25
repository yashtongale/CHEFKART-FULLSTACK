import React, { useEffect, useState, useRef } from "react";
import { FaArrowRight, FaUtensils } from "react-icons/fa";

const FloatingBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Logic: Show if scrolling UP or if near the top (less than 100px)
      // Hide if scrolling DOWN and past 100px
      if (currentScrollY < lastScrollY.current || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ease-in-out ${isVisible ? "translate-y-0" : "translate-y-full"
        }`}
    >
      {/* Main Container with Glassmorphism */}
      <div className="bg-white/90 backdrop-blur-md border-t border-gray-200 shadow-[0_-5px_30px_rgba(0,0,0,0.1)] py-4">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* Text Section */}
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="hidden sm:flex w-10 h-10 bg-orange-100 rounded-full items-center justify-center text-orange-600">
                <FaUtensils />
              </div>
              <div>
                <p className="text-gray-900 font-bold text-lg leading-tight">
                  Hungry for instant delights? 😋
                </p>
                <p className="text-gray-500 text-sm hidden sm:block">
                  Book a verified cook now and get a home-cooked meal in 60 mins!
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 transition-all flex items-center justify-center gap-2">
              Book Your Cook <FaArrowRight />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingBanner;