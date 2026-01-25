import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const Work = () => {
  const steps = [
    {
      title: "Register on app",
      desc: "Download the ChefKart App and register to explore Pune's best chefs.",
      img: "/generated-dish-1.png",
    },
    {
      title: "Select Chefit - Pune Special",
      desc: "Choose from our exclusive Pune menu - Puran Poli, Misal, and more.",
      img: "/pune-puran-poli.png",
    },
    {
      title: "Fill requirements & pay",
      desc: "Customize your spice levels (Puneri Thecha style?) and complete payment.",
      img: "/generated-chef-cooking.png",
    },
    {
      title: "Get a Puneri Cook",
      desc: "A trusted local cook arrives at your doorstep in Kothrud, Baner, or anywhere in Pune.",
      img: "/generated-kitchen-team.png",
    },
  ];

  return (
    <div className="bg-light py-16">
      <section className="text-gray-600 body-font">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-outfit text-center mb-12"
        >
          <span className="text-secondary font-bold">How it </span>works in Pune?
        </motion.h1>

        <div className="container px-5 mx-auto">
          <div className="flex flex-wrap -m-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-4 lg:w-1/4 md:w-1/2 relative group"
              >
                <div className="h-full flex flex-col items-center text-center relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden p-6">
                  <div className="overflow-hidden rounded-xl w-full h-64 mb-6">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                      alt={step.title}
                      className="w-full h-full object-cover object-center"
                      src={step.img}
                    />
                  </div>

                  {index < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <FaArrowRight className="text-primary w-8 h-8" />
                    </div>
                  )}

                  <div className="w-full">
                    <h2 className="title-font font-bold text-xl text-secondary mb-2 font-outfit">
                      {step.title}
                    </h2>
                    <p className="text-gray-500 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;
