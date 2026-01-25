import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

// Slick CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Sample Data (Used if API fails)
const FALLBACK_TESTIMONIALS = [
  {
    _id: "1",
    name: "Aditi Rao",
    profileimage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    content: "The best decision I made for my family's health. The cook is professional, hygiene is top-notch, and the food tastes just like my mom's cooking!",
  },
  {
    _id: "2",
    name: "Rahul Deshmukh",
    profileimage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    content: "ChefKart has completely sorted my dinner scenes. No more ordering unhealthy takeout. The 'Cook for a Month' plan is a lifesaver.",
  },
  {
    _id: "3",
    name: "Sneha Kapoor",
    profileimage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    content: "We hired a chef for a house party, and the guests were blown away. The live pasta counter was a hit! Highly recommended.",
  },
  {
    _id: "4",
    name: "Vikram Singh",
    profileimage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    content: "Professional, punctual, and polite. Finding a reliable cook in Pune was a nightmare until I found ChefKart.",
  },
];

const Testimonials = () => {
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("http://localhost:8000/testimonial/get");
        if (response.data && response.data.data && response.data.data.length > 0) {
          setTestimonialsData(response.data.data);
        } else {
          setTestimonialsData(FALLBACK_TESTIMONIALS);
        }
      } catch (error) {
        console.warn("Using fallback testimonials due to API error.");
        setTestimonialsData(FALLBACK_TESTIMONIALS);
      } finally {
        setLoading(false);
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
    arrows: false, // Cleaner look without side arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="py-24 bg-gradient-to-b from-white to-orange-50 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
          >
            Pune <span className="text-orange-500">Loves Us</span>
          </motion.h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Join thousands of happy households who have transformed their daily meals with ChefKart.
          </p>
        </div>

        {/* Slider */}
        <Slider {...settings} className="testimonial-slider pb-10">
          {testimonialsData.map((testimonial, index) => (
            <div key={testimonial._id} className="px-4 py-4 h-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative border border-gray-100 h-full flex flex-col items-center text-center"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 left-6 text-orange-100">
                  <FaQuoteLeft className="text-5xl" />
                </div>

                {/* Profile Image */}
                <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-orange-400 to-yellow-300 mb-6 relative z-10 shadow-md">
                  <img
                    alt={testimonial.name}
                    className="w-full h-full object-cover rounded-full border-4 border-white bg-gray-100"
                    src={testimonial.profileimage}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 flex-grow">
                  {/* Star Rating */}
                  <div className="flex justify-center gap-1 text-yellow-400 mb-4 text-sm">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} />
                    ))}
                  </div>

                  <p className="text-gray-600 italic mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </div>

                {/* Footer Info */}
                <div className="mt-auto pt-6 border-t border-gray-100 w-full">
                  <h2 className="text-lg font-bold text-gray-900">
                    {testimonial.name}
                  </h2>
                  <span className="text-sm text-orange-500 font-bold uppercase tracking-wider">
                    Verified Customer
                  </span>
                </div>

              </motion.div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;