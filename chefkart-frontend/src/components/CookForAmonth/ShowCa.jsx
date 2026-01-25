import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarCheck, FaUserCheck, FaExchangeAlt, FaClock } from 'react-icons/fa';

const cardData = [
  {
    id: 1,
    title: "30 Days of Assured Service",
    description: "Free substitute cook or service extension in case of leaves.",
    icon: <FaCalendarCheck />,
  },
  {
    id: 2,
    title: "Trained & Verified Cooks",
    description: "Professionally trained & background verified cooks for quality service.",
    icon: <FaUserCheck />,
  },
  {
    id: 3,
    title: "Effortless Replacements",
    description: "One free, no-questions-asked cook replacement.",
    icon: <FaExchangeAlt />,
  },
  {
    id: 4,
    title: "Quick Service",
    description: "Find a skilled cook for your kitchen in as little as 24 hours.",
    icon: <FaClock />,
  },
];

// Animation Variants for Staggered Effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between each card appearing
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ShowCa = () => {
  return (
    <section className="body-font">
      <div className="container px-5 py-10 mx-auto">

        {/* Animated Grid Container */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {cardData.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              className="group relative bg-white border border-gray-100 rounded-2xl p-8 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon Container with Hover Effect */}
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-orange-50 text-orange-500 text-3xl flex-shrink-0 mb-6 sm:mb-0 sm:mr-6 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                {card.icon}
              </div>

              {/* Text Content */}
              <div className="flex-grow">
                <h2 className="text-gray-900 text-xl font-bold mb-3 group-hover:text-orange-600 transition-colors">
                  {card.title}
                </h2>
                <p className="leading-relaxed text-base text-gray-600">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default ShowCa;