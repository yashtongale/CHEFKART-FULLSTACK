import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch, FaMapMarkerAlt, FaStar, FaPhoneAlt, FaUtensils, FaFilter } from "react-icons/fa";

// Fallback data for demo (in case API is offline)
const FALLBACK_CHEFS = [
  {
    _id: "1",
    name: "Chef Rahul Kapoor",
    city: "Mumbai",
    area: "Andheri West",
    locality: "Lokhandwala",
    starRating: 4.8,
    totalRatings: 124,
    phone: "9876543210",
    experience: "10 Years",
    profilepic: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=400&q=80",
    specialty: "North Indian"
  },
  {
    _id: "2",
    name: "Chef Anjali Singh",
    city: "Delhi",
    area: "South Delhi",
    locality: "Vasant Kunj",
    starRating: 4.9,
    totalRatings: 89,
    phone: "9123456780",
    experience: "7 Years",
    profilepic: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80",
    specialty: "Healthy & Diet"
  },
  {
    _id: "3",
    name: "Chef Vikram Malhotra",
    city: "Bangalore",
    area: "Indiranagar",
    locality: "100ft Road",
    starRating: 4.5,
    totalRatings: 56,
    phone: "9988776655",
    experience: "15 Years",
    profilepic: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=400&q=80",
    specialty: "South Indian"
  },
  {
    _id: "4",
    name: "Chef Priya Sharma",
    city: "Pune",
    area: "Koregaon Park",
    locality: "North Main Road",
    starRating: 4.7,
    totalRatings: 42,
    phone: "8877665544",
    experience: "5 Years",
    profilepic: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=400&q=80",
    specialty: "Multi-Cuisine"
  }
];

const ChefDirectory = () => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Search filters
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    city: "",
    area: "",
    locality: "",
  });

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const response = await api.get("/chefs/all");
        if (response.data && response.data.data && response.data.data.length > 0) {
          setChefs(response.data.data);
        } else {
          setChefs(FALLBACK_CHEFS);
        }
      } catch (error) {
        console.warn("API Error, utilizing fallback data.");
        setChefs(FALLBACK_CHEFS);
      } finally {
        setLoading(false);
      }
    };

    fetchChefs();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredChefs = chefs.filter((chef) => {
    const matchesGlobalSearch =
      chef.name?.toLowerCase().includes(search.toLowerCase()) ||
      chef.phone?.includes(search);
    const matchesCity =
      filters.city === "" ||
      chef.city?.toLowerCase().includes(filters.city.toLowerCase());
    const matchesArea =
      filters.area === "" ||
      chef.area?.toLowerCase().includes(filters.area.toLowerCase());
    const matchesLocality =
      filters.locality === "" ||
      chef.Address?.toLowerCase().includes(filters.locality.toLowerCase()) ||
      chef.locality?.toLowerCase().includes(filters.locality.toLowerCase());

    return matchesGlobalSearch && matchesCity && matchesArea && matchesLocality;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-24 font-sans">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Find Your Perfect <span className="text-orange-600">Cook</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Browse our directory of verified professionals available in your area.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-lg shadow-gray-200/50 mb-12 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Global Search */}
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search name or phone..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* City Filter */}
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="city"
                placeholder="Filter by City"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                value={filters.city}
                onChange={handleFilterChange}
              />
            </div>

            {/* Area Filter */}
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="area"
                placeholder="Filter by Area"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                value={filters.area}
                onChange={handleFilterChange}
              />
            </div>

            {/* Locality Filter */}
            <div className="relative">
              <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="locality"
                placeholder="Filter by Locality"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                value={filters.locality}
                onChange={handleFilterChange}
              />
            </div>
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
          </div>
        ) : filteredChefs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <div className="text-6xl mb-4">👨‍🍳</div>
            <h3 className="text-2xl font-bold text-gray-900">No cooks found</h3>
            <p className="text-gray-500">Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredChefs.map((chef) => (
              <motion.div
                key={chef._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                onClick={() => navigate(`/chef/${chef._id}`)}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-xl hover:border-orange-200 transition-all duration-300 group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full p-1 bg-white border-2 border-orange-100 shadow-sm">
                        <img
                          src={chef.profilepic || "https://via.placeholder.com/150"}
                          alt={chef.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full border-2 border-white text-xs">
                        <FaUtensils />
                      </div>
                    </div>

                    {/* Rating Badge */}
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg border border-orange-100">
                        <FaStar className="text-orange-500 text-sm" />
                        <span className="font-bold text-gray-800">{chef.starRating || "New"}</span>
                      </div>
                      <span className="text-xs text-gray-400 mt-1">
                        {chef.totalRatings || 0} reviews
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mt-4">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {chef.name}
                    </h3>
                    <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                      <FaMapMarkerAlt className="text-gray-400" />
                      {chef.city}, {chef.area}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                      Exp: {chef.experience || "N/A"}
                    </span>
                    {chef.specialty && (
                      <span className="px-3 py-1 bg-orange-50 text-orange-600 text-xs font-medium rounded-full">
                        {chef.specialty}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer / CTA */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center group-hover:bg-orange-50 transition-colors">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <FaPhoneAlt className="text-xs" />
                    <span>View Contact</span>
                  </div>
                  <span className="text-orange-600 font-bold text-sm">View Profile →</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChefDirectory;