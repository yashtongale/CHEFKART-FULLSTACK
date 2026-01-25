import React from "react";
import { motion } from "framer-motion";
import { FaUserCheck } from "react-icons/fa";

const Lower1 = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-5 max-w-7xl">

        {/* Main Card Container with Rounded Corners & Shadow */}
        <div className="flex flex-col lg:flex-row overflow-hidden rounded-3xl shadow-2xl">

          {/* --- Image Section --- */}
          <motion.div
            className="lg:w-1/2 h-72 lg:h-auto relative min-h-[300px]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              alt="Delicious Food - Misal Pav"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              src="/pune-misal_pav.png"
              loading="lazy"
            />
            {/* Subtle Gradient Overlay for blending */}
            <div className="absolute inset-0 bg-black/10"></div>
          </motion.div>

          {/* --- Text Section --- */}
          <motion.div
            className="lg:w-1/2 bg-[#214e34] flex flex-col justify-center p-10 lg:p-16 text-center lg:text-left relative overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative Background Icon (Watermark) */}
            <FaUserCheck className="absolute -right-6 -bottom-6 text-9xl text-white opacity-5 transform rotate-12" />

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Discover your ideal cook from a team of <br className="hidden xl:block" />
                <span className="text-orange-400">over 4500 experts.</span>
              </h3>

              <p className="text-green-100 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
                Verified professionals ready to prepare hygienic, home-style meals in your kitchen.
              </p>

              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1">
                Explore Cooks
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Lower1;