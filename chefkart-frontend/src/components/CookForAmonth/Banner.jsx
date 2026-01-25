import React from "react";
import { motion } from "framer-motion";
import { FaCarrot, FaPepperHot, FaLeaf, FaUtensils } from "react-icons/fa";

const FoodBanner = () => {
  // Animation for the floating icons
  const floatAnimation = {
    y: [0, -15, 0], // Move up 15px and back down
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section className="relative h-[400px] w-full overflow-hidden flex items-center justify-center bg-gray-900">

      {/* 1. Background Image with subtle zoom effect */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/food-plating.png')" }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }} // Subtle breathing effect
      />

      {/* 2. Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* 3. Main Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <motion.h2
          className="text-xl md:text-3xl font-medium text-gray-200 tracking-wide mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What's better than your favourite food?
        </motion.h2>

        <motion.p
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-orange-500 leading-tight drop-shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Getting it cooked in <br className="hidden md:block" />
          <span className="text-white">your kitchen.</span>
        </motion.p>
      </div>

      {/* 4. Floating Icons (The "Modern" Touch) */}
      <div className="absolute inset-0 z-10 pointer-events-none">

        {/* Top Left - Carrot */}
        <motion.div
          className="absolute top-10 left-10 text-orange-500/30 text-6xl"
          animate={floatAnimation}
        >
          <FaCarrot />
        </motion.div>

        {/* Bottom Right - Pepper */}
        <motion.div
          className="absolute bottom-10 right-10 text-red-500/30 text-7xl"
          animate={{ ...floatAnimation, transition: { ...floatAnimation.transition, delay: 1 } }}
        >
          <FaPepperHot />
        </motion.div>

        {/* Top Right - Leaf */}
        <motion.div
          className="absolute top-16 right-20 text-green-500/30 text-5xl hidden md:block"
          animate={{ ...floatAnimation, transition: { ...floatAnimation.transition, delay: 0.5 } }}
        >
          <FaLeaf />
        </motion.div>

        {/* Bottom Left - Utensils */}
        <motion.div
          className="absolute bottom-16 left-24 text-white/20 text-8xl hidden md:block"
          animate={{ ...floatAnimation, transition: { ...floatAnimation.transition, delay: 1.5 } }}
        >
          <FaUtensils />
        </motion.div>

      </div>

    </section>
  );
};

export default FoodBanner;