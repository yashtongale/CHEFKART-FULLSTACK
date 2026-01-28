import React from 'react';
import { motion } from 'framer-motion';

// --- Component Imports ---
// Ensure these point to the files you created!
import Carousel3 from './Crouse.jsx';       // Hero Section (Reviews)
import Testimonial1 from './Testimonial'; // The Slider Component
import Heart3 from './Heart3';             // (Waiting for code) - likely 'Uppertesti'
import Heart2 from './Heart2';             // Partner Video (Ajnahar)
import Heart1 from './Heart1';             // Customer Video (Pramiti)

const Testi = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white w-full overflow-x-hidden"
    >

      {/* 1. Hero Section */}
      <Carousel3 />

      {/* 2. Reviews Slider */}
      {/* Note: If 'Testimonial1' is different from the slider we built earlier, paste its code! */}
      <Testimonial1 />

      {/* 3. Upper Testimonial Section */}
      {/* Placeholder for Heart3/Uppertesti */}
      {Heart3 && <Heart3 />}

      {/* 4. Partner Spotlight (Hindi Video) */}
      <Heart2 />

      {/* 5. Customer Spotlight (English Video) */}
      <Heart1 />

    </motion.main>
  );
};

export default Testi;
