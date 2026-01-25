import React from "react";
import { motion } from "framer-motion";
import { FaUserCheck, FaClock, FaHeadset, FaCalendarCheck } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaUserCheck />,
      title: "Professional Cooks",
      desc: "Verified, trained, and experienced chefs for your home.",
    },
    {
      icon: <FaCalendarCheck />,
      title: "Easy Booking",
      desc: "Book a cook in just a few clicks. Simple and fast.",
    },
    {
      icon: <FaClock />,
      title: "Timely Service",
      desc: "Punctual cooks who value your time and schedule.",
    },
    {
      icon: <FaHeadset />,
      title: "Prompt Support",
      desc: "24/7 customer support to assist you with any queries.",
    },
  ];

  return (
    <section className="bg-secondary text-white py-20 font-outfit">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-16"
        >
          Why Choose <span className="text-primary">ChefKart?</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, backgroundColor: "#2A2A2A" }}
              className="bg-gray-800/50 p-8 rounded-2xl shadow-lg border border-gray-700 flex flex-col items-center transition-colors duration-300"
            >
              <div className="text-5xl text-primary mb-6 bg-gray-700/50 p-4 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
