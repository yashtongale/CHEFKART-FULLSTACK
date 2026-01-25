import React from "react";
import { motion } from "framer-motion";
import { FaApple, FaGooglePlay, FaQrcode } from "react-icons/fa";

const TakeItForward = () => {
  return (
    <section className="bg-gradient-to-br from-gray-900 to-black py-20 overflow-hidden relative">

      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* --- Left Side: Phone Mockup (Video) --- */}
          <motion.div
            className="w-full lg:w-1/2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* The "Phone" Container */}
            <div className="relative border-gray-800 bg-gray-900 border-[8px] rounded-[2.5rem] h-[500px] w-[280px] shadow-2xl flex flex-col items-center justify-center overflow-hidden ring-1 ring-white/20">

              {/* Top Notch/Speaker */}
              <div className="absolute top-0 w-[120px] h-[25px] bg-black rounded-b-xl z-20"></div>

              {/* Video Screen */}
              <div className="h-full w-full rounded-[2rem] overflow-hidden bg-black relative">
                <video
                  src="https://chefkart-strapi-media.s3.ap-south-1.amazonaws.com/mobile_video_be902dfffb.mp4?updated_at=2024-01-16T05:07:06.659Z"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                ></video>

                {/* Gradient Overlay on Video */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>

                {/* App UI Elements (Fake) */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 border border-white/30">
                    <div className="h-2 w-12 bg-white/50 rounded mb-2"></div>
                    <div className="h-2 w-20 bg-white/30 rounded"></div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* --- Right Side: Content --- */}
          <motion.div
            className="w-full lg:w-1/2 text-center lg:text-left text-white"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Let's take it <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">forward.</span>
            </h2>

            <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed">
              This is as easy as it gets! Professional cooks are just a click away.
              Download the app now to experience the future of home cooking.
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-6">

              {/* Buttons Column */}
              <div className="flex flex-col gap-4 w-full sm:w-auto">
                {/* App Store */}
                <button className="flex items-center bg-white text-black px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors w-full sm:w-48 shadow-lg group">
                  <FaApple className="text-3xl mr-3" />
                  <div className="text-left">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">Download on the</p>
                    <p className="text-xl font-bold font-sans">App Store</p>
                  </div>
                </button>

                {/* Google Play */}
                <button className="flex items-center bg-transparent border border-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-800 hover:border-gray-500 transition-all w-full sm:w-48 group">
                  <FaGooglePlay className="text-2xl mr-3 text-green-400" />
                  <div className="text-left">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Get it on</p>
                    <p className="text-xl font-bold font-sans">Google Play</p>
                  </div>
                </button>
              </div>

              {/* QR Code Section (Visible on large screens) */}
              <div className="hidden sm:flex flex-col items-center bg-white p-4 rounded-xl shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <FaQrcode className="text-6xl text-gray-900 mb-2" />
                <p className="text-xs text-gray-500 font-bold text-center">Scan to<br />Download</p>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default TakeItForward;