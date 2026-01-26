import Service from "../models/Service.model.js";
import { cloudinary } from "../config/cloudinary.js";
import createError from "http-errors";

/**
 * @desc    Create a new service offering
 * @route   POST /api/v1/services/create
 * @access  Private (Admin)
 */
export const createServices = async (req, res, next) => {
  try {
    const { servicename, description } = req.body;

    // 1. Check for duplicates
    const existingService = await Service.findOne({ servicename });
    if (existingService) {
      return next(createError.Conflict("This service already exists."));
    }

    // 2. Validation
    if (!servicename || !description) {
      return next(createError.BadRequest("Service name and description are required."));
    }

    // 3. Handle Image (processed via Multer middleware)
    let imageUrl = "";
    let imagePublicId = "";

    if (req.file) {
      imageUrl = req.file.path;
      imagePublicId = req.file.filename;
    } else {
      return next(createError.BadRequest("A service image is required."));
    }

    // 4. Create Service
    const newService = await Service.create({
      servicename,
      description,
      image: imageUrl,
      imagePublicId,
    });

    res.status(201).json({
      status: "success",
      message: "Service created successfully",
      data: newService,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all services
 * @route   GET /api/v1/services/all
 */
export const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      results: services.length,
      data: services,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a service and its cloud image
 * @route   DELETE /api/v1/services/:id
 */
export const deleteServices = async (req, res, next) => {
  try {
    const { id } = req.params;

    // 1. Find the service
    const service = await Service.findById(id);
    if (!service) {
      return next(createError.NotFound("Service not found."));
    }

    // 2. Cleanup Cloudinary storage
    if (service.imagePublicId) {
      await cloudinary.uploader.destroy(service.imagePublicId);
    }

    // 3. Delete from DB
    await Service.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "Service and associated image deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};
