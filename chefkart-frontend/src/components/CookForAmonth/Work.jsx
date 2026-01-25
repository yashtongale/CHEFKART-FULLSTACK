import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaMobileAlt, FaUtensils, FaCreditCard, FaUserCheck } from "react-icons/fa";

const Work = () => {
  const steps = [
    {
      id: 1,
      title: "Register on App",
      description: "Download the ChefKart App and create your profile in seconds.",
      icon: <FaMobileAlt />,
    },
    {
      id: 2,
      title: "Select Service",
      description: "Choose 'Chefit' or 'Cook for a Month' from our services.",
      icon: <FaUtensils />,
    },
    {
      id: 3,
      title: "Customize & Pay",
      description: "Share your food preferences and complete the secure payment.",
      icon: <FaCreditCard />,
    },
    {
      id: 4,
      title: "Get a Cook",
      description: "A trained & trusted cook arrives at your doorstep within 60 mins.",
      icon: <FaUserCheck />,
      hasButton: true,
    },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="bg-white py-20 overflow-hidden">
      <div className="container mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            How it <span className="text-orange-500">Works</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Your journey to delicious home-cooked meals in 4 simple steps.
          </p>
          <div className="h-1 w-20 bg-orange-500 rounded mx-auto mt-6"></div>
        </div>

        {/* Steps Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="relative flex flex-col items-center text-center z-10"
              variants={itemVariants}
            >
              {/* Connector Line (Desktop Only) - Connecting to the next item */}
              {index !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-1/2 w-full h-1 border-t-2 border-dashed border-orange-200 -z-10 transform translate-x-1/2"></div>
              )}

              {/* Icon Bubble */}
              <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center text-4xl text-orange-500 mb-6 shadow-sm border border-orange-100 transition-transform duration-300 hover:scale-110 hover:bg-orange-500 hover:text-white group">
                {step.icon}
              </div>

              {/* Text Content */}
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed px-2 mb-6">
                {step.description}
              </p>

              {/* Optional Arrow for Mobile/Tablet flow */}
              {index !== steps.length - 1 && (
                <FaArrowRight className="lg:hidden text-orange-200 text-2xl mb-6 transform rotate-90 md:rotate-0" />
              )}

              {/* CTA Button (Specific to Step 4) */}
              {step.hasButton && (
                <button className="bg-white text-orange-600 border-2 border-orange-500 px-6 py-2 rounded-full font-bold hover:bg-orange-500 hover:text-white transition-colors duration-300 text-sm shadow-md">
                  Book Now
                </button>
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Work;