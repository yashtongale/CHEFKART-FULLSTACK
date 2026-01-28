import Investor from "../models/Investor.Model.js";
import { cloudinary } from "../config/cloudinary.js";
import createError from "http-errors";

/**
 * @desc    Create new investor content
 * @route   POST /api/v1/investor/create
 * @access  Private (Admin)
 */
export const createInvestor = async (req, res, next) => {
  try {
    const { title, subtitle, description } = req.body;

    // 1. Validation
    if (!title || !description) {
      return next(createError.BadRequest("Title and description are required."));
    }

    // 2. Check existence
    const existingData = await Investor.findOne({ title });
    if (existingData) {
      return next(createError.Conflict("Content with this title already exists."));
    }

    // 3. Handle Image (processed via Multer middleware)
    let imageUrl = "";
    let imagePublicId = "";

    if (req.file) {
      imageUrl = req.file.path;
      imagePublicId = req.file.filename;
    }

    // 4. Save to DB
    const newInvestor = await Investor.create({
      title,
      subtitle,
      description,
      image: imageUrl,
      imagePublicId
    });

    res.status(201).json({
      status: "success",
      message: "Investor content created successfully",
      data: newInvestor,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all investor content
 * @route   GET /api/v1/investor/all
 */
export const getallInvestor = async (req, res, next) => {
  try {
    const investors = await Investor.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      results: investors.length,
      data: investors,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single investor post
 * @route   GET /api/v1/investor/:id
 */
export const getInvestorById = async (req, res, next) => {
  try {
    const investor = await Investor.findById(req.params.id);
    if (!investor) return next(createError.NotFound("Content not found."));

    res.status(200).json({
      status: "success",
      data: investor,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update investor content
 * @route   PATCH /api/v1/investor/:id
 */
export const updateInvestor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const investor = await Investor.findById(id);

    if (!investor) return next(createError.NotFound("Investor content not found."));

    let updateData = { ...req.body };

    // Handle Image Replacement
    if (req.file) {
      // Delete old image from Cloudinary to keep storage clean
      if (investor.imagePublicId) {
        await cloudinary.uploader.destroy(investor.imagePublicId);
      }
      updateData.image = req.file.path;
      updateData.imagePublicId = req.file.filename;
    }

    const updatedInvestor = await Investor.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      message: "Investor content updated successfully",
      data: updatedInvestor,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete investor content and clean storage
 * @route   DELETE /api/v1/investor/:id
 */
export const deleteInvestor = async (req, res, next) => {
  try {
    const investor = await Investor.findById(req.params.id);
    if (!investor) return next(createError.NotFound("Content not found."));

    // Cleanup Cloudinary storage
    if (investor.imagePublicId) {
      await cloudinary.uploader.destroy(investor.imagePublicId);
    }

    await Investor.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Investor content deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};
