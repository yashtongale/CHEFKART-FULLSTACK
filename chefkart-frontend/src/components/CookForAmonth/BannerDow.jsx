import React from 'react';
import { motion } from 'framer-motion';
import ShowCa from './ShowCa';

const BannerDow = () => {
  return (
    <section className="bg-orange-50/50 relative overflow-hidden">

      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -translate-y-1/2 translate-x-1/2"></div>

      <div className="container px-5 py-20 mx-auto relative z-10">

        {/* --- Header Section --- */}
        <div className="flex flex-wrap items-center mb-16">

          {/* Left Side: Headings */}
          <motion.div
            className="w-full md:w-1/2 md:pr-12 mb-10 md:mb-0 border-b-2 md:border-b-0 md:border-r-2 border-orange-200 pb-10 md:pb-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
              <span className="h-px w-8 bg-orange-500"></span>
              <h4 className="text-xl font-bold tracking-widest text-orange-600 uppercase">
                Why Choose?
              </h4>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 text-center md:text-left leading-tight">
              Cook for a <span className="text-orange-500">Month</span>
            </h1>
          </motion.div>

          {/* Right Side: Description */}
          <motion.div
            className="w-full md:w-1/2 md:pl-12"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-xl sm:text-2xl text-gray-600 font-medium leading-relaxed text-center md:text-left">
              Try the service for a <span className="text-gray-900 font-bold underline decoration-orange-300 decoration-4 underline-offset-4">minimal trial amount</span> and, if satisfied, get the same cook appointed for a month.
            </p>
          </motion.div>

        </div>

        {/* --- The Content Component --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <ShowCa />
        </motion.div>

      </div>
    </section>
  );
};

export default BannerDow;