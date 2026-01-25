import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

const Lower2 = () => {
  const benefits = ["100% Hygienic", "Fresh Ingredients", "Timely Service"];

  return (
    <section className="bg-[#f8f9fa] overflow-hidden">
      <div className="container mx-auto px-5 py-20 md:py-24">

        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">

          {/* --- Left Side: Text Content --- */}
          <motion.div
            className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Homemade food that <br className="hidden lg:block" />
              <span className="text-orange-500">warms the soul.</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
              Never worry about skipping meals or eating oily outside food again.
              Get wholesome, home-cooked meals prepared right in your kitchen.
            </p>

            {/* Benefit Checkmarks */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-8">
              {benefits.map((benefit, index) => (
                <span key={index} className="flex items-center text-sm font-semibold text-gray-700 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  {benefit}
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <button className="group bg-orange-500 hover:bg-gray-900 text-white text-lg font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2">
              Book Now
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* --- Right Side: Image with Decorative Blob --- */}
          <motion.div
            className="w-full md:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Abstract Blob Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-100 rounded-full blur-3xl -z-10 opacity-60"></div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                className="object-cover object-center w-full h-full"
                alt="Plating homemade food"
                src="/food-plating.png"
                loading="lazy"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Lower2;