import Home from "../models/HomePage.model.js";
import { cloudinary } from "../config/cloudinary.js";
import createError from "http-errors";

/**
 * @desc    Create a new homepage section
 * @route   POST /api/v1/home-page/create
 * @access  Private (Admin)
 */
export const createKitchen = async (req, res, next) => {
  try {
    const { title, content, category } = req.body;

    // 1. Validation
    if (!title || !content || !category) {
      return next(createError.BadRequest("Title, content, and category are required."));
    }

    // 2. Check existence
    const existingData = await Home.findOne({ title });
    if (existingData) {
      return next(createError.Conflict("A section with this title already exists."));
    }

    // 3. Handle Image (processed via Multer middleware)
    let imageUrl = "";
    let imagePublicId = "";

    if (req.file) {
      imageUrl = req.file.path;
      imagePublicId = req.file.filename;
    } else {
      return next(createError.BadRequest("An image is required for this section."));
    }

    // 4. Save to DB
    const newSection = await Home.create({
      title,
      content,
      category,
      image: imageUrl,
      imagePublicId
    });

    res.status(201).json({
      status: "success",
      message: "Homepage section created successfully",
      data: newSection,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all homepage sections
 * @route   GET /api/v1/home-page/all
 */
export const getallHomeImage = async (req, res, next) => {
  try {
    const sections = await Home.find().sort({ category: 1 });

    res.status(200).json({
      status: "success",
      results: sections.length,
      data: sections,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single section by ID
 * @route   GET /api/v1/home-page/:id
 */
export const getHomeById = async (req, res, next) => {
  try {
    const section = await Home.findById(req.params.id);
    if (!section) return next(createError.NotFound("Section not found."));

    res.status(200).json({
      status: "success",
      data: section,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update homepage section
 * @route   PATCH /api/v1/home-page/:id
 */
export const updateHomePage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const section = await Home.findById(id);

    if (!section) return next(createError.NotFound("Section not found."));

    let updateData = { ...req.body };

    // Handle Image Replacement
    if (req.file) {
      // Delete old image from Cloudinary
      if (section.imagePublicId) {
        await cloudinary.uploader.destroy(section.imagePublicId);
      }
      updateData.image = req.file.path;
      updateData.imagePublicId = req.file.filename;
    }

    const updatedSection = await Home.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      message: "Homepage section updated successfully",
      data: updatedSection,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete homepage section and clean storage
 * @route   DELETE /api/v1/home-page/:id
 */
export const deletehomePage = async (req, res, next) => {
  try {
    const section = await Home.findById(req.params.id);
    if (!section) return next(createError.NotFound("Section not found."));

    // Cleanup Cloudinary
    if (section.imagePublicId) {
      await cloudinary.uploader.destroy(section.imagePublicId);
    }

    await Home.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Section deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};