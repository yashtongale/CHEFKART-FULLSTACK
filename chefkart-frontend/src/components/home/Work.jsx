import React from "react";
import { motion } from "framer-motion";
import { FaChevronRight, FaMapMarkerAlt } from "react-icons/fa";

const Work = () => {
  const steps = [
    {
      id: "01",
      title: "Register on App",
      desc: "Download the ChefKart App and create your profile to explore Pune's best chefs.",
      img: "/generated-dish-1.png",
    },
    {
      id: "02",
      title: "Select Pune Special",
      desc: "Choose from our exclusive local menu - Puran Poli, Misal Pav, and more.",
      img: "/pune-puran-poli.png",
    },
    {
      id: "03",
      title: "Customize & Pay",
      desc: "Customize spice levels (Puneri Thecha style?) and complete the secure payment.",
      img: "/generated-chef-cooking.png",
    },
    {
      id: "04",
      title: "Get a Puneri Cook",
      desc: "A trusted local cook arrives at your doorstep in Kothrud, Baner, or anywhere in Pune.",
      img: "/generated-kitchen-team.png",
    },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="bg-orange-50 py-20 overflow-hidden font-sans">
      <div className="container mx-auto px-5 max-w-7xl">

        {/* Header */}
        <div className="text-center mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 text-xs font-bold tracking-widest uppercase mb-4">
              Simple Process
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              How it works in <span className="text-orange-600">Pune?</span>
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto flex items-center justify-center gap-2">
              <FaMapMarkerAlt className="text-orange-500" />
              Serving Kothrud, Baner, Viman Nagar & more.
            </p>
          </motion.div>
        </div>

        {/* Process Steps */}
        <div className="relative">

          {/* Connector Line (Desktop) - Visual only */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 border-t-2 border-dashed border-orange-200 -z-0 transform -translate-y-12"></div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                {/* Step Number Badge */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-20 border-4 border-orange-50">
                  {step.id}
                </div>

                {/* Card Container */}
                <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">

                  {/* Image Area */}
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={step.img}
                      alt={step.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex-grow flex flex-col text-center lg:text-left">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Mobile Arrow (Visual Guide) */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center pb-4 text-orange-300">
                      <FaChevronRight className="rotate-90 md:rotate-0" />
                    </div>
                  )}
                </div>

                {/* Desktop Arrow (Absolute positioned between cards) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-6 transform -translate-y-12 z-0 justify-center items-center w-8 h-8 bg-white rounded-full shadow-md text-orange-400">
                    <FaChevronRight size={12} />
                  </div>
                )}

              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-orange-600 transition-all hover:scale-105">
            Book Your Cook Now
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default Work;