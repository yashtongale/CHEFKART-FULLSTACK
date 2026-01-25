import React from "react";
import { motion } from "framer-motion";
import { FaUserCheck, FaCalendarCheck, FaClock, FaHeadset } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: <FaUserCheck />,
      title: "Professional Cooks",
      desc: "Verified, trained, and experienced chefs handpicked for your home kitchen.",
    },
    {
      id: 2,
      icon: <FaCalendarCheck />,
      title: "Easy Booking",
      desc: "Book a cook in just a few clicks via our app. Simple, fast, and paperless.",
    },
    {
      id: 3,
      icon: <FaClock />,
      title: "Timely Service",
      desc: "Punctual professionals who value your time. We track attendance digitally.",
    },
    {
      id: 4,
      icon: <FaHeadset />,
      title: "Prompt Support",
      desc: "24/7 dedicated customer support to assist you with any queries or changes.",
    },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="bg-gray-900 text-white py-24 relative overflow-hidden">

      {/* Background Decor (Subtle Gradient) */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight"
          >
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">ChefKart?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            We don't just provide cooks; we provide a seamless culinary experience tailored to your lifestyle.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group bg-gray-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-700 hover:border-orange-500/50 hover:bg-gray-800 transition-all duration-300 relative overflow-hidden"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-transparent transition-all duration-500"></div>

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gray-700 group-hover:bg-orange-500 text-orange-500 group-hover:text-white flex items-center justify-center text-3xl mb-6 transition-all duration-300 shadow-lg group-hover:shadow-orange-500/40">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-orange-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default WhyChooseUs;