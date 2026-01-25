import React, { useState, useEffect, useCallback } from "react";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand } from "react-icons/fa";

// Ensure Slick CSS is imported
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GalleryWithState = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomedIndex, setZoomedIndex] = useState(0);

  const images = [
    { _id: "1", image: "/pune-misal-pav.png", title: "Spicy Misal Pav" },
    { _id: "2", image: "/pune-puran-poli.png", title: "Sweet Puran Poli" },
    { _id: "3", image: "/generated-dish-1.png", title: "Gourmet Plating" },
    { _id: "4", image: "/generated-ingredients.png", title: "Fresh Ingredients" },
    { _id: "5", image: "/generated-chef-cooking.png", title: "Master Chef" },
    { _id: "6", image: "/generated-kitchen-team.png", title: "Our Team" },
  ];

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 3,
    speed: 500,
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 1, centerPadding: "40px" } },
    ],
  };

  // --- Handlers ---

  const handleZoom = (index) => {
    setZoomedIndex(index);
    setIsZoomed(true);
  };

  const handleNext = useCallback(() => {
    setZoomedIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setZoomedIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard Navigation Support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isZoomed) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setIsZoomed(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isZoomed, handleNext, handlePrev]);

  return (
    <section className="bg-orange-50/50 py-20 relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>

      <div className="container mx-auto max-w-7xl px-5 relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
          >
            Pune's <span className="text-orange-500">Culinary Gallery</span>
          </motion.h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            A visual journey through the authentic flavors and expert preparation that defines our service.
          </p>
        </div>

        {/* --- Slider Gallery --- */}
        <div className="py-8">
          <Slider {...settings}>
            {images.map((img, index) => (
              <div key={img._id} className="px-4 py-4 outline-none">
                <motion.div
                  whileHover={{ y: -10 }}
                  className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-white h-72 md:h-80"
                  onClick={() => handleZoom(index)}
                >
                  <img
                    src={img.image}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white transform scale-0 group-hover:scale-100 transition-transform duration-300">
                      <FaExpand size={20} />
                    </div>
                  </div>

                  {/* Title Label */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-bold text-lg text-center">{img.title}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>

        {/* --- Lightbox Modal --- */}
        <AnimatePresence>
          {isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
              onClick={() => setIsZoomed(false)} // Close on background click
            >
              {/* Close Button */}
              <button
                className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-50"
                onClick={() => setIsZoomed(false)}
              >
                <FaTimes size={24} />
              </button>

              {/* Prev Button */}
              <button
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all hidden md:block"
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              >
                <FaChevronLeft size={24} />
              </button>

              {/* Next Button */}
              <button
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all hidden md:block"
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
              >
                <FaChevronRight size={24} />
              </button>

              {/* Image Container */}
              <motion.div
                key={zoomedIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center"
                onClick={(e) => e.stopPropagation()} // Prevent close on image click
              >
                <img
                  src={images[zoomedIndex].image}
                  alt={images[zoomedIndex].title}
                  className="w-full h-auto max-h-[75vh] object-contain rounded-lg shadow-2xl"
                />
                <div className="mt-4 text-center">
                  <h3 className="text-2xl font-bold text-white tracking-wide">
                    {images[zoomedIndex].title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {zoomedIndex + 1} / {images.length}
                  </p>
                </div>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GalleryWithState;