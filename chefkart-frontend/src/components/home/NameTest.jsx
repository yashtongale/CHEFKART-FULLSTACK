import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaQuoteLeft, FaPause } from "react-icons/fa";

const Testimonial1 = () => {
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
    <section className="bg-white py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-5 max-w-7xl">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Don’t Just Take <span className="text-orange-500">Our Word</span> For It!
          </h2>
          <div className="h-1 w-24 bg-orange-500 rounded mx-auto mt-4"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* --- Left Side: Text Content --- */}
          <motion.div
            className="lg:w-1/2 text-center lg:text-left relative z-10"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <FaQuoteLeft className="text-6xl text-orange-100 absolute -top-10 -left-6 -z-10 hidden lg:block" />

            <p className="text-2xl md:text-4xl font-medium text-gray-800 leading-tight mb-8 italic">
              “Everyone was amazed by the kind of party we threw, and the <span className="text-orange-500 font-bold decoration-orange-200 underline decoration-4 underline-offset-4">food was the talk of the party!</span>”
            </p>

            <div className="flex flex-col items-center lg:items-start">
              <h4 className="text-xl font-bold text-gray-900">Kavita</h4>
              <p className="text-gray-500 text-sm">Happy Customer</p>

              {/* Star Rating */}
              <div className="flex text-yellow-400 gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                ))}
              </div>
            </div>
          </motion.div>

          {/* --- Right Side: Video Player --- */}
          <motion.div
            className="lg:w-1/2 w-full relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Decorative Background Blob */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-orange-100 rounded-full blur-3xl -z-10 opacity-70"></div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
              <video
                ref={videoRef}
                src="https://chefkart-strapi-media.s3.ap-south-1.amazonaws.com/27389f2b_393b_42a7_bab8_7f0dc6ce3736_ca22a40ab0.mov"
                className="w-full h-auto object-cover"
                // Removing default controls initially to use our custom button
                controls={isPlaying}
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
              />

              {/* Custom Play Overlay (Only visible when paused) */}
              {!isPlaying && (
                <div
                  className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer transition-colors hover:bg-black/40"
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
                    Watch Story
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

export default Testimonial1;