import React from "react";
import { motion } from "framer-motion";

const Carousel2 = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">

          {/* Image Section - Slides in from Left */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://awgprivatechefs.com/wp-content/uploads/2021/05/nsplsh_b86635b484d2489d8e1d23806a8409de-mv2.jpg"
                alt="Chef Cooking"
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 bg-white p-4 rounded-xl shadow-lg">
                <p className="text-chef-orange font-bold text-3xl">10K+</p>
                <p className="text-gray-600 text-sm font-medium">Happy Households</p>
              </div>
            </div>
          </motion.div>

          {/* Text Section - Slides in from Right */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-chef-orange font-bold tracking-wider uppercase mb-2">
              Reliable & Trusted
            </h2>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6 leading-tight">
              Most Trusted Platform for <br />
              <span className="text-chef-orange">At-Home Cooking.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Finding a reliable cook shouldn't be a hassle. We verify every professional to ensure safety, hygiene, and the authentic taste you crave.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-chef-orange text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-orange-600 hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1">
                Download App
              </button>
              <button className="border-2 border-gray-200 text-secondary px-8 py-4 rounded-full font-bold hover:border-chef-orange hover:text-chef-orange transition-all">
                Learn More
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-10 flex items-center gap-6 border-t border-gray-100 pt-6">
              <div>
                <p className="font-bold text-2xl text-secondary">4.8/5</p>
                <p className="text-sm text-gray-500">App Rating</p>
              </div>
              <div className="h-10 w-px bg-gray-200"></div>
              <div>
                <p className="font-bold text-2xl text-secondary">500+</p>
                <p className="text-sm text-gray-500">Verified Chefs</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Carousel2;
