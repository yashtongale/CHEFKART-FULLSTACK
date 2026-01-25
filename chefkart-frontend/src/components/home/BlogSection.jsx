import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaClock, FaTag } from "react-icons/fa";
import { Link } from "react-router-dom"; // Assuming you have routing set up

// Sample Data (Easy to update later)
const BLOG_POSTS = [
  {
    id: 1,
    title: "6 things to keep in mind when hiring a cook for home",
    category: "Hiring Guide",
    readTime: "5 min read",
    image: "/generated-chef-cooking.png", // Ensure this image exists in your public folder
    link: "/blog/hiring-guide"
  },
  {
    id: 2,
    title: "Why authentic regional food tastes better at home",
    category: "Lifestyle",
    readTime: "4 min read",
    // Using a placeholder for the second image to show variety
    image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=1000",
    link: "/blog/regional-food"
  }
];

const BlogSection = () => {
  return (
    <section className="bg-white py-20 border-t border-gray-100">
      <div className="container mx-auto px-5 max-w-7xl">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h5 className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-2">
            Our Blog
          </h5>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight max-w-3xl mx-auto">
            Cuisines worth travelling, now at your fingertips.
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {BLOG_POSTS.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Background Image with Zoom Effect */}
              <div className="absolute inset-0 bg-black">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-70 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

              {/* Content Positioned at Bottom */}
              <div className="absolute bottom-0 left-0 p-8 w-full">

                {/* Meta Tags */}
                <div className="flex items-center gap-4 mb-3 text-sm font-medium">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full flex items-center gap-1">
                    <FaTag size={10} /> {post.category}
                  </span>
                  <span className="text-gray-300 flex items-center gap-1">
                    <FaClock size={12} /> {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-white text-2xl md:text-3xl font-bold leading-snug mb-2 group-hover:text-orange-200 transition-colors">
                  {post.title}
                </h3>

                {/* "Read More" Arrow (Appears on Hover) */}
                <div className="h-0 overflow-hidden group-hover:h-8 transition-all duration-300">
                  <span className="text-white flex items-center gap-2 mt-2 font-semibold">
                    Read Article <FaArrowRight />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link to="/blog">
            <button className="group bg-gray-900 text-white text-lg font-bold py-3 px-8 rounded-full shadow-lg hover:bg-orange-500 transition-all duration-300 flex items-center gap-2 mx-auto">
              View All Blogs
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default BlogSection;