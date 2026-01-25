import React from 'react';
import { motion } from 'framer-motion';

// Imports (Keeping your exact file paths)
import FoodBanner from './Banner';
import FaqMonth from './FaqMonth';
import Lower from './Low1';        // This is likely Lower1.jsx
import Lower2 from './Lowertwo';   // This is likely Lower2.jsx
import BannerDow from './BannerDow';
import Carousel1 from './Slider2';
import Work from './Work';
import FloatingBanner from './FloatingBannerd';

const Month = () => {
  return (
    // 1. Semantic <main> tag
    // 2. Page Transition: Fades in nicely on load
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white min-h-screen relative"
    >
      {/* Top Hero / Slider */}
      <Carousel1 />

      {/* "Why Choose" Banner */}
      <BannerDow />

      {/* Process / How it Works */}
      <Work />

      {/* "Homemade Food" Feature Section */}
      <Lower2 />

      {/* "Discover 4500+ Cooks" Banner */}
      <Lower />

      {/* FAQ Section */}
      <FaqMonth />

      {/* Bottom Visual Banner */}
      <FoodBanner />

      {/* Sticky Floating CTA */}
      <FloatingBanner />

    </motion.main>
  );
};

export default Month;