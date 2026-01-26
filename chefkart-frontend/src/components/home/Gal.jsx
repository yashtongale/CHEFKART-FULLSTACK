import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import api from "../../services/api";
import { motion, AnimatePresence } from "framer-motion";

// Slick CSS (Required)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// High-quality fallback data in case API fails or is loading
const FALLBACK_IMAGES = [
  { _id: 1, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", name: "Spicy Curry" },
  { _id: 2, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80", name: "Italian Pizza" },
  { _id: 3, image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=800&q=80", name: "Avocado Toast" },
  { _id: 4, image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80", name: "Fresh Salad" },
  { _id: 5, image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80", name: "BBQ Grill" },
];

const cuisines = ["Indian", "Chinese", "Mexican", "Italian", "Continental"];

const GalleryAutoSlideZoom = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentCuisineIndex, setCurrentCuisineIndex] = useState(0);

  // 1. Fetch Data with Fallback
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await api.get("/food/all");
        if (response.data && response.data.data && response.data.data.length > 0) {
          setImages(response.data.data);
        } else {
          setImages(FALLBACK_IMAGES);
        }
      } catch (error) {
        console.warn("API failed, using fallback images.");
        setImages(FALLBACK_IMAGES);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  // 2. Rotate Cuisine Text
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCuisineIndex((prev) => (prev + 1) % cuisines.length);
    }, 2500); // Slightly slower for better readability
    return () => clearInterval(interval);
  }, []);

  // 3. Slider Settings
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px", // Removes side padding to rely on scale
    slidesToShow: 3,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, centerPadding: "40px" },
      },
    ],
  };

  if (loading) return <div className="h-96 flex items-center justify-center text-gray-400">Loading gallery...</div>;

  return (
    <div className="bg-[#fffbf2] py-20 overflow-hidden relative">

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-5 relative z-10">

        {/* --- Header Section with Animated Text --- */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Craving{" "}
            <span className="inline-block relative text-orange-500 w-[240px] text-left">
              {/* AnimatePresence allows the exiting text to animate out */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentCuisineIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute left-0"
                >
                  {cuisines[currentCuisineIndex]}
                </motion.span>
              </AnimatePresence>
              &nbsp;
            </span>
            <br className="hidden md:block" />
            <span className="block mt-2">food? We've Got You!</span>
          </h1>
        </div>

        {/* --- The Carousel --- */}
        {/* We use CSS styles here to target the active slide.
            React Slick adds the '.slick-center' class to the middle element.
        */}
        <div className="slider-container py-10">
          <Slider {...settings}>
            {images.map((item, index) => (
              <div key={item._id || index} className="outline-none px-4 py-8">
                <div className="slider-card transition-all duration-500 ease-in-out rounded-3xl overflow-hidden shadow-xl bg-black relative group">

                  {/* Image */}
                  <img
                    src={item.image}
                    alt="Food"
                    className="object-cover w-full h-80 md:h-96 transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>

                  {/* Optional Label if data exists */}
                  {item.name && (
                    <div className="absolute bottom-6 left-6 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="font-bold text-xl">{item.name}</p>
                    </div>
                  )}

                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* --- CSS Overrides for the Zoom Effect --- */}
      <style>{`
        /* Default state: Smaller and slightly transparent */
        .slider-card {
          transform: scale(0.85);
          opacity: 0.7;
          filter: blur(1px);
        }

        /* Active Center State: Full size, fully visible */
        .slick-center .slider-card {
          transform: scale(1.1);
          opacity: 1;
          filter: blur(0px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          z-index: 10;
        }
        
        /* Mobile adjustment */
        @media (max-width: 768px) {
           .slick-center .slider-card {
             transform: scale(1);
           }
        }
      `}</style>

    </div>
  );
};

export default GalleryAutoSlideZoom;