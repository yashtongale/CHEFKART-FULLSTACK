import Gallery from "../models/Gallery.Model.js";
import { cloudinary } from "../config/cloudinary.js";
import createError from "http-errors";

/**
 * @desc    Create a new multi-image gallery
 * @route   POST /api/v1/gallery/create
 * @access  Private (Admin)
 */
export const createGallery = async (req, res, next) => {
  try {
    const { name, content } = req.body;

    // 1. Validation
    if (!name || !content) {
      return next(createError.BadRequest("Name and content description are required."));
    }

    // 2. Process Multiple Files (Multer array upload)
    let galleryImages = [];

    if (req.files && req.files.length > 0) {
      galleryImages = req.files.map((file) => ({
        url: file.path,
        publicId: file.filename,
      }));
    } else {
      return next(createError.BadRequest("Please upload at least one image."));
    }

    // 3. Save to Database
    const newGallery = await Gallery.create({
      name,
      content,
      galleryImages,
    });

    res.status(201).json({
      status: "success",
      message: "Gallery created successfully",
      data: newGallery,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all galleries
 * @route   GET /api/v1/gallery/all
 */
export const getAllGallery = async (req, res, next) => {
  try {
    const galleries = await Gallery.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      results: galleries.length,
      data: galleries,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a single gallery and its Cloudinary assets
 * @route   DELETE /api/v1/gallery/:id
 */
export const deleteGalleryById = async (req, res, next) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return next(createError.NotFound("Gallery not found."));

    // 1. Storage Cleanup: Loop through and delete all images from Cloudinary
    if (gallery.galleryImages && gallery.galleryImages.length > 0) {
      const deletePromises = gallery.galleryImages.map((img) =>
        cloudinary.uploader.destroy(img.publicId)
      );
      await Promise.all(deletePromises);
    }

    // 2. Delete from DB
    await Gallery.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Gallery and all associated images deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Wipe all galleries (Caution: Admin only)
 * @route   DELETE /api/v1/gallery/delete-all
 */
export const deleteGallery = async (req, res, next) => {
  try {
    // In a production environment, you should loop through all 
    // galleries and delete Cloudinary images before wiping the collection.
    const result = await Gallery.deleteMany();

    res.status(200).json({
      status: "success",
      message: "All galleries deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};