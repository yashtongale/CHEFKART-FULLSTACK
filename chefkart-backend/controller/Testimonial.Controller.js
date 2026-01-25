import Testimonial from '../models/Testimonial.Model.js';
import { cloudinary } from '../config/cloudinary.js';
import createError from 'http-errors';

/**
 * @desc    Create a new testimonial
 * @route   POST /api/v1/testimonial/create
 * @access  Private (Admin/User)
 */
export const createTestimonial = async (req, res, next) => {
  try {
    const { name, content, starRating, designation } = req.body;

    // 1. Basic Validation
    if (!name || !content) {
      return next(createError.BadRequest("Name and content are required fields."));
    }

    // 2. Handle Profile Image (via Multer middleware)
    let profileimage = "";
    let imagePublicId = "";

    if (req.file) {
      profileimage = req.file.path;
      imagePublicId = req.file.filename;
    }

    // 3. Save to DB
    const newTestimonial = await Testimonial.create({
      name,
      content,
      starRating,
      designation,
      profileimage,
      imagePublicId
    });

    res.status(201).json({
      status: 'success',
      message: "Testimonial created successfully",
      data: newTestimonial
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all testimonials
 * @route   GET /api/v1/testimonial/all
 */
export const getAllTestimonial = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: testimonials.length,
      data: testimonials
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single testimonial by ID
 * @route   GET /api/v1/testimonial/:id
 */
export const getTestimonialByID = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return next(createError.NotFound("Testimonial not found"));

    res.status(200).json({
      status: 'success',
      data: testimonial
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update testimonial
 * @route   PATCH /api/v1/testimonial/:id
 */
export const updateTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id);

    if (!testimonial) return next(createError.NotFound("Testimonial not found"));

    let updateData = { ...req.body };

    // Handle Image Replacement
    if (req.file) {
      // Delete old image from Cloudinary
      if (testimonial.imagePublicId) {
        await cloudinary.uploader.destroy(testimonial.imagePublicId);
      }
      updateData.profileimage = req.file.path;
      updateData.imagePublicId = req.file.filename;
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      message: "Testimonial updated successfully",
      data: updatedTestimonial
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete testimonial and clean cloud storage
 * @route   DELETE /api/v1/testimonial/:id
 */
export const deleteTestomonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return next(createError.NotFound("Testimonial not found"));

    // Cleanup Cloudinary
    if (testimonial.imagePublicId) {
      await cloudinary.uploader.destroy(testimonial.imagePublicId);
    }

    await Testimonial.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      message: "Testimonial deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};