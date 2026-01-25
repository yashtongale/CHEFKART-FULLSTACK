import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { FaArrowRight, FaPlayCircle } from "react-icons/fa";

// Ensure Slick CSS is imported
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel2 = () => {
  const slides = [
    {
      id: 1,
      // We can use HTML/JSX in the title for custom highlighting
      title: (
        <>
          We are <span className="text-orange-500">category creators</span>, <br />
          dedicated to simplifying <br />
          the way <span className="text-orange-500">India eats.</span>
        </>
      ),
      description: "Experience the taste from around the world without leaving the coziness of home. We are building the future of at-home cooking.",
      bgImage: "https://thechefkart.com/_next/image?url=https%3A%2F%2Fchefkart-strapi-media.s3.ap-south-1.amazonaws.com%2FInvestor_Hero_banner_1_f1154a025e.webp&w=1920&q=75",
    },
    {
      id: 2,
      title: (
        <>
          Empowering <span className="text-orange-500">4500+ Cooks</span> <br />
          with Dignity and Earnings.
        </>
      ),
      description: "Bridging the gap between talented home chefs and households looking for healthy, hygienic meals.",
      bgImage: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=1920&q=80",
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true, // Smooth fade transition instead of slide
    arrows: false,
    appendDots: dots => (
      <div style={{ bottom: "50px" }}>
        <ul className="m-0"> {dots} </ul>
      </div>
    ),
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative w-full h-screen outline-none">

            {/* Background Image with Zoom Effect */}
            <div
              className="absolute inset-0 bg-cover bg-center animate-pulse-slow"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            >
              {/* Dark Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
              <div className="max-w-3xl">

                {/* Animated Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }} // Re-animate on every slide view
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6"
                >
                  {slide.title}
                </motion.h1>

                {/* Animated Description */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-lg md:text-2xl text-gray-300 mb-10 leading-relaxed font-light"
                >
                  {slide.description}
                </motion.p>

                {/* Animated Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <button className="bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-700 transition-all shadow-lg hover:shadow-orange-500/30 flex items-center justify-center gap-2">
                    Invest Now <FaArrowRight />
                  </button>
                  <button className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2">
                    <FaPlayCircle className="text-xl" /> Watch Pitch
                  </button>
                </motion.div>

              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom Styles for Dots */}
      <style>{`
        .slick-dots li button:before {
          color: white;
          font-size: 12px;
          opacity: 0.5;
        }
        .slick-dots li.slick-active button:before {
          color: #ea580c; /* Tailwind orange-600 */
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default Carousel2;