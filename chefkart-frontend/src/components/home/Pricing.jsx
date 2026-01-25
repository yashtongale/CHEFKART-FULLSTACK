import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingData = [
    {
      title: "One-time Cook",
      price: "₹299",
      unit: "/ visit",
      desc: "Perfect for sudden cravings or guests.",
      features: [
        "Trained & Verified Cooks",
        "Healthy & Hygienic Food",
        "Tailored to Your Taste",
        "Instant Booking",
        "Utensil Cleaning (Excluded)"
      ],
      buttonText: "Book Now",
      popular: false
    },
    {
      title: "Cook for a Month",
      price: isAnnual ? "₹4000" : "₹4500", // Dynamic Price demo
      unit: "/ month",
      desc: "Dedicated cook for your daily meals.",
      features: [
        "Verified & Background Checked",
        "Unlimited Replacements",
        "Customizable Menu",
        "3-Day Trial Included",
        "Utensil Cleaning (Included)"
      ],
      buttonText: "Subscribe Now",
      popular: true
    },
    {
      title: "Chef for Party",
      price: "₹1500",
      unit: "/ event",
      desc: "Professional chef for house parties.",
      features: [
        "Multi-cuisine Experts",
        "Live Cooking Stations",
        "Bartender Services (Add-on)",
        "Post-party Cleanup",
        "Guest Limit: Up to 15"
      ],
      buttonText: "Plan Party",
      popular: false
    },
  ];

  return (
    <section className="bg-gray-50 py-24 font-sans overflow-hidden">
      <div className="container mx-auto px-6">

        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-3"
          >
            Flexible Pricing
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
          >
            Choose the plan that <br /> fits your <span className="text-orange-500">lifestyle.</span>
          </motion.h1>

          {/* Toggle Switch (Modern UI Pattern) */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <span className={`text-sm font-bold ${!isAnnual ? "text-gray-900" : "text-gray-400"}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-8 bg-gray-300 rounded-full p-1 flex items-center transition-colors duration-300 focus:outline-none data-[state=checked]:bg-orange-500"
              data-state={isAnnual ? "checked" : "unchecked"}
            >
              <motion.div
                layout
                className={`w-6 h-6 bg-white rounded-full shadow-md ${isAnnual ? "ml-auto" : ""}`}
              />
            </button>
            <span className={`text-sm font-bold ${isAnnual ? "text-gray-900" : "text-gray-400"}`}>
              Yearly <span className="text-orange-500 text-xs ml-1">(Save 10%)</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="flex flex-wrap justify-center gap-8 items-center">
          {pricingData.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`relative w-full md:w-[350px] p-8 rounded-3xl flex flex-col transition-all duration-300 ${plan.popular
                  ? "bg-gray-900 text-white shadow-2xl scale-105 z-10 border-2 border-orange-500"
                  : "bg-white text-gray-800 shadow-xl border border-gray-100 hover:border-orange-200"
                }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <span className="bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-2xl uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Title & Price */}
              <div className="mb-6">
                <h3 className={`text-lg font-bold uppercase tracking-wider mb-2 ${plan.popular ? "text-orange-400" : "text-orange-500"}`}>
                  {plan.title}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className={`text-sm ${plan.popular ? "text-gray-400" : "text-gray-500"}`}>{plan.unit}</span>
                </div>
                <p className={`mt-4 text-sm leading-relaxed ${plan.popular ? "text-gray-400" : "text-gray-500"}`}>
                  {plan.desc}
                </p>
              </div>

              {/* Divider */}
              <div className={`h-px w-full mb-6 ${plan.popular ? "bg-gray-700" : "bg-gray-100"}`}></div>

              {/* Features List */}
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <FaCheckCircle className={`mt-1 flex-shrink-0 ${plan.popular ? "text-orange-500" : "text-green-500"}`} size={16} />
                    <span className={`text-sm font-medium ${plan.popular ? "text-gray-300" : "text-gray-600"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all shadow-lg transform active:scale-95 ${plan.popular
                    ? "bg-orange-500 text-white hover:bg-orange-600 hover:shadow-orange-500/25"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200 hover:text-orange-600"
                  }`}
              >
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Note */}
        <p className="text-center text-gray-500 text-sm mt-16 flex items-center justify-center gap-2">
          <FaCheckCircle className="text-green-500" /> No hidden charges. 100% money-back guarantee on trial cancellations.
        </p>
      </div>
    </section>
  );
};

export default Pricing;