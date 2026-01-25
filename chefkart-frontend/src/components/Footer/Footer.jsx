import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10 font-sans border-t-4 border-orange-500">
      <div className="container mx-auto px-6">

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* 1. Brand Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <span className="text-3xl filter grayscale group-hover:grayscale-0 transition-all duration-300">👨‍🍳</span>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-white">
                  ChefKart
                </span>
                <span className="text-xs text-orange-500 font-bold uppercase tracking-widest">
                  Premium Services
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Bringing the finest home chefs to your kitchen. Experience authentic,
              hygienic, and delicious meals cooked fresh at your home.
            </p>

            {/* App Store Buttons */}
            <div className="flex gap-3">
              <motion.img
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                src="https://chefkart-strapi-media.s3.ap-south-1.amazonaws.com/app_store_e12d7f52d9.svg"
                alt="Download on App Store"
                className="h-10 cursor-pointer"
              />
              <motion.img
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                src="https://chefkart-strapi-media.s3.ap-south-1.amazonaws.com/google_play_bb87168764.svg"
                alt="Get it on Google Play"
                className="h-10 cursor-pointer"
              />
            </div>
          </div>

          {/* 2. Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-orange-500 font-bold tracking-wider text-sm mb-6 uppercase">Services</h3>
            <ul className="space-y-4">
              {['Cook for a Month', 'One-Time Cook', 'Chef for Party', 'Pune Specials'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Company */}
          <div className="text-center md:text-left">
            <h3 className="text-orange-500 font-bold tracking-wider text-sm mb-6 uppercase">Company</h3>
            <ul className="space-y-4">
              {['About Us', 'Blog', 'Careers', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Newsletter (New Addition) */}
          <div className="text-center md:text-left">
            <h3 className="text-orange-500 font-bold tracking-wider text-sm mb-6 uppercase">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for latest recipes and offers.</p>
            <div className="flex flex-col gap-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-700 placeholder-gray-500"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-orange-500 hover:text-white transition-colors">
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar Separator */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            {/* Copyright */}
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} ChefKart Hospitality Pvt Ltd. All rights reserved.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              {[
                { icon: FaFacebookF, href: "https://facebook.com" },
                { icon: FaTwitter, href: "https://twitter.com" },
                { icon: FaInstagram, href: "https://instagram.com" },
                { icon: FaLinkedinIn, href: "https://linkedin.com" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, color: "#f97316" }} // Orange on hover
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-white hover:text-orange-500 transition-all duration-300"
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;