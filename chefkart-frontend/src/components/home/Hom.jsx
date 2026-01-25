import React from 'react';
import { motion } from 'framer-motion';

// --- Imports (Keeping your file paths) ---
import FoodBanner1 from "./Banner";
import BlogSection from "./BlogSection";
import GalleryAutoSlideZoom from "./Gal";
import GalleryWithState from "./Galle";
import SkillIndiaSection from "./Section";
import Carousel2 from "./Slider2";
import StatsSection from "./StatsSection";
import Testimonial1 from "./NameTest";
import Testimonials from "./Testimon";
import Work from "./Work";
import Lower from "./Lower";
import Pricing from "./Pricing";
import WhyChooseUs from "./WhyChoose";
import TakeItForward from "./TakeItFormward";
import TabSwitchComponent from "./TabSwitch";
import ImageUpload from "../Upload/ImageUpload";

const Hom = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white w-full overflow-x-hidden"
    >
      {/* 1. Hero & Intro */}
      <FoodBanner1 />
      <Carousel2 />

      {/* 2. Value Proposition & Pricing */}
      <Pricing />
      <WhyChooseUs />

      {/* 3. Promotional Banner */}
      <Lower />

      {/* 4. How it Works */}
      <Work />

      {/* 5. Food Discovery (Menu/Tabs) */}
      <TabSwitchComponent />

      {/* 6. Social Proof (Stats & Reviews) */}
      <StatsSection />

      {/* Grouping Testimonials for better spacing */}
      <div className="space-y-12">
        <Testimonial1 />
        <Testimonials />
      </div>

      {/* 7. Image Upload Utility (Wrapped for layout safety) */}
      <section className="container mx-auto px-5 py-12">
        <div className="max-w-4xl mx-auto">
          <ImageUpload />
        </div>
      </section>

      {/* 8. Trust & Gallery */}
      <SkillIndiaSection />
      <GalleryWithState />
      <GalleryAutoSlideZoom />

      {/* 9. Content & Final CTA */}
      <BlogSection /> {/* Added this back (it was imported but missing) */}
      <TakeItForward />

    </motion.main>
  );
};

export default Hom;