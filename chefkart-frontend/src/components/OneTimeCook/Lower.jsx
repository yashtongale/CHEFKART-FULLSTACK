import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaUtensils } from "react-icons/fa";

const Lower5 = () => {
  return (
    <section className="bg-orange-50/50 py-20 border-y border-orange-100 font-sans">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

          {/* Left Side: Headline */}
          <motion.div
            className="w-full md:w-5/12 text-center md:text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest mb-4">
              <FaUtensils /> Smart Choice
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Why order online <br />
              when you can <span className="text-orange-600">Chefit?</span>
            </h2>
          </motion.div>

          {/* Divider (Desktop Only) */}
          <div className="hidden md:block w-px h-32 bg-orange-200"></div>

          {/* Right Side: Description & CTA */}
          <motion.div
            className="w-full md:w-7/12"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-xl text-gray-600 leading-relaxed mb-8 text-center md:text-left">
              Enjoy your favorite comfort food cooked fresh in your kitchen,
              without burning your wallet. Get a professional cook for a
              one-time meal at an affordable price.
            </p>

            <div className="flex justify-center md:justify-start">
              <button className="flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-orange-600 transition-all transform hover:-translate-y-1">
                Book a Cook <FaArrowRight />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Lower5;