import React from 'react';
import { motion } from 'framer-motion';

// --- Component Imports ---
// Ensure these paths match where you saved the files!
import AnnouncementBanner from './Bottom'; // Formerly ./Bottom
import SignupSection from './SignupSection';
import PressReleases from './PresRelease';
import MissionSection from './Mission';
import Carousel2 from './Slider2'; // The "Trusted Platform" section
import Investors from './components/Feature'; // Formerly ./Recent copy/...

const Invest = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white w-full overflow-x-hidden"
    >

      {/* 1. Hero / Intro Section */}
      {/* Reusing Carousel2 here works well to establish trust immediately */}
      <Carousel2 />

      {/* 2. Company Mission */}
      <MissionSection />

      {/* 3. Press & Media Coverage */}
      <PressReleases />

      {/* 4. Investor Carousel */}
      <Investors />

      {/* 5. Lead Generation / Newsletter */}
      <SignupSection />

      {/* 6. Bottom Announcement Banner */}
      <AnnouncementBanner />

    </motion.main>
  );
};

export default Invest;
