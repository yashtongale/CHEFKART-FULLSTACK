import React from "react";
import { motion } from "framer-motion";
import { FaWallet, FaTimesCircle, FaCheckCircle } from "react-icons/fa";

const Lower2 = () => {
  return (
    <section className="bg-gray-900 py-24 relative overflow-hidden font-sans">

      {/* Background Decor: Orange Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

          {/* --- Left Side: The Problem (Ordering Online) --- */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
              Why order online <br />
              <span className="text-gray-500 line-through decoration-orange-500 decoration-4">when you can...</span>
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-400">
                <FaTimesCircle className="text-red-500 text-xl" />
                <span className="text-lg">Expensive delivery fees</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <FaTimesCircle className="text-red-500 text-xl" />
                <span className="text-lg">Unhealthy oils & preservatives</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <FaTimesCircle className="text-red-500 text-xl" />
                <span className="text-lg">Cold food on arrival</span>
              </div>
            </div>
          </motion.div>

          {/* --- Right Side: The Solution (Chefit) --- */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 md:p-10 rounded-3xl shadow-2xl relative">

              {/* Floating Icon */}
              <div className="absolute -top-8 -right-8 w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg transform rotate-12 hidden md:flex">
                <FaWallet />
              </div>

              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                Just <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Chefit!</span>
              </h2>

              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Enjoy your favorite comfort food cooked fresh in your kitchen without burning your wallets.
                <span className="text-white font-bold block mt-2">Affordable. Fresh. Hot.</span>
              </p>

              <button className="w-full bg-white text-gray-900 font-bold py-4 rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-lg">
                Check Prices in Your Area
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Lower2;