import React from "react";
import { motion } from "framer-motion";
import { FaDownload, FaArrowRight, FaStar, FaUserShield } from "react-icons/fa";

const Carousel2 = () => {
  return (
    <section className="relative py-20 bg-white overflow-hidden">

      {/* Decorative Background Pattern (Subtle Grid) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">

          {/* --- Image Section --- */}
          <motion.div
            className="w-full md:w-1/2 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Background Blob */}
            <div className="absolute top-10 -left-10 w-72 h-72 bg-orange-100 rounded-full blur-3xl -z-10 opacity-70"></div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform hover:rotate-1 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=1600&q=80"
                alt="Chef Cooking at Home"
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Badge (Glassmorphism) */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/50"
              >
                <p className="text-orange-600 font-extrabold text-4xl">10K+</p>
                <p className="text-gray-600 text-sm font-semibold mt-1">Happy Households</p>
              </motion.div>
            </div>
          </motion.div>

          {/* --- Text Section --- */}
          <motion.div
            className="w-full md:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { staggerChildren: 0.1, duration: 0.6 }
              }
            }}
          >
            {/* Tagline */}
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
              <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 text-xs font-bold tracking-widest uppercase mb-4">
                Reliable & Trusted
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2 variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Most Trusted Platform for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                At-Home Cooking.
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="text-lg text-gray-600 mb-8 leading-relaxed">
              Finding a reliable cook shouldn't be a hassle. We verify every professional
              to ensure safety, hygiene, and the authentic taste you crave. Experience
              restaurant-quality meals in the comfort of your home.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col sm:flex-row gap-4 mb-10">
              <button className="flex items-center justify-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-orange-700 hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1">
                <FaDownload /> Download App
              </button>
              <button className="flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-full font-bold hover:border-orange-500 hover:text-orange-600 transition-all group">
                Learn More <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* Trust Indicators (Divider Line) */}
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="flex items-center gap-8 border-t border-gray-100 pt-8"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600 mt-1">
                  <FaStar />
                </div>
                <div>
                  <p className="font-bold text-2xl text-gray-900">4.8/5</p>
                  <p className="text-sm text-gray-500 font-medium">App Rating</p>
                </div>
              </div>

              <div className="w-px h-12 bg-gray-200"></div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg text-green-600 mt-1">
                  <FaUserShield />
                </div>
                <div>
                  <p className="font-bold text-2xl text-gray-900">500+</p>
                  <p className="text-sm text-gray-500 font-medium">Verified Chefs</p>
                </div>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Carousel2;