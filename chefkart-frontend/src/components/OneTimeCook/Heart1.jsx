import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaQuoteLeft, FaUserCircle } from 'react-icons/fa';

const Heart = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="bg-white py-20 overflow-hidden relative">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900"
          >
            Let's hear it from our <span className="text-orange-600">Customers</span>
          </motion.h2>
          <div className="h-1 w-20 bg-orange-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">

          {/* --- Left Side: Quote --- */}
          <motion.div
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <FaQuoteLeft className="text-6xl text-orange-100 absolute -top-10 -left-4 z-0" />

            <div className="relative z-10">
              <h3 className="text-2xl md:text-4xl font-medium text-gray-800 leading-snug italic mb-8">
                "This is a much-required service that is <span className="text-orange-600 font-bold underline decoration-orange-200 decoration-4 underline-offset-4">convenient</span> and more affordable than ordering online."
              </h3>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-3xl">
                  <FaUserCircle />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">Rishi</p>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Satisfied User</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- Right Side: Video --- */}
          <motion.div
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-orange-100 rounded-full blur-3xl -z-10 opacity-60"></div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
              <video
                ref={videoRef}
                className="w-full h-auto object-cover aspect-video"
                src="https://chefkart-strapi-media.s3.ap-south-1.amazonaws.com/testemonial_0f93413c4a.mp4"
                controls={isPlaying} // Show controls only when playing
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
              />

              {/* Custom Play Overlay */}
              {!isPlaying && (
                <div
                  className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer hover:bg-black/40 transition-colors"
                  onClick={togglePlay}
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-20 h-20 bg-white text-orange-600 rounded-full flex items-center justify-center shadow-lg pl-2 hover:text-orange-700 transition-colors"
                  >
                    <FaPlay className="text-3xl" />
                  </motion.button>
                  <p className="absolute bottom-6 text-white font-semibold tracking-wider text-sm bg-black/50 px-4 py-1 rounded-full backdrop-blur-sm">
                    Watch Rishi's Story
                  </p>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Heart;