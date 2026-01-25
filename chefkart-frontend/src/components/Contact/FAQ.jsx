import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqs = [
    {
      question: "What is ChefKart?",
      answer:
        "ChefKart is a platform that connects home chefs and households seamlessly by providing at-home cooking services tailored to your taste.",
    },
    {
      question: "How does the service work?",
      answer:
        "You can book a professional chef through our platform, who will visit your home to cook fresh and hygienic meals for you.",
    },
    {
      question: "How are cooks onboarded?",
      answer:
        "Cooks list themselves on the ChefKart Partner App. We register cooks after background verification and criminal record checks. They undergo assessments and mandatory training to ensure they meet our standards.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "Currently, we serve major cities like Gurugram, Delhi, and Noida. We are expanding to other cities soon!",
    },
    {
      question: "Are your chefs professionally trained?",
      answer:
        "Yes, our chefs are thoroughly vetted, trained, and equipped to provide top-notch cooking services.",
    },
    {
      question: "How do I book a chef?",
      answer:
        "You can book a chef through our website or mobile app by selecting a service and scheduling a time that works for you.",
    },
  ];

  // Animation Variants
  const accordionVariants = {
    open: { opacity: 1, height: "auto", marginTop: 16 },
    collapsed: { opacity: 0, height: 0, marginTop: 0 },
  };

  return (
    <section className="bg-gray-50 py-16 border-t border-gray-100">
      <div className="container mx-auto px-5 max-w-4xl">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Frequently Asked <span className="text-orange-500">Questions</span>
          </h2>
          <div className="h-1 w-20 bg-orange-500 rounded mx-auto mt-4"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className={`bg-white rounded-xl border transition-all duration-300 ${isOpen ? 'border-orange-500 shadow-md' : 'border-gray-200 shadow-sm hover:border-orange-300'}`}
              >
                {/* Question Toggle */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-bold text-gray-900">
                    {faq.question}
                  </span>
                  <FaChevronDown
                    className={`text-orange-500 transition-transform duration-300 transform ${isOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {/* Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={accordionVariants}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;