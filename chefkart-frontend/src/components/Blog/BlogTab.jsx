import React, { useEffect, useState, useMemo } from "react";
import api from "../../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCalendarAlt, FaClock } from "react-icons/fa";

const BlogTab = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("All");

    // Modal State
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 1. Fetch Data on Mount
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await api.get("/blogs/all");
                if (response.data && response.data.data) {
                    setBlogs(response.data.data);
                } else {
                    setBlogs(response.data);
                }
            } catch (err) {
                setError("Failed to load stories. Please try again later.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    // 2. Compute Categories (Memoized) - Automatically adds "All"
    const categories = useMemo(() => {
        const cats = ["All", ...new Set(blogs.map((blog) => blog.category))];
        return cats;
    }, [blogs]);

    // 3. Filter Data (Memoized)
    const filteredBlogs = useMemo(() => {
        if (activeTab === "All") return blogs;
        return blogs.filter((blog) => blog.category === activeTab);
    }, [activeTab, blogs]);

    // 4. Handle Card Click
    const openModal = async (blog) => {
        // Optimistic UI: Show what we have immediately
        setSelectedBlog(blog);
        setIsModalOpen(true);

        // If you need full details that aren't in the list, fetch them here silently
        // and update `selectedBlog` when data arrives.
        try {
            const res = await api.get(`/blogs/${blog._id}`);
            if (res.data && res.data.data) {
                setSelectedBlog(res.data.data);
            } else {
                setSelectedBlog(res.data);
            }
        } catch (e) {
            console.error("Background fetch failed", e);
        }
    };

    // --- Render Loading State (Skeleton) ---
    if (loading) return <SkeletonLoader />;

    // --- Render Error State ---
    if (error) return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-gray-800">Oops!</h3>
            <p className="text-gray-600">{error}</p>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto">

            {/* --- Tab Navigation --- */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveTab(category)}
                        className={`
              relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300
              ${activeTab === category ? "text-white" : "text-gray-600 hover:bg-gray-100"}
            `}
                    >
                        {/* Animated Background Pill */}
                        {activeTab === category && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-purple-600 rounded-full"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        )}
                        {/* Text (z-index to sit on top of the pill) */}
                        <span className="relative z-10">{category}</span>
                    </button>
                ))}
            </div>

            {/* --- Blog Grid with Layout Animation --- */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
                <AnimatePresence>
                    {filteredBlogs.map((blog) => (
                        <motion.article
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            key={blog._id}
                            onClick={() => openModal(blog)}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden group border border-gray-100"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={blog.image || "https://via.placeholder.com/400x300"} // Fallback image
                                    alt={blog.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    loading="lazy"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-purple-700">
                                    {blog.category}
                                </div>
                            </div>

                            <div className="p-5">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                                    {blog.title}
                                </h3>
                                <p className="text-gray-500 text-sm line-clamp-3 mb-4">
                                    {blog.content}
                                </p>

                                <div className="flex items-center justify-between text-xs text-gray-400 border-t pt-4">
                                    <div className="flex items-center gap-1">
                                        <FaCalendarAlt />
                                        {new Date(blog.updatedAt).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaClock />
                                        3 min read
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* --- Modern Modal --- */}
            <AnimatePresence>
                {isModalOpen && selectedBlog && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full transition-colors z-10"
                            >
                                <FaTimes size={20} />
                            </button>

                            <img
                                src={selectedBlog.image}
                                alt={selectedBlog.title}
                                className="w-full h-64 md:h-80 object-cover"
                            />

                            <div className="p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                                        {selectedBlog.category}
                                    </span>
                                    <span className="text-gray-500 text-sm">
                                        {new Date(selectedBlog.updatedAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
                                    </span>
                                </div>

                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                    {selectedBlog.title}
                                </h2>

                                <div className="prose prose-purple max-w-none text-gray-700 leading-relaxed">
                                    {/* Assuming content is plain text. If HTML, use dangerouslySetInnerHTML safely */}
                                    {selectedBlog.content}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Simple Skeleton Component for smoother loading
const SkeletonLoader = () => (
    <div className="max-w-7xl mx-auto mt-10">
        <div className="flex justify-center gap-4 mb-10">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 w-24 bg-gray-200 rounded-full animate-pulse" />
            ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl h-80 shadow-sm border border-gray-100 p-4">
                    <div className="h-40 bg-gray-200 rounded-xl mb-4 animate-pulse" />
                    <div className="h-6 w-3/4 bg-gray-200 rounded mb-2 animate-pulse" />
                    <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                </div>
            ))}
        </div>
    </div>
);

export default BlogTab;