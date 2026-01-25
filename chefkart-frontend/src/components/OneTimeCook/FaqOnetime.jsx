import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const FaqOne = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqs = [
    {
      question: "What is Chefit?",
      answer: "Chefit is a one-time cooking service where our trusted and verified cooks prepare healthy meals in the comfort of your kitchen.",
    },
    {
      question: "What is the price for Chefit?",
      answer: "The base price for the Chefit service is ₹499. For each additional person, there is an extra charge of ₹100 per person.",
    },
    {
      question: "How can I find out if this service is available in my area?",
      answer: "To check service availability, enter your address in the app. The home page will verify your location and display available services.",
    },
    {
      question: "Will Chefit provide groceries along with the service?",
      answer: "No, groceries are not provided. You need to manage the groceries yourself, ensuring you have exactly what you want to eat.",
    },
    {
      question: "What can I expect my cook to do post cooking?",
      answer: "We do not provide deep utensil cleaning. However, the cook will tidy the cooking area, transfer food to serving bowls, and place used utensils in the sink with water. The countertops will be left clean.",
    },
    {
      question: "How many dishes can the cook prepare?",
      answer: "The cook can prepare up to 4 dishes as part of the service. This typically includes a variety of daily home-cooked meals like Dal, Chawal, Roti, and Sabzi.",
    },
    {
      question: "Can I cancel my trial?",
      answer: "Yes, you can cancel the trial. A full refund is available if you cancel before a cook is assigned. If a cook has been assigned, a 20% cancellation fee will apply.",
    },
    {
      question: "How can I get support related to my booking?",
      answer: "For support, contact us through the 'Help & Support' section on the ChefKart App. Our support team is available from 06:00 AM to 09:30 PM.",
    },
  ];

  return (
    <section className="bg-gray-50 py-20 font-sans">
      <div className="container mx-auto px-5 max-w-4xl">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-orange-600 font-bold tracking-widest uppercase text-sm">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-2">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl transition-shadow duration-300 overflow-hidden border border-gray-100 ${activeIndex === index ? "shadow-lg ring-1 ring-orange-100" : "shadow-sm hover:shadow-md"
                }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none"
              >
                <span className={`text-lg md:text-xl font-bold transition-colors duration-300 ${activeIndex === index ? "text-orange-600" : "text-gray-800"
                  }`}>
                  {faq.question}
                </span>

                <span
                  className={`ml-4 p-2 rounded-full bg-gray-50 text-gray-400 transition-transform duration-300 ${activeIndex === index ? "rotate-180 bg-orange-50 text-orange-600" : ""
                    }`}
                >
                  <FaChevronDown size={14} />
                </span>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-gray-600 text-base leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Bottom Helper */}
        <div className="text-center mt-12 text-gray-500">
          Didn't find your answer?{" "}
          <a href="/contact" className="text-orange-600 font-bold hover:underline">
            Contact Support
          </a>
        </div>

      </div>
    </section>
  );
};

export default FaqOne;