import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaUsers, FaCheckCircle, FaArrowRight } from "react-icons/fa";

// Fallback data to ensure the UI looks good even without the backend running
const FALLBACK_DATA = [
  {
    category: "For Singles",
    title: "Delicious Meals for One",
    content: "No more ordering unhealthy takeout. Get fresh, home-cooked meals prepared right in your kitchen, tailored to your taste and portion size.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    features: ["Perfect Portion Control", "Cost-Effective", "Healthy & Hygienic"]
  },
  {
    category: "For Families",
    title: "Wholesome Feasts for the Family",
    content: "Spend quality time with your loved ones while our cooks take care of the kitchen. Nutritious, multi-course meals that everyone will love.",
    image: "https://media.istockphoto.com/id/1167975360/photo/latin-multi-generation-family-having-feast-on-sunday-lunch.webp?a=1&b=1&s=612x612&w=0&k=20&c=CN4-nXojYW1TUgXH8xFITenYt_iIb8HPYg_pb8RNJMk=",
    features: ["Kid-Friendly Menus", "Diverse Cuisines", "Time-Saving"]
  }
];

const TabSwitchComponent = () => {
  const [activeTab, setActiveTab] = useState("For Singles");
  const [data, setData] = useState(FALLBACK_DATA);
  const [loading, setLoading] = useState(false);

  // Fetch logic with fallback
  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      try {
        const response = await api.get("https://chefkart-fullstack-03.onrender.com//home-page/all");
        if (response.data && response.data.data && response.data.data.length > 0) {
          setData(response.data.data);
        }
      } catch (error) {
        console.warn("Backend not found, using fallback data.");
        // We stick with FALLBACK_DATA
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const activeContent = data.find((item) => item.category === activeTab) || FALLBACK_DATA[0];

  return (
    <section className="bg-white py-20 overflow-hidden">
      <div className="container mx-auto px-5 max-w-6xl">

        {/* --- Header --- */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Healthy food cooked in <span className="text-orange-500">your kitchen</span>,<br className="hidden md:block" />
            whenever you want!
          </h1>
          <p className="text-gray-500 text-lg">Select a plan that fits your household size.</p>
        </div>

        {/* --- Tab Switcher (Segmented Control) --- */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1.5 rounded-full inline-flex relative">
            {/* Sliding Background Pill */}
            <motion.div
              className="absolute top-1.5 bottom-1.5 bg-white rounded-full shadow-md z-0"
              initial={false}
              animate={{
                left: activeTab === "For Singles" ? "6px" : "50%",
                width: activeTab === "For Singles" ? "calc(50% - 8px)" : "calc(50% - 6px)",
                x: activeTab === "For Singles" ? 0 : 0
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            {/* Buttons */}
            {["For Singles", "For Families"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative z-10 flex items-center gap-2 px-8 py-3 rounded-full text-lg font-bold transition-colors duration-200 ${activeTab === tab ? "text-orange-600" : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                {tab === "For Singles" ? <FaUser className="text-sm" /> : <FaUsers className="text-sm" />}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* --- Content Area --- */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab} // Key changes trigger the animation
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
            >

              {/* Image Side */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute inset-0 bg-orange-200 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
                <img
                  src={activeContent.image || FALLBACK_DATA[0].image}
                  alt={activeContent.title}
                  className="relative rounded-3xl shadow-2xl w-full h-[400px] object-cover border-4 border-white transform transition-transform duration-500 group-hover:-translate-y-2"
                />
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {activeContent.title}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {activeContent.content}
                </p>

                {/* Features List (Added for visual interest) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {(activeContent.features || FALLBACK_DATA[0].features).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-orange-50 p-3 rounded-lg">
                      <FaCheckCircle className="text-orange-500 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors shadow-lg">
                  Get Started <FaArrowRight />
                </button>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default TabSwitchComponent;
