import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import api from "../../services/api";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar, FaUserCircle } from "react-icons/fa";

// Slick CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Fallback data in case API fails or is offline
const FALLBACK_TESTIMONIALS = [
  {
    _id: "1",
    name: "Aditi Sharma",
    content: "I was skeptical at first, but the One-Time Cook service is a lifesaver! The cook was professional, hygienic, and the food tasted exactly like 'Ghar ka Khaana'.",
    profileimage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 5
  },
  {
    _id: "2",
    name: "Rahul Verma",
    content: "ChefKart has completely changed how I manage my weekends. No more cooking stress. The subscription model is affordable and the cooks are very well trained.",
    profileimage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5
  },
  {
    _id: "3",
    name: "Priya Singh",
    content: "The best part is the hygiene. They clean up everything after cooking! The app is super easy to use and customer support is very responsive.",
    profileimage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    rating: 4
  },
  {
    _id: "4",
    name: "Vikram Malhotra",
    content: "Finally, a service that understands the taste of North Indian food. My cook makes the best Dal Makhani. Highly recommended for bachelors!",
    profileimage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    rating: 5
  }
];

const Testimonials = () => {
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await api.get("/testimonials/all");
        if (response.data && response.data.data && response.data.data.length > 0) {
          setTestimonialsData(response.data.data);
        } else {
          setTestimonialsData(FALLBACK_TESTIMONIALS);
        }
      } catch (error) {
        console.warn("API unavailable, using fallback data");
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
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  // Helper to render stars
  const renderStars = (count = 5) => {
    return (
      <div className="flex gap-1 text-yellow-400 mb-4 justify-center">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className={i < count ? "text-yellow-400" : "text-gray-300"} />
        ))}
      </div>
    );
  };

  return (
    <section className="bg-orange-50/30 py-20 font-sans overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-orange-600 font-bold tracking-widest uppercase text-sm">
              Social Proof
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-2">
              Don’t just take <span className="text-orange-600">our word</span> for it.
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Join thousands of happy households who have switched to a smarter way of eating.
            </p>
          </motion.div>
        </div>

        {/* Carousel */}
        <div className="pb-10">
          <Slider {...settings}>
            {testimonialsData.map((testimonial, index) => (
              <div key={testimonial._id || index} className="px-4 py-4 h-full">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 h-full flex flex-col items-center text-center relative group">

                  {/* Quote Icon */}
                  <FaQuoteLeft className="text-4xl text-orange-100 mb-6 group-hover:text-orange-200 transition-colors" />

                  {/* Rating */}
                  {renderStars(testimonial.rating || 5)}

                  {/* Content */}
                  <p className="text-gray-600 leading-relaxed italic mb-8 flex-grow">
                    "{testimonial.content}"
                  </p>

                  {/* Divider */}
                  <div className="w-16 h-1 bg-orange-100 rounded-full mb-6 group-hover:bg-orange-500 transition-colors"></div>

                  {/* User Profile */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-br from-orange-400 to-red-500 mb-3">
                      {testimonial.profileimage ? (
                        <img
                          src={testimonial.profileimage}
                          alt={testimonial.name}
                          className="w-full h-full object-cover rounded-full border-2 border-white"
                          onError={(e) => { e.target.style.display = 'none' }} // Hide if broken
                        />
                      ) : (
                        <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-gray-400">
                          <FaUserCircle size={30} />
                        </div>
                      )}
                    </div>

                    <h3 className="font-bold text-gray-900 text-lg">
                      {testimonial.name}
                    </h3>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">
                      Verified Customer
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;