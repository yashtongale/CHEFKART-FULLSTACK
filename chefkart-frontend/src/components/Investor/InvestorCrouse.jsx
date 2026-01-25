import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';

const InvestorsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const investors = [
    {
      id: 1,
      name: 'Deepinder Goyal',
      title: 'Founder & CEO, Zomato',
      description: 'Deepinder Goyal is the founder and CEO of Zomato, one of the largest food tech companies in India. As an investor of Chefkart, Goyal is backing a promising idea to offer authentic and affordable meals prepared in the comfort of one\'s home. His investment is a testament to the potential of Chefkart.',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80' // Placeholder professional shot
    },
    {
      id: 2,
      name: 'Titan Capital',
      title: 'Venture Capital Firm',
      description: 'Titan Capital is not just a fund but an ecosystem for entrepreneur support. Mentored by Kunal and Rohit, they have seen all imaginable ups and downs of running and scaling a company, providing invaluable guidance to ChefKart.',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      name: 'Praxis Global Alliance',
      title: 'Growth Partners',
      description: 'Bringing deep domain expertise and a network of industry leaders to help ChefKart scale its operations across tier-1 cities in India.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + investors.length) % investors.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % investors.length);
  };

  return (
    <section className="bg-white py-16 md:py-24 font-sans overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Backed by <span className="text-orange-600">Visionaries</span>
          </h2>
          <div className="h-1 w-20 bg-orange-600 mx-auto rounded-full"></div>
        </div>

        {/* Carousel Content */}
        <div className="relative bg-orange-50/50 rounded-[3rem] p-8 md:p-12 lg:p-16">

          {/* Large Quote Icon Background */}
          <FaQuoteLeft className="absolute top-10 left-10 text-orange-200 text-8xl md:text-9xl opacity-40 -z-10" />

          <div className="flex flex-col-reverse md:flex-row items-center gap-12">

            {/* Text Side */}
            <div className="w-full md:w-1/2 relative z-10">
              <AnimatePresence mode='wait'>
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {investors[currentSlide].name}
                  </h3>
                  <p className="text-orange-600 font-bold text-lg uppercase tracking-wide mb-6">
                    {investors[currentSlide].title}
                  </p>
                  <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-10">
                    "{investors[currentSlide].description}"
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons (Moved here for better UX) */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all duration-300"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all duration-300"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>

            {/* Image Side */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <AnimatePresence mode='wait'>
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  {/* Image Frame */}
                  <div className="relative w-72 h-72 md:w-96 md:h-96">
                    <div className="absolute inset-0 bg-orange-200 rounded-[2rem] transform rotate-6 translate-x-4 translate-y-4"></div>
                    <img
                      src={investors[currentSlide].image}
                      alt={investors[currentSlide].name}
                      className="relative w-full h-full object-cover rounded-[2rem] shadow-2xl border-4 border-white"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorsCarousel;