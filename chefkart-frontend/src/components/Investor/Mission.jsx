import React from "react";
import { motion } from "framer-motion";
import { FaUtensils, FaUserCheck, FaHome, FaArrowRight } from "react-icons/fa";

const MissionSection = () => {
  const stats = [
    {
      value: "3M+",
      label: "Meals cooked with love",
      icon: <FaUtensils className="text-orange-500" />
    },
    {
      value: "4500+",
      label: "Trained & verified cooks",
      icon: <FaUserCheck className="text-orange-500" />
    },
    {
      value: "10K+",
      label: "Households served",
      icon: <FaHome className="text-orange-500" />
    }
  ];

  return (
    <section className="bg-orange-50/30 py-20 px-6 sm:px-12 lg:px-24 border-y border-orange-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

        {/* --- Left Column: Mission Narrative (Span 7) --- */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 text-xs font-bold tracking-widest uppercase mb-6">
              Our Mission
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-8">
              Empowering cooks to bridge the gap between <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">tasty food</span> & <span className="text-green-600">healthy eating</span>.
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-2xl">
              We believe that good food shouldn't come at the cost of your health or your time.
              By connecting households with professional cooks, we are reviving the culture of fresh, home-cooked meals in urban India.
            </p>

            <a
              href="/about"
              className="inline-flex items-center gap-2 text-gray-900 font-bold border-b-2 border-orange-500 hover:text-orange-600 hover:border-orange-600 transition-colors pb-1 group"
            >
              Read our full story
              <FaArrowRight className="transform group-hover:translate-x-1 transition-transform text-sm" />
            </a>
          </motion.div>
        </div>

        {/* --- Divider Line (Hidden on Mobile) --- */}
        <div className="hidden lg:block lg:col-span-1 h-full flex justify-center">
          <div className="w-px h-full bg-orange-200/50 min-h-[200px]"></div>
        </div>

        {/* --- Right Column: Stats (Span 4) --- */}
        <div className="lg:col-span-4">
          <div className="flex flex-col gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-300"
              >
                <div className="p-3 bg-white rounded-full shadow-sm text-xl border border-orange-100">
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 leading-none mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default MissionSection;