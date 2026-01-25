import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaStar, FaQuoteLeft } from "react-icons/fa";

const Carousel1 = () => {
  return (
    <section className="relative pt-32 pb-20 bg-[#fffbf2] overflow-hidden">

      {/* Background Decorative Blob */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[80%] bg-orange-100 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-[20%] -left-[10%] w-[30%] h-[50%] bg-yellow-50 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">

          {/* --- Text Section --- */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-bold tracking-wide uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              Cook for a Month
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              Trusted By <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                10K+ Households.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
              Professional & background verified cooks for a month. Enjoy healthy,
              home-cooked food every single day without the hassle.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-orange-500 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                Get Started
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="px-8 py-4 rounded-full font-bold text-gray-700 hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-200">
                View Pricing
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 flex items-center gap-4 text-sm text-gray-500 font-medium">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} className="w-8 h-8 rounded-full border-2 border-white" src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                ))}
              </div>
              <p>Join 10,000+ happy families</p>
            </div>

          </motion.div>

          {/* --- Image Section --- */}
          <motion.div
            className="w-full md:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <img
                src="/pune-misal_pav.png"
                alt="Home Cooked Meal"
                className="w-full h-[500px] object-cover"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Bottom Text */}
              <div className="absolute bottom-8 left-8 text-white">
                <p className="font-bold text-2xl">Authentic Taste</p>
                <p className="text-base opacity-90">In your own kitchen</p>
              </div>
            </div>

            {/* Floating Review Card (The Modern Touch) */}
            <motion.div
              className="absolute -bottom-6 -right-6 md:bottom-10 md:-left-10 bg-white p-4 rounded-xl shadow-xl border border-gray-100 max-w-xs z-20 hidden md:block"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="flex gap-1 text-yellow-400 mb-2 text-sm">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p className="text-gray-700 text-sm font-medium italic mb-2">
                "Finally, I can eat healthy without spending hours in the kitchen!"
              </p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-200 rounded-full overflow-hidden">
                  <img src="https://i.pravatar.cc/100?img=5" alt="Reviewer" />
                </div>
                <span className="text-xs text-gray-500 font-bold">Priya M.</span>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Carousel1;