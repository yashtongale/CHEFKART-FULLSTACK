import React from "react";
import { motion } from "framer-motion";
import { FaAward, FaCertificate } from "react-icons/fa";

const SkillIndiaSection = () => {
  return (
    <section className="bg-gradient-to-b from-white to-orange-50/30 py-20 border-t border-gray-100">
      <div className="container mx-auto px-5 text-center">

        {/* 1. Animated Badge Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner"
        >
          <FaAward className="text-4xl" />
        </motion.div>

        {/* 2. Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Proud Partner with <span className="text-orange-600">Skill India</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
            We are committed to quality and standardization. All our professionals are
            rigorously trained and certified by the Government of India under the
            <span className="font-bold text-gray-800"> Skill India Mission.</span>
          </p>
        </motion.div>

        {/* 3. Logos Container */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 mb-10">

          {/* Logo 1 (Skill India) */}
          <motion.div
            whileHover={{ scale: 1.05, filter: "grayscale(0%)" }}
            className="filter grayscale transition-all duration-300 cursor-pointer p-4 bg-white rounded-xl shadow-sm hover:shadow-md"
          >
            {/* Note: Ideally use transparent PNG logos here */}
            <img
              src="/generated-ingredients.png"
              alt="Skill India Logo"
              className="h-24 md:h-32 w-auto object-contain"
            />
          </motion.div>

          {/* Visual Divider (Hidden on mobile) */}
          <div className="hidden md:block text-gray-300 text-4xl font-light">
            +
          </div>

          {/* Logo 2 (THSC) */}
          <motion.div
            whileHover={{ scale: 1.05, filter: "grayscale(0%)" }}
            className="filter grayscale transition-all duration-300 cursor-pointer p-4 bg-white rounded-xl shadow-sm hover:shadow-md"
          >
            <img
              src="/generated-kitchen-team.png"
              alt="THSC Logo"
              className="h-24 md:h-32 w-auto object-contain"
            />
          </motion.div>
        </div>

        {/* 4. Bottom Certification Tag */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-6 py-2 rounded-full font-bold text-sm shadow-sm"
        >
          <FaCertificate /> 100% Certified Professionals
        </motion.div>

      </div>
    </section>
  );
};

export default SkillIndiaSection;