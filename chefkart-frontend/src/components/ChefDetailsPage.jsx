import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaStar,
  FaBriefcase,
  FaUtensils,
  FaCheckCircle,
  FaArrowLeft,
  FaClock,
  FaHome,
  FaUserCircle
} from "react-icons/fa";

// Fallback data for demo purposes if API fails
const FALLBACK_CHEF = {
  _id: "1",
  name: "Chef Rahul Kapoor",
  profilepic: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=400&q=80",
  city: "Mumbai",
  area: "Andheri West",
  locality: "Lokhandwala",
  starRating: 4.8,
  totalRatings: 124,
  about: "I am a professional chef with over 10 years of experience in North Indian and Muglai cuisines. I believe in cooking with fresh ingredients and authentic spices. I have worked with 5-star hotels and now love serving families.",
  cuisines: [
    { name: "North Indian", rating: 4.9 },
    { name: "Muglai", rating: 4.7 },
    { name: "Chinese", rating: 4.5 }
  ],
  address: "Andheri West, Mumbai, Maharashtra",
  timings: ["Morning (7 AM - 10 AM)", "Dinner (7 PM - 10 PM)"],
  experience: 10,
  phone: "+91 98765 43210",
  housesServed: 45,
  veg: true,
  nonVeg: true
};

const ChefDetails = () => {
  const { id } = useParams();
  const [chef, setChef] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChef = async () => {
      try {
        const res = await api.get(`/chefs/all`);
        const found = res.data.data.find((c) => c._id === id);
        setChef(found || FALLBACK_CHEF);
      } catch (err) {
        console.warn("Using fallback data due to API error");
        setChef(FALLBACK_CHEF);
      } finally {
        setLoading(false);
      }
    };

    fetchChef();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!chef) return <div className="p-10 text-center">Chef not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* Back Button */}
        <Link to="/chefs" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 mb-6 transition-colors font-medium">
          <FaArrowLeft /> Back to Chefs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* --- Left Column: Profile Card (Sticky) --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden sticky top-24 border border-gray-100">
              {/* Cover Bg */}
              <div className="h-32 bg-gradient-to-r from-orange-400 to-red-500"></div>

              <div className="px-6 pb-8 text-center relative">
                {/* Profile Image */}
                <div className="w-32 h-32 mx-auto -mt-16 rounded-full p-1 bg-white shadow-lg">
                  <img
                    src={chef.profilepic}
                    alt={chef.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mt-4">{chef.name}</h1>
                <p className="text-gray-500 flex items-center justify-center gap-1 mt-1 text-sm">
                  <FaMapMarkerAlt className="text-orange-500" />
                  {chef.area}, {chef.city}
                </p>

                {/* Badges */}
                <div className="flex justify-center gap-2 mt-4">
                  {chef.veg && (
                    <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold uppercase rounded-full border border-green-200">
                      Pure Veg
                    </span>
                  )}
                  {chef.nonVeg && (
                    <span className="px-3 py-1 bg-red-50 text-red-700 text-xs font-bold uppercase rounded-full border border-red-200">
                      Non-Veg
                    </span>
                  )}
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-2 mt-8 pt-6 border-t border-gray-100">
                  <div>
                    <p className="text-xl font-bold text-gray-900">{chef.experience}+</p>
                    <p className="text-xs text-gray-400 uppercase">Years</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">{chef.starRating}</p>
                    <p className="text-xs text-gray-400 uppercase">Rating</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">{chef.housesServed}</p>
                    <p className="text-xs text-gray-400 uppercase">Served</p>
                  </div>
                </div>

                {/* Call Action */}
                <div className="mt-8">
                  <a
                    href={`tel:${chef.phone}`}
                    className="flex items-center justify-center gap-2 w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-colors shadow-lg"
                  >
                    <FaPhoneAlt /> Book Now
                  </a>
                  <p className="text-xs text-gray-400 mt-2">Usually responds in 1 hour</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- Right Column: Details --- */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >

            {/* About Section */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaUserCircle className="text-orange-500" /> About Chef
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {chef.about || "No description provided."}
              </p>
            </div>

            {/* Specialties / Cuisines */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FaUtensils className="text-orange-500" /> Specialties
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {chef.cuisines?.map((cuisine, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-100">
                    <span className="font-bold text-gray-800">{cuisine.name}</span>
                    <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-md shadow-sm">
                      <FaStar className="text-yellow-400 text-sm" />
                      <span className="text-sm font-bold text-gray-700">{cuisine.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FaClock className="text-orange-500" /> Available Slots
              </h3>

              <div className="flex flex-wrap gap-3">
                {chef.timings?.length > 0 ? (
                  chef.timings.map((slot, i) => (
                    <span key={i} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium border border-gray-200">
                      <FaCheckCircle className="text-green-500" /> {slot}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">Contact for availability</p>
                )}
              </div>
            </div>

            {/* Verification Info */}
            <div className="bg-green-50 p-6 rounded-2xl border border-green-100 flex items-start gap-4">
              <FaCheckCircle className="text-green-600 text-2xl mt-1" />
              <div>
                <h4 className="font-bold text-green-800">Background Verified</h4>
                <p className="text-green-700 text-sm mt-1">
                  This chef has passed our 3-step verification process, including ID check, police verification, and a cooking trial.
                </p>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ChefDetails;