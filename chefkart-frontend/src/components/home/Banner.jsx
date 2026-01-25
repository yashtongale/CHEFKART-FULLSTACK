import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaUtensils, FaPepperHot } from "react-icons/fa";

const FoodBanner1 = () => {
  // Animation for the background blobs
  const blobAnimation = {
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.5, 0.3],
    transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
  };

  return (
    <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-[#fffbf2]">

      {/* 1. Animated Background Blobs */}
      <motion.div
        animate={blobAnimation}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-200/40 rounded-full blur-[100px]"
      ></motion.div>
      <motion.div
        animate={{ ...blobAnimation, transition: { duration: 10, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-yellow-200/40 rounded-full blur-[100px]"
      ></motion.div>

      {/* 2. Grid Pattern Overlay (Adds Texture) */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>

      {/* 3. Floating Icons (Decorative) */}
      <motion.div
        className="absolute top-20 right-[15%] text-orange-200 text-6xl hidden lg:block"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <FaPepperHot />
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-[15%] text-orange-200 text-5xl hidden lg:block"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <FaUtensils />
      </motion.div>


      {/* 4. Main Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Tagline Pill */}
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-orange-100 text-orange-600 font-bold text-sm tracking-widest uppercase border border-orange-200">
            Pune's Authentic Flavors
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
            Taste the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Soul</span> of <br className="hidden md:block" />
            Your City.
          </h1>

          <p className="text-lg md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            From spicy <span className="font-semibold text-gray-800">Misal</span> to sweet <span className="font-semibold text-gray-800">Mastani</span>,
            bring the finest culinary experiences directly to your kitchen.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button className="group bg-orange-600 text-white px-8 py-4 text-lg font-bold rounded-full shadow-xl shadow-orange-200 hover:bg-orange-700 transition-all transform hover:-translate-y-1 flex items-center gap-2">
            Book a Cook Now
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button className="px-8 py-4 bg-white text-gray-800 text-lg font-bold rounded-full border border-gray-200 hover:border-orange-500 hover:text-orange-600 transition-all shadow-sm hover:shadow-md">
            Explore Menu
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default FoodBanner1;