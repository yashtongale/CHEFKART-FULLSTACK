import React from 'react';
import { motion } from 'framer-motion';

// --- Component Imports ---
// Make sure these paths match your actual project structure
// import Carousel2 from './Carousel2';       // Hero Section
import BannerDow from './BannerDow';     // Intro Section
import Statsection from './Statsection'; // Stats
import Work from './Work';                 // How it Works
import Heart1 from './Heart1';           // Customer Story Video
import Testimon from './Testimon'; // Reviews Slider
import Lower3 from './Lower3';             // "No time to cook" Section
import Lower from './Lower';             // "Why order online" Section
import FaqOnetime from './FaqOnetime';             // FAQ
import FloatingBannerd from './FloatingBannerd'; // Sticky Bottom CTA

const OneTime = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white w-full overflow-x-hidden relative"
    >

      {/* 1. Hero Section */}
      {/* <Carousel2 /> */}

      {/* 2. Introduction */}
      <BannerDow />

      {/* 3. Key Metrics */}
      <Statsection />

      {/* 4. Process (How it works) */}
      <Work />

      {/* 5. Customer Spotlight (Video) */}
      <Heart1 />

      {/* 6. Social Proof (Reviews) */}
      <Testimon />

      {/* 7. Speed/Urgency Section */}
      <Lower3 />

      {/* 8. Value Proposition */}
      <Lower />

      {/* 9. FAQ */}
      <FaqOnetime />

      {/* 10. Sticky Bottom CTA */}
      <FloatingBannerd />

    </motion.main>
  );
}

export default OneTime;