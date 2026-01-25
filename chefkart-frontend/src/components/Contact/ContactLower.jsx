import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import FAQ from "./FAQ";

const ContactLower = () => {
  return (
    <div className="bg-white">
      <section className="text-gray-600 body-font border-b border-gray-100">
        <div className="container mx-auto px-6 py-24">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* --- Left Column: Mission --- */}
            <motion.div
              className="flex flex-col gap-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Mission Statement */}
              <div className="relative">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-snug">
                  Our mission is to provide <span className="text-orange-500">at-home cooking services</span> in a way that has never been experienced before by empowering millions of cooks across India.
                </h2>
                {/* Decorative Element */}
                <div className="absolute -left-6 top-0 w-1 h-full bg-orange-200 rounded hidden md:block"></div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-lg mt-4">
                <img
                  className="w-full h-64 md:h-80 object-cover object-top hover:scale-105 transition-transform duration-700"
                  alt="ChefKart Mission - Empowering Cooks"
                  src="https://thechefkart.com/_next/image?url=%2FM_F_Home%20chef_refine%201.png&w=1920&q=75"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* --- Right Column: Story --- */}
            <motion.div
              className="flex flex-col gap-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  className="w-full h-64 md:h-80 object-cover hover:scale-105 transition-transform duration-700"
                  alt="ChefKart Ecosystem"
                  src="https://thechefkart.com/_next/image?url=%2FImage.png&w=1920&q=75"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-col items-start">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  ChefKart is a platform that connects home chefs and households seamlessly by building an ecosystem. Our professionals are handpicked to serve you <span className="font-semibold text-gray-900">hygienic and wholesome meals</span> catered to your taste!
                </p>

                {/* Interactive Link */}
                <Link
                  to="/about"
                  className="group inline-flex items-center text-orange-600 font-bold text-lg hover:text-orange-700 transition-colors"
                >
                  Read about our story
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">
                    <FaArrowRight size={14} />
                  </span>
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
};

export default ContactLower;