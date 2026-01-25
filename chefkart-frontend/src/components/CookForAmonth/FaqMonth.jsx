import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const FaqMonth = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqs = [
    {
      question: "What is 'Cook for a Month'?",
      answer:
        "‘Cook for a Month’ offers a seamless 30-day service where a trusted and verified cook prepares meals according to your preferences in the comfort of your home.",
    },
    {
      question: "Can I try the cook before choosing the service?",
      answer:
        "Yes, you can book a paid trial to experience the service. If satisfied, the same cook will be assigned for the entire 30-day period.",
    },
    {
      question: "How is a cook assigned to me?",
      answer:
        "A cook will be assigned based on your preferences and specifications (cuisine, timing, etc.) at the time of booking the trial.",
    },
    {
      question: "How can I find out if this service is available in my area?",
      answer:
        "Add your address on the homepage to check service availability. The page will then display a list of services offered in your specific location.",
    },
    {
      question: "When do I have to make the payment?",
      answer:
        "Once the trial session is over and you are satisfied, you have to pay the subscription fee to start your daily service with the selected cook.",
    },
    {
      question: "Will the cook clean the utensils?",
      answer:
        "No, the service does not include utensil cleaning. However, the cook will clean the stove and kitchen countertop after preparing your meals.",
    },
    {
      question: "What if I am not satisfied with my cook's service?",
      answer:
        "If you're not satisfied with your regular cook’s service, you have the option to request a replacement. We will accommodate your request promptly.",
    },
    {
      question: "Can I cancel my trial?",
      answer:
        "Yes. A full refund is available if you cancel before a cook is assigned. If a cook has been assigned, a 20% cancellation fee will apply.",
    },
    {
      question: "Can I stop my 'Cook for a Month' service mid-way?",
      answer:
        "Yes, you can discontinue the service. If you choose to stop, we will process a pro-rata refund for the remaining days upon cancellation.",
    },
    {
      question: "How and when can I renew my service?",
      answer:
        "You can renew your service starting from 7 days before its expiration date via the app or website.",
    },
    {
      question: "How can I get support related to my booking?",
      answer:
        "For support, contact us through the 'Help & Support' section on the ChefKart App. Our support team is available from 06:00 AM to 09:30 PM.",
    },
  ];

  // Animation configuration
  const accordionVariants = {
    open: { opacity: 1, height: "auto", marginTop: 16 },
    collapsed: { opacity: 0, height: 0, marginTop: 0 },
  };

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-5 max-w-4xl">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Frequently Asked <span className="text-orange-500">Questions</span>
          </h2>
          <div className="h-1 w-24 bg-orange-500 rounded mx-auto"></div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className={`bg-white rounded-xl border transition-all duration-300 ${isOpen
                    ? 'border-orange-500 shadow-lg ring-1 ring-orange-100'
                    : 'border-gray-200 shadow-sm hover:border-orange-300'
                  }`}
              >
                {/* Question Toggle */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`text-lg md:text-xl font-bold transition-colors ${isOpen ? 'text-orange-600' : 'text-gray-800'}`}>
                    {faq.question}
                  </span>

                  {/* Icon Wrapper */}
                  <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-orange-100' : 'bg-gray-100'}`}>
                    <FaChevronDown
                      className={`text-sm transition-transform duration-300 transform ${isOpen ? "rotate-180 text-orange-600" : "text-gray-500"
                        }`}
                    />
                  </div>
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
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-gray-600 text-base md:text-lg leading-relaxed border-t border-gray-100 pt-4">
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

export default FaqMonth;