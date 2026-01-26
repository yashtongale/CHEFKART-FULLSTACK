import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import api from "../../../../services/api";
import { motion } from "framer-motion";
import { FaLinkedinIn, FaHandshake } from "react-icons/fa";

// Slick CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Fallback data for development/demo
const FALLBACK_INVESTORS = [
  {
    _id: "1",
    title: "Venture Catalysts",
    subtitle: "Lead Investor",
    description: "India's first integrated incubator. Supporting our vision since Day 1.",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&q=80",
  },
  {
    _id: "2",
    title: "Titan Capital",
    subtitle: "Seed Round",
    description: "Empowering startups to solve real-world problems with technology.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
  },
  {
    _id: "3",
    title: "Better Capital",
    subtitle: "Strategic Partner",
    description: "Helping us scale operations across multiple tier-1 cities.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=300&q=80",
  },
  {
    _id: "4",
    title: "Angel Network",
    subtitle: "Early Backers",
    description: "A group of industry veterans believing in the future of home cooking.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=300&q=80",
  }
];

const Investors = () => {
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        const res = await api.get("/investors/all");
        const data = res.data.data || res.data || [];
        if (data.length > 0) {
          setInvestors(data);
        } else {
          setInvestors(FALLBACK_INVESTORS);
        }
      } catch (err) {
        console.warn("Investor API failed, using fallback data.");
        setInvestors(FALLBACK_INVESTORS);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestors();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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
    <section className="bg-white py-20 border-t border-gray-100 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase mb-4">
              <FaHandshake /> Our Backers
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Trusted by the <span className="text-blue-600">Best</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              We are backed by some of the most visionary investors and capital firms in the industry.
            </p>
          </motion.div>
        </div>

        {/* Carousel */}
        <div className="pb-10">
          <Slider {...settings}>
            {investors.map((item, index) => (
              <div key={item._id || index} className="px-4 py-4 h-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center text-center relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                  <div className="w-32 h-32 mb-6 relative">
                    <div className="absolute inset-0 bg-blue-100 rounded-full transform rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-md filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                    <div className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md text-blue-600 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <FaLinkedinIn size={14} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-4">
                    {item.subtitle}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Investors;