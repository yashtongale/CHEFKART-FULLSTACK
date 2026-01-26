import FoodGallery from "../models/FoodGallery.model.js";
import { cloudinary } from "../config/cloudinary.js";
import createError from "http-errors";

/**
 * @desc    Upload a new image to the food gallery
 * @route   POST /api/v1/food-gallery/create
 * @access  Private (Admin/Chef)
 */
export const createFood = async (req, res, next) => {
  try {
    // 1. Handle File Upload (Middleware should have processed this)
    let imageUrl = "";
    let imagePublicId = "";

    if (req.file) {
      imageUrl = req.file.path;
      imagePublicId = req.file.filename;
    } else {
      return next(createError.BadRequest("Please upload a valid image file."));
    }

    // 2. Create the Gallery Entry
    const newEntry = await FoodGallery.create({
      image: imageUrl,
      imagePublicId,
      caption: req.body.caption || "ChefKart Special" // Optional caption support
    });

    res.status(201).json({
      status: "success",
      message: "Gallery image uploaded successfully",
      data: newEntry,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Retrieve all food gallery images
 * @route   GET /api/v1/food-gallery/all
 * @access  Public
 */
export const getallFood = async (req, res, next) => {
  try {
    // Sort by most recent uploads
    const images = await FoodGallery.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      results: images.length,
      data: images,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a food image from DB and Cloudinary
 * @route   DELETE /api/v1/food-gallery/:id
 * @access  Private (Admin)
 */
export const deleteFood = async (req, res, next) => {
  try {
    const { id } = req.params;

    // 1. Check if record exists
    const record = await FoodGallery.findById(id);
    if (!record) {
      return next(createError.NotFound("Image record not found."));
    }

    // 2. Storage Cleanup: Remove from Cloudinary
    if (record.imagePublicId) {
      await cloudinary.uploader.destroy(record.imagePublicId);
    }

    // 3. Remove from Database
    await FoodGallery.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "Image successfully removed from both gallery and cloud storage.",
    });
  } catch (error) {
    next(error);
  }
};
