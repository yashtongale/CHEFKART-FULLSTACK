import FoodGallery from "../models/Food.model.js";
import { cloudinary } from "../config/cloudinary.js";
import createError from "http-errors";

/**
 * @desc    Upload a new photo to the Food Gallery
 * @route   POST /api/v1/food-gallery/create
 * @access  Private (Admin/Chef)
 */
export const createFood = async (req, res, next) => {
  try {
    // 1. Handle Image Upload (Middleware logic)
    let imageUrl = "";
    let imagePublicId = "";

    if (req.file) {
      imageUrl = req.file.path;
      imagePublicId = req.file.filename;
    } else {
      return next(createError.BadRequest("Please upload an image file."));
    }

    // 2. Create entry in Database (Fixed 'new Home' bug)
    const newEntry = await FoodGallery.create({
      image: imageUrl,
      imagePublicId,
      caption: req.body.caption || ""
    });

    res.status(201).json({
      status: "success",
      message: "Food gallery image uploaded successfully",
      data: newEntry,
    });
  } catch (error) {
    next(error); // Pass to global error handler
  }
};

/**
 * @desc    Get all gallery images
 * @route   GET /api/v1/food-gallery/all
 * @access  Public
 */
export const getallFood = async (req, res, next) => {
  try {
    // Sort by newest first so the gallery feels fresh
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
 * @desc    Delete a gallery image from DB and Cloudinary
 * @route   DELETE /api/v1/food-gallery/delete/:id
 * @access  Private (Admin)
 */
export const deleteFood = async (req, res, next) => {
  try {
    const { id } = req.params;

    // 1. Find the record
    const record = await FoodGallery.findById(id);
    if (!record) {
      return next(createError.NotFound("Image not found in gallery."));
    }

    // 2. Delete from Cloudinary first (Storage Cleanup)
    if (record.imagePublicId) {
      await cloudinary.uploader.destroy(record.imagePublicId);
    }

    // 3. Delete from MongoDB
    await FoodGallery.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "Image successfully removed from gallery and cloud storage.",
    });
  } catch (error) {
    next(error);
  }
};
