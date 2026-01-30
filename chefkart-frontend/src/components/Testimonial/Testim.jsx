import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import api from "../../services/api";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar, FaUserCircle } from "react-icons/fa";

// Slick CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Fallback data for immediate display
const FALLBACK_TESTIMONIALS = [
  {
    _id: "1",
    name: "Sohan Singh",
    content: "ChefKart has been a blessing for my family. The cook is punctual, hygienic, and makes amazing food. Highly recommended!",
    profileimage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80",
    rating: 5
  },
  {
    _id: "2",
    name: "Anjali Gupta",
    content: "I tried the one-time cook service for a party, and it was flawless. The guests loved the food, and the kitchen was left spotless.",
    profileimage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 5
  },
  {
    _id: "3",
    name: "Rohan Mehta",
    content: "Finally, a service that solves the daily 'kya banega' problem. The subscription is affordable and worth every penny.",
    profileimage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    rating: 4
  },
  {
    _id: "4",
    name: "Sneha Reddy",
    content: "The app is very user-friendly, and the customer support is responsive. My cook, Raju, is excellent at North Indian dishes.",
    profileimage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
    rating: 5
  }
];

const Testimonial1 = () => {
  const [testimonialsData, setTestimonialsData] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await api.get("/testimonials/geta/ll");
        if (response.data && response.data.data && response.data.data.length > 0) {
          setTestimonialsData(response.data.data);
        } else {
          setTestimonialsData(FALLBACK_TESTIMONIALS);
        }
      } catch (error) {
        console.warn("API unavailable, using fallback data.");
        setTestimonialsData(FALLBACK_TESTIMONIALS);
      }
    };

    fetchTestimonials();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768, // Fixed breakpoint for responsiveness
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const renderStars = (count = 5) => (
    <div className="flex gap-1 text-yellow-400 mb-4 justify-center">
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} className={i < count ? "text-yellow-400" : "text-gray-300"} />
      ))}
    </div>
  );

  return (
    <section className="bg-orange-50/20 py-20 font-sans overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-orange-600 font-bold tracking-widest uppercase text-sm">
              Community Love
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">
              Don’t take our <span className="text-orange-600">word</span> for it.
            </h1>
          </motion.div>
        </div>

        {/* Slider */}
        <div className="pb-12">
          <Slider {...settings}>
            {testimonialsData.map((testimonial, index) => (
              <div key={testimonial._id || index} className="px-4 py-4 h-full">
                <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-orange-200 transition-all duration-300 h-full flex flex-col items-center text-center group relative">

                  {/* Decorative Quote Icon */}
                  <div className="absolute top-4 left-6 text-orange-100 text-6xl opacity-50 font-serif">
                    <FaQuoteLeft />
                  </div>

                  {/* Profile Image */}
                  <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-br from-orange-400 to-red-500 mb-4 relative z-10">
                    {testimonial.profileimage ? (
                      <img
                        alt={testimonial.name}
                        className="w-full h-full object-cover rounded-full border-2 border-white"
                        src={testimonial.profileimage}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-gray-400">
                        <FaUserCircle size={40} />
                      </div>
                    )}
                  </div>

                  {/* Stars */}
                  {renderStars(testimonial.rating || 5)}

                  {/* Review Text */}
                  <p className="leading-relaxed text-gray-600 mb-6 italic relative z-10 flex-grow">
                    "{testimonial.content}"
                  </p>

                  {/* Divider */}
                  <div className="w-12 h-1 bg-orange-200 rounded-full mb-4 group-hover:bg-orange-500 transition-colors"></div>

                  {/* Name */}
                  <h2 className="text-gray-900 font-bold text-lg tracking-wide">
                    {testimonial.name}
                  </h2>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                    Happy Customer
                  </p>

                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Testimonial1;
