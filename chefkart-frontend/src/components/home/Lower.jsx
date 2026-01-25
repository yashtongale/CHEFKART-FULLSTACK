import React from "react";
import { motion } from "framer-motion";
import { FaUserPlus, FaArrowRight } from "react-icons/fa";

const Lower = () => {
  return (
    <section className="bg-orange-50 border-t border-orange-100 py-16 md:py-20 relative overflow-hidden">

      {/* Decorative Background Icon */}
      <FaUserPlus className="absolute -right-10 -bottom-10 text-9xl text-orange-100 opacity-50 transform rotate-12" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">

          {/* --- Heading Section --- */}
          <motion.div
            className="md:w-3/5 text-center md:text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              ChefKart के <br className="hidden md:block" />
              <span className="text-orange-500 relative inline-block">
                4500 से भी ज़्यादा
                {/* Hand-drawn SVG Underline */}
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-orange-300 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>
              {" "}कुक्स का हिस्सा बनें।
            </h2>
          </motion.div>

          {/* --- CTA Button Section --- */}
          <motion.div
            className="md:w-2/5 flex justify-center md:justify-end"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button className="group relative inline-flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-700 text-white text-xl md:text-2xl font-bold py-4 px-10 rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-1">
              Join ChefKart
              <FaArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Lower;