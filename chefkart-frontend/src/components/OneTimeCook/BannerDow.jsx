import React from 'react';
import { motion } from 'framer-motion';
import ShowCard2 from './ShowCard'; // Keeping your original import

const BannerDow2 = () => {
  return (
    <section className="bg-orange-50 py-20 font-sans relative overflow-hidden">

      {/* Decorative Background Pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">

        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-16">

          {/* Left: Heading */}
          <motion.div
            className="w-full md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 text-xs font-bold tracking-widest uppercase mb-4">
              Why Choose Us?
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Chefit: <span className="text-orange-600">One-Time Cook</span>
            </h1>
          </motion.div>

          {/* Right: Description */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="md:pl-10 border-l-4 border-orange-500">
              <p className="text-xl md:text-2xl font-medium text-gray-700 leading-relaxed">
                Get a certified cook for a single visit to prepare delicious, hygienic food in the comfort of your kitchen.
              </p>
            </div>
          </motion.div>
        </div>

        {/* --- Cards Section --- */}
        {/* We wrap the child component in a motion div to animate it in */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <ShowCard2 />
        </motion.div>

      </div>
    </section>
  );
};

export default BannerDow2;