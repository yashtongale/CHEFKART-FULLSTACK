import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaChevronDown, FaUtensils } from "react-icons/fa";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // For mobile dropdown toggle

  const location = useLocation();
  const isHome = location.pathname === "/";

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation Data
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    {
      name: "Services",
      path: "#", // Dropdown trigger
      isDropdown: true,
      subLinks: [
        { name: "Cook for a Month", path: "/cook-for-month" },
        { name: "One Time Cook", path: "/one-time-cook" },
        { name: "Chef for Party", path: "/chef-for-party" }
      ]
    },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  // Dynamic Styles based on Scroll/Home
  // On Home: Transparent at top, White on scroll. 
  // On Other Pages: Always White.
  const navbarClasses = isHome && !isScrolled
    ? "bg-transparent py-6 text-white"
    : "bg-white/95 backdrop-blur-md shadow-sm py-4 text-gray-800";

  const linkColor = isHome && !isScrolled ? "text-white/90 hover:text-white" : "text-gray-600 hover:text-orange-600";
  const logoColor = isHome && !isScrolled ? "text-white" : "text-orange-600";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-40 transition-all duration-300 ${navbarClasses}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">

        {/* --- Logo --- */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className={`text-3xl ${logoColor} transition-colors`}>
            <FaUtensils />
          </span>
          <span className={`text-2xl font-bold font-sans tracking-tight ${isHome && !isScrolled ? 'text-white' : 'text-gray-900'}`}>
            ChefKart
          </span>
        </Link>

        {/* --- Desktop Menu --- */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              {link.isDropdown ? (
                // Dropdown Trigger
                <div className={`flex items-center gap-1 cursor-pointer font-medium ${linkColor} transition-colors`}>
                  {link.name}
                  <FaChevronDown className="text-xs transition-transform group-hover:rotate-180" />

                  {/* Dropdown Content */}
                  <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden w-56 p-2">
                      {link.subLinks.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                // Normal Link
                <Link
                  to={link.path}
                  className={`relative font-medium text-lg transition-colors ${location.pathname === link.path ? "text-orange-500 font-bold" : linkColor
                    }`}
                >
                  {link.name}
                  {/* Active Indicator Dot */}
                  {location.pathname === link.path && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-2 left-1/2 w-1.5 h-1.5 bg-orange-500 rounded-full -translate-x-1/2"
                    />
                  )}
                </Link>
              )}
            </div>
          ))}

          {/* CTA Button */}
          <Link to="/register-chef">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2.5 rounded-full font-bold shadow-lg transition-all ${isHome && !isScrolled
                ? "bg-white text-orange-600 hover:bg-gray-100"
                : "bg-orange-500 text-white hover:bg-orange-600 hover:shadow-orange-200"
                }`}
            >
              Book a Cook
            </motion.button>
          </Link>
        </div>

        {/* --- Mobile Menu Button --- */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`text-2xl focus:outline-none ${isHome && !isScrolled ? 'text-white' : 'text-gray-800'}`}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* --- Mobile Menu Overlay --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white fixed inset-0 top-16 z-30 overflow-y-auto"
          >
            <div className="flex flex-col items-center pt-10 px-6 space-y-6">
              {navLinks.map((link) => (
                <div key={link.name} className="w-full text-center">
                  {link.isDropdown ? (
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                        className="text-gray-800 text-xl font-bold flex items-center gap-2 mb-2"
                      >
                        {link.name} <FaChevronDown className={`transition-transform ${activeDropdown === link.name ? "rotate-180" : ""}`} />
                      </button>

                      {/* Mobile Dropdown Items */}
                      <AnimatePresence>
                        {activeDropdown === link.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-gray-50 w-full rounded-xl overflow-hidden"
                          >
                            {link.subLinks.map(sub => (
                              <Link
                                key={sub.name}
                                to={sub.path}
                                onClick={() => setIsOpen(false)}
                                className="block py-3 text-gray-600 hover:text-orange-500"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-xl font-medium ${location.pathname === link.path ? "text-orange-500" : "text-gray-800"}`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}

              <Link to="/register-chef" onClick={() => setIsOpen(false)} className="w-full">
                <button className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg shadow-md mt-4">
                  Book a Cook
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;