import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import ContactLower from "./ContactLower";

const Contact = () => {
  // 1. Setup React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  // 2. Handle Submit
  const onSubmit = async (data) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Form Submitted:", data);
    toast.success("Message sent successfully! We'll contact you soon.");
    reset();
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">

          {/* --- Left Section: Interactive Map & Info --- */}
          <motion.div
            className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-2xl overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative h-[600px] shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <iframe
              width="100%"
              height="100%"
              className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-500"
              frameBorder="0"
              title="ChefKart Gurugram Office"
              marginHeight="0"
              marginWidth="0"
              scrolling="no"
              loading="lazy"
              // Updated to a real embed link pointing to the address mentioned
              src="https://maps.google.com/maps?q=Sector%2057%20Gurugram&t=&z=13&ie=UTF8&iwloc=&output=embed"
            ></iframe>

            {/* Floating Address Card */}
            <div className="bg-white relative flex flex-wrap py-6 rounded-xl shadow-md w-full opacity-95 backdrop-blur-sm">
              <div className="lg:w-1/2 px-6 mb-4">
                <h2 className="title-font font-bold text-gray-900 tracking-widest text-xs uppercase mb-1 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-orange-500" /> Address
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  B-179, Sector 57, near Rail Vihar, Block B, Sushant Lok III,
                  Gurugram, Haryana 122003
                </p>
              </div>
              <div className="lg:w-1/2 px-6">
                <h2 className="title-font font-bold text-gray-900 tracking-widest text-xs uppercase mb-1 flex items-center gap-2">
                  <FaEnvelope className="text-orange-500" /> Email
                </h2>
                <a href="mailto:contact@chefkart.com" className="text-indigo-500 leading-relaxed text-sm hover:underline">
                  contact@chefkart.com
                </a>

                <h2 className="title-font font-bold text-gray-900 tracking-widest text-xs uppercase mt-4 mb-1 flex items-center gap-2">
                  <FaPhoneAlt className="text-orange-500" /> Phone
                </h2>
                <p className="leading-relaxed text-sm">+91 89369 36900</p>
              </div>
            </div>
          </motion.div>

          {/* --- Right Section: Modern Form --- */}
          <motion.div
            className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 px-8 py-8 rounded-2xl shadow-xl border border-gray-100"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-gray-900 text-3xl mb-1 font-extrabold title-font">
              Get in Touch
            </h2>
            <p className="leading-relaxed mb-8 text-gray-500">
              Have questions? Fill out the form and we'll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

              {/* Name */}
              <div className="relative">
                <label htmlFor="name" className="leading-7 text-sm text-gray-600 font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  className={`w-full bg-gray-50 rounded border text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'}`}
                />
                {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
              </div>

              {/* Email */}
              <div className="relative">
                <label htmlFor="email" className="leading-7 text-sm text-gray-600 font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                  })}
                  className={`w-full bg-gray-50 rounded border text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'}`}
                />
                {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
              </div>

              {/* Phone */}
              <div className="relative">
                <label htmlFor="phone" className="leading-7 text-sm text-gray-600 font-medium">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone", {
                    required: "Phone is required",
                    minLength: { value: 10, message: "Must be 10 digits" }
                  })}
                  className={`w-full bg-gray-50 rounded border text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'}`}
                />
                {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
              </div>

              {/* City */}
              <div className="relative">
                <label htmlFor="city" className="leading-7 text-sm text-gray-600 font-medium">City</label>
                <select
                  id="city"
                  {...register("city")}
                  className="w-full bg-gray-50 rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                >
                  <option value="Gurugram">Gurugram</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Pune">Pune</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div className="relative">
                <label htmlFor="message" className="leading-7 text-sm text-gray-600 font-medium">Message</label>
                <textarea
                  id="message"
                  {...register("message", { required: "Message is required" })}
                  className={`w-full bg-gray-50 rounded border h-32 text-base outline-none text-gray-700 py-2 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'}`}
                ></textarea>
                {errors.message && <span className="text-red-500 text-xs">{errors.message.message}</span>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="text-white bg-orange-500 border-0 py-3 px-6 focus:outline-none hover:bg-orange-600 rounded-lg text-lg font-semibold transition-all shadow-md hover:shadow-lg disabled:bg-orange-300 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Sending...</span>
                ) : (
                  "Send Message"
                )}
              </button>

            </form>
          </motion.div>
        </div>
      </section>

      {/* Lower Section reused */}
      <ContactLower />

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Contact;