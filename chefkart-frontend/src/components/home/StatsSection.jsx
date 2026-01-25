import React from "react";
import { motion } from "framer-motion";
import { FaUtensils, FaUserCheck, FaSmile } from "react-icons/fa";

const StatsSection = () => {
  const stats = [
    {
      id: 1,
      value: "3M+",
      label: "Meals Cooked",
      icon: <FaUtensils className="text-4xl text-orange-400 mb-4" />
    },
    {
      id: 2,
      value: "4500+",
      label: "Verified Cooks",
      icon: <FaUserCheck className="text-4xl text-orange-400 mb-4" />
    },
    {
      id: 3,
      value: "10K+",
      label: "Happy Households",
      icon: <FaSmile className="text-4xl text-orange-400 mb-4" />
    },
  ];

  return (
    <section className="bg-orange-50/50 py-20 border-y border-orange-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-orange-200">

          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-8 group cursor-default"
            >
              {/* Icon with Bounce Effect on Hover */}
              <motion.div
                whileHover={{ y: -5 }}
                className="p-4 bg-white rounded-full shadow-sm mb-4 group-hover:shadow-md transition-all"
              >
                {stat.icon}
              </motion.div>

              {/* Number */}
              <motion.div
                className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-2 tracking-tight"
              >
                {stat.value}
              </motion.div>

              {/* Label */}
              <p className="text-gray-500 text-lg font-medium uppercase tracking-widest group-hover:text-orange-600 transition-colors">
                {stat.label}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default StatsSection;