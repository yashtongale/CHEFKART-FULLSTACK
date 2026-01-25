import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaCheckCircle, FaUser, FaEnvelope, FaMapMarkerAlt, FaCommentAlt } from "react-icons/fa";

const SignupSection = () => {
  const [formStatus, setFormStatus] = useState("idle"); // idle, submitting, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("submitting");

    // Simulate API call
    setTimeout(() => {
      setFormStatus("success");
    }, 1500);
  };

  return (
    <section className="bg-orange-50 py-24 relative overflow-hidden">

      {/* Decorative Background Blob */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-white rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="container px-6 mx-auto flex flex-wrap items-center relative z-10">

        {/* --- Left Side: Content --- */}
        <motion.div
          className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0 mb-10 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-extrabold text-5xl md:text-7xl text-gray-900 leading-tight mb-6">
            Simplifying the <br /> way <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 underline decoration-orange-300 decoration-4 underline-offset-8">India</span> eats.
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
            Join us in our mission to bring healthy, home-cooked meals to every household. Whether you're an investor, partner, or just a fan, we'd love to hear from you.
          </p>
        </motion.div>

        {/* --- Right Side: Form --- */}
        <motion.div
          className="lg:w-2/6 md:w-1/2 bg-white rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col md:ml-auto w-full relative overflow-hidden border border-gray-100"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">

            {/* STATE 1: SUCCESS MESSAGE */}
            {formStatus === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full py-10 text-center"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 text-4xl mb-6">
                  <FaCheckCircle />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-500">Thank you for believing in our mission.<br />We will reach out to you shortly.</p>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="mt-8 text-orange-600 font-bold hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (

              /* STATE 2: FORM INPUTS */
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
              >
                <h2 className="text-gray-900 font-bold text-3xl mb-2">Get in Touch</h2>
                <p className="text-gray-500 mb-8">Believe in our mission? We'd love to know you!</p>

                {/* Input: Full Name */}
                <div className="relative mb-5">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FaUser />
                  </div>
                  <input
                    type="text"
                    id="full-name"
                    name="full-name"
                    placeholder="Full Name"
                    required
                    className="w-full bg-gray-50 rounded-xl border border-gray-200 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-3 pl-10 pr-3 transition-colors duration-200 ease-in-out"
                  />
                </div>

                {/* Input: Email */}
                <div className="relative mb-5">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FaEnvelope />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    className="w-full bg-gray-50 rounded-xl border border-gray-200 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-3 pl-10 pr-3 transition-colors duration-200 ease-in-out"
                  />
                </div>

                {/* Input: City */}
                <div className="relative mb-5">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FaMapMarkerAlt />
                  </div>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="City"
                    className="w-full bg-gray-50 rounded-xl border border-gray-200 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-3 pl-10 pr-3 transition-colors duration-200 ease-in-out"
                  />
                </div>

                {/* Input: Message (Textarea) */}
                <div className="relative mb-6">
                  <div className="absolute top-3 left-3 flex items-center pointer-events-none text-gray-400">
                    <FaCommentAlt />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Your Message..."
                    rows="3"
                    className="w-full bg-gray-50 rounded-xl border border-gray-200 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-3 pl-10 pr-3 transition-colors duration-200 ease-in-out resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="w-full text-white bg-gradient-to-r from-orange-500 to-orange-600 border-0 py-4 px-8 focus:outline-none hover:from-orange-600 hover:to-orange-700 rounded-xl text-lg font-bold shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formStatus === "submitting" ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : (
                    <>
                      Submit <FaPaperPlane className="text-sm" />
                    </>
                  )}
                </button>

              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default SignupSection;