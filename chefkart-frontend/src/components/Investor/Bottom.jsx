import React from "react";
import { motion } from "framer-motion";
import { FaRocket, FaStar } from "react-icons/fa";

const AnnouncementBanner = () => {
  return (
    <section className="relative bg-gradient-to-r from-orange-500 to-red-600 py-16 overflow-hidden">

      {/* Decorative Background Pattern (White Dots) */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#fff 2px, transparent 2px)", backgroundSize: "30px 30px" }}></div>

      {/* Floating Stars (Decorative) */}
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-10 left-[10%] text-white text-xl opacity-30"
      >
        <FaStar />
      </motion.div>
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        className="absolute bottom-10 right-[10%] text-white text-2xl opacity-30"
      >
        <FaStar />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 text-center">

        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 text-white text-4xl shadow-lg border border-white/30 cursor-pointer"
        >
          <FaRocket />
        </motion.div>

        {/* Text Content */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight"
        >
          This is just the <span className="text-yellow-300">beginning</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-orange-100 text-lg md:text-xl mt-4 font-medium max-w-2xl mx-auto"
        >
          With many more milestones & funding rounds yet to come, we are building the future of home cooking together.
        </motion.p>

      </div>
    </section>
  );
};

export default AnnouncementBanner;