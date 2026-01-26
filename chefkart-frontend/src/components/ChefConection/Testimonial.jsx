import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import api from "../../services/api";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

// Import Slick CSS (Crucial!)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await api.get("/testimonials/all");
        // Handle different API response structures safely
        const data = response.data.data || response.data || [];
        setTestimonials(data);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
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
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
    // Custom Dots styling
    appendDots: (dots) => (
      <div style={{ bottom: "-40px" }}>
        <ul className="flex justify-center gap-2"> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="w-3 h-3 bg-gray-300 rounded-full hover:bg-orange-500 transition-colors"></div>
    ),
  };

  // --- Loading State ---
  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
        <p className="mt-4 text-gray-500">Loading stories...</p>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-5 max-w-7xl">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Don’t take our word for it
          </h1>
          <p className="text-gray-500 text-lg">
            Hear from the people who make ChefKart special.
          </p>
          <div className="h-1 w-24 bg-orange-500 rounded mx-auto mt-6"></div>
        </div>

        {/* Slider */}
        {testimonials.length > 0 ? (
          <Slider {...settings}>
            {testimonials.map((item) => (
              <div key={item._id} className="px-4 pt-10 pb-10">
                <div className="bg-white rounded-2xl shadow-lg p-8 relative hover:shadow-2xl transition-shadow duration-300 border border-gray-100 h-full flex flex-col items-center text-center group">

                  {/* Floating Profile Image */}
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full p-1 bg-white shadow-md">
                    <img
                      src={item.profileimage || "https://via.placeholder.com/150"}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  {/* Quote Icon Background */}
                  <FaQuoteLeft className="text-6xl text-gray-100 absolute top-10 left-6 -z-0 opacity-50" />

                  {/* Content */}
                  <div className="mt-10 relative z-10">
                    <div className="flex justify-center gap-1 text-yellow-400 mb-4 text-sm">
                      {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                    </div>

                    <p className="text-gray-600 leading-relaxed italic mb-6">
                      "{item.content}"
                    </p>

                    <h2 className="text-gray-900 font-bold text-lg uppercase tracking-wide group-hover:text-orange-500 transition-colors">
                      {item.name}
                    </h2>
                    <span className="text-xs text-gray-400 font-medium">Verified Partner</span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="text-center text-gray-500">No testimonials found.</div>
        )}
      </div>
    </section>
  );
};

export default Testimonial;