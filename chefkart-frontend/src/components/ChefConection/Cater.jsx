import React, { useEffect, useState } from 'react';
import api from "../../services/api";
import { motion } from 'framer-motion';

const Cater = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // defined as an async function for cleaner syntax
    const fetchData = async () => {
      try {
        const res = await api.get("/join/all");
        const result = res.data.data || res.data || [];
        setData(result);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError("Failed to load content.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Show a skeleton loader while waiting for data
  if (loading) return <SkeletonLoader />;

  // Simple error display
  if (error) return <div className="text-center py-20 text-red-500 font-bold">{error}</div>;

  return (
    <section className="text-gray-600 body-font bg-gray-50">
      <div className="container px-5 py-24 mx-auto">

        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="sm:text-5xl text-4xl font-extrabold text-gray-900 mb-4">
            ChefKart से क्यूँ जुड़ें?
          </h1>
          {/* Decorative underline */}
          <div className="h-1 w-24 bg-orange-500 rounded mx-auto"></div>
        </motion.div>

        {/* Cards Container */}
        <div className="flex flex-wrap -m-4">
          {data.map((item, index) => (
            <motion.div
              key={item._id || index}
              className="p-4 md:w-1/3 w-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered animation
            >
              <div className="h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2">

                {/* Image Wrapper for Hover Zoom Effect */}
                <div className="relative h-56 overflow-hidden group">
                  <img
                    className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />
                  {/* Subtle dark overlay for better contrast if needed */}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col items-center text-center">
                  <h2 className="title-font font-bold text-gray-900 text-2xl mb-4">
                    {item.title}
                  </h2>
                  <p className="leading-relaxed text-gray-600 text-base">
                    {item.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// A reusable Skeleton Loader sub-component for better UX
const SkeletonLoader = () => (
  <div className="container px-5 py-24 mx-auto">
    <div className="h-12 w-64 bg-gray-200 rounded mx-auto mb-16 animate-pulse" />
    <div className="flex flex-wrap -m-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-4 md:w-1/3 w-full">
          <div className="h-96 bg-gray-100 rounded-2xl animate-pulse"></div>
        </div>
      ))}
    </div>
  </div>
);

export default Cater;