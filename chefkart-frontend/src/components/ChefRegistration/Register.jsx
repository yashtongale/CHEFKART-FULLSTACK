import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { FaCloudUploadAlt, FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

// Environment Variable
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/de4ks8mkh/image/upload";

// --- 1. Reusable Components ---

// Modern Text Input with Animation
const FormInput = ({ label, name, type = "text", placeholder, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
    <Field
      name={name}
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none bg-gray-50 focus:bg-white"
      {...props}
    />
    <ErrorMessage name={name}>
      {(msg) => (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-xs mt-1 font-medium"
        >
          {msg}
        </motion.div>
      )}
    </ErrorMessage>
  </div>
);

// Image Upload Component with Preview & Loading State
const ImageUpload = ({ label, fieldName, setFieldValue, value }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "marketdata");

    try {
      const res = await axios.post(CLOUDINARY_URL, formData);
      setFieldValue(fieldName, res.data.secure_url);
      toast.success(`${label} uploaded!`);
    } catch (err) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-orange-400 transition-colors bg-gray-50 relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        {uploading ? (
          <div className="text-orange-500 font-medium animate-pulse">Uploading...</div>
        ) : value ? (
          <div className="relative w-32 h-32 mx-auto group">
            <img src={value} alt="Preview" className="w-full h-full object-cover rounded-lg shadow-md" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg text-white text-xs">
              Change
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-gray-400">
            <FaCloudUploadAlt className="text-3xl mb-2" />
            <span className="text-xs">Click or Drag to Upload</span>
          </div>
        )}
      </div>
      <ErrorMessage name={fieldName} component="div" className="text-red-500 text-xs mt-1" />
    </div>
  );
};

// Tag Input (For Languages & Locations) - Type and press Enter
const TagInput = ({ label, name, values, setFieldValue }) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      if (!values.includes(input.trim())) {
        setFieldValue(name, [...values, input.trim()]);
      }
      setInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFieldValue(name, values.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-orange-200 focus-within:border-orange-500 focus-within:bg-white transition-all">
        {values.map((tag, index) => (
          <span key={index} className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
            {tag}
            <FaTimes className="cursor-pointer hover:text-red-500" onClick={() => removeTag(tag)} />
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type & Press Enter..."
          className="flex-1 bg-transparent outline-none min-w-[120px] text-sm py-1"
        />
      </div>
    </div>
  );
};

// --- 2. Main Component ---

const ChefRegister = () => {

  // Validation Schema
  const chefSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string().required("Required"),
    Address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    pincode: Yup.string().required("Required"),
    experience: Yup.number().typeError("Must be a number").required("Required"),
    profilepic: Yup.string().required("Profile picture is required"),
    default_cook_image: Yup.string().required("Cook image is required"),
  });

  const initialValues = {
    name: "", Address: "", email: "", phone: "",
    city: "", state: "", area: "", country: "", pincode: "",
    experience: "", housesServed: 0,
    profilepic: "", default_cook_image: "",
    verified: false, veg: false, nonVeg: false,
    aboutCook: "",
    language: [],
    availableLocations: [],
    cuisineRatings: { Indian: 0, Continental: 0 },
    availability: [{ day: "", time: "" }],
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await axios.post(`${API_URL}/chef/create`, values);
      toast.success("👨‍🍳 Chef Registered Successfully!");
      resetForm();
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-8 text-center text-white">
          <h1 className="text-3xl font-bold">Partner Registration</h1>
          <p className="opacity-90 mt-2">Join the ChefKart family and start your journey</p>
        </div>

        <div className="p-8">
          <Formik
            initialValues={initialValues}
            validationSchema={chefSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <Form>

                {/* --- Section 1: Personal Details --- */}
                <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6">Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput label="Full Name" name="name" placeholder="Ex: Rahul Kumar" />
                  <FormInput label="Email Address" name="email" type="email" placeholder="rahul@example.com" />
                  <FormInput label="Phone Number" name="phone" type="number" placeholder="9876543210" />
                  <FormInput label="Years of Experience" name="experience" type="number" placeholder="Ex: 5" />
                </div>

                {/* --- Section 2: Address --- */}
                <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6 mt-8">Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <FormInput label="Street Address" name="Address" placeholder="Flat No, Building, Street" />
                  </div>
                  <FormInput label="Area / Locality" name="area" />
                  <FormInput label="City" name="city" />
                  <FormInput label="State" name="state" />
                  <FormInput label="Pincode" name="pincode" type="number" />
                </div>

                {/* --- Section 3: Professional Info --- */}
                <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6 mt-8">Professional Info</h3>

                {/* Tag Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <TagInput
                    label="Languages Known"
                    name="language"
                    values={values.language}
                    setFieldValue={setFieldValue}
                  />
                  <TagInput
                    label="Service Areas"
                    name="availableLocations"
                    values={values.availableLocations}
                    setFieldValue={setFieldValue}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <FormInput label="Indian Cuisine Rating (1-10)" name="cuisineRatings.Indian" type="number" />
                  <FormInput label="Continental Rating (1-10)" name="cuisineRatings.Continental" type="number" />
                </div>

                {/* Checkboxes as Toggle Cards */}
                <div className="flex flex-wrap gap-4 mb-6">
                  {['veg', 'nonVeg', 'verified'].map((field) => (
                    <label key={field} className={`cursor-pointer border px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${values[field] ? 'bg-orange-100 border-orange-500 text-orange-700' : 'bg-gray-50 border-gray-200'}`}>
                      <Field type="checkbox" name={field} className="accent-orange-600 w-4 h-4" />
                      <span className="capitalize font-medium">{field.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </label>
                  ))}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">About the Cook</label>
                  <Field as="textarea" name="aboutCook" rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 outline-none bg-gray-50" placeholder="Describe skills and specialties..." />
                </div>

                {/* --- Section 4: Media Uploads --- */}
                <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6 mt-8">Media Uploads</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ImageUpload label="Profile Photo" fieldName="profilepic" setFieldValue={setFieldValue} value={values.profilepic} />
                  <ImageUpload label="Default Cook Image" fieldName="default_cook_image" setFieldValue={setFieldValue} value={values.default_cook_image} />
                </div>

                {/* --- Section 5: Availability --- */}
                <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6 mt-8">Weekly Availability</h3>
                <FieldArray name="availability">
                  {({ push, remove }) => (
                    <div>
                      <AnimatePresence>
                        {values.availability.map((slot, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex gap-4 mb-3 items-center"
                          >
                            <Field name={`availability[${index}].day`} placeholder="Day (e.g. Mon)" className="flex-1 p-3 border rounded-lg bg-gray-50" />
                            <Field name={`availability[${index}].time`} placeholder="Time (e.g. 9AM - 5PM)" className="flex-1 p-3 border rounded-lg bg-gray-50" />
                            {index > 0 && (
                              <button type="button" onClick={() => remove(index)} className="text-red-500 p-2 hover:bg-red-50 rounded-full">
                                <FaTrash />
                              </button>
                            )}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      <button type="button" onClick={() => push({ day: "", time: "" })} className="text-orange-600 font-semibold flex items-center gap-2 mt-2 hover:bg-orange-50 px-3 py-1 rounded-lg transition-colors">
                        <FaPlus size={12} /> Add Slot
                      </button>
                    </div>
                  )}
                </FieldArray>

                {/* --- Submit Button --- */}
                <div className="mt-12 pt-6 border-t">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-orange-700 hover:shadow-xl transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Registering Chef...</span>
                    ) : (
                      "Complete Registration"
                    )}
                  </button>
                </div>

              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ChefRegister;