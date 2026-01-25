import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonial1 = () => {
  const [testimonialsData, setTestimonialsData] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("http://localhost:8000/testimonial/get");
        if (response.data && response.data.data) {
          setTestimonialsData(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
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

  return (
    <div className="py-20 bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 font-outfit"
        >
          Pune <span className="text-primary">Loves Us</span>
        </motion.h1>

        <Slider {...settings} className="testimonial-slider">
          {testimonialsData.map((testimonial, index) => (
            <div key={testimonial._id} className="px-4 py-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 relative border border-gray-100 h-full"
              >
                <FaQuoteLeft className="text-4xl text-orange-200 absolute top-6 left-6" />

                <div className="flex flex-col items-center text-center mt-4">
                  <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-r from-primary to-orange-300 mb-6">
                    <img
                      alt={testimonial.name}
                      className="w-full h-full object-cover rounded-full border-4 border-white"
                      src={testimonial.profileimage}
                    />
                  </div>

                  <p className="text-gray-600 italic mb-6 leading-relaxed relative z-10">
                    "{testimonial.content}"
                  </p>

                  <div className="mt-auto">
                    <h2 className="text-xl font-bold text-secondary font-outfit">
                      {testimonial.name}
                    </h2>
                    <span className="text-sm text-primary font-medium">Happy Customer</span>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonial1;
