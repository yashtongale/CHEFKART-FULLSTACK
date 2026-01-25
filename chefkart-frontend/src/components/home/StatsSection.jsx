import React from "react";
import { motion } from "framer-motion";

const StatsSections = () => {
  const stats = [
    { value: "3M+", label: "Meals Cooked" },
    { value: "4500+", label: "Verified Cooks" },
    { value: "10K+", label: "Happy Households" },
  ];

  return (
    <section className="bg-white py-16 font-outfit border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-12 md:gap-24">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, color: "#FF6B00" }}
                className="text-5xl md:text-6xl font-extrabold text-secondary mb-2 transition-colors"
              >
                {stat.value}
              </motion.div>
              <p className="text-gray-500 text-lg md:text-xl font-medium uppercase tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSections;
