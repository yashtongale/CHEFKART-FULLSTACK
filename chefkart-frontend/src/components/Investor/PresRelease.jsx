import React from "react";
import { motion } from "framer-motion";
import { FaNewspaper, FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";

const PressReleases = () => {
  const releases = [
    {
      id: 1,
      date: "January 26, 2023",
      source: "Economic Times",
      title: "ChefKart raises $2 million in funding led by Blume Ventures, Pravega Ventures",
      link: "#"
    },
    {
      id: 2,
      date: "January 24, 2023",
      source: "YourStory",
      title: "ChefKart launches Chefit: A revolutionary one-time cooking service for urban India",
      link: "#"
    },
    {
      id: 3,
      date: "December 10, 2022",
      source: "Inc42",
      title: "How ChefKart is organizing the unorganized home cooking sector in India",
      link: "#"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-full -mr-32 -mt-32 z-0"></div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <span className="inline-flex items-center gap-2 text-orange-600 font-bold tracking-widest uppercase text-xs mb-2">
              <FaNewspaper /> In the News
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Press Releases
            </h2>
          </div>

          <button className="hidden md:flex items-center gap-2 text-gray-500 hover:text-orange-600 font-semibold transition-colors">
            View Media Kit <FaArrowRight />
          </button>
        </div>

        {/* Press Grid */}
        <div className="space-y-6">
          {releases.map((release, index) => (
            <motion.a
              key={release.id}
              href={release.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group block bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:border-orange-500 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
            >
              {/* Hover Indicator Bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom"></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 text-sm mb-3">
                    <span className="font-bold text-gray-400 uppercase tracking-wider text-xs">
                      {release.date}
                    </span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="text-orange-600 font-semibold">
                      {release.source}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors leading-snug">
                    {release.title}
                  </h3>
                </div>

                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                    <FaExternalLinkAlt size={14} />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <button className="text-orange-600 font-bold flex items-center justify-center gap-2 mx-auto">
            View Media Kit <FaArrowRight />
          </button>
        </div>

      </div>
    </section>
  );
};

export default PressReleases;