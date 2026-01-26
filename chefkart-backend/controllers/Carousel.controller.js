import Carousel from '../models/Carousel.model.js';
import { cloudinary } from '../config/cloudinary.js';
import createError from 'http-errors';

/**
 * @desc    Create a new Carousel slide
 * @route   POST /api/v1/carousel/create
 * @access  Private (Admin)
 */
export const createCarousel = async (req, res, next) => {
    try {
        const { title, content, action } = req.body;

        // 1. Basic Validation
        if (!title || !content || !action) {
            return next(createError.BadRequest("Title, content, and action link are required."));
        }

        // 2. Handle Image Upload (Multer middleware handles this)
        let imageUrl = "";
        let imagePublicId = "";

        if (req.file) {
            imageUrl = req.file.path;
            imagePublicId = req.file.filename;
        } else {
            return next(createError.BadRequest("Carousel image is required."));
        }

        // 3. Save to DB
        const newSlide = await Carousel.create({
            title,
            content,
            action,
            image: imageUrl,
            imagePublicId
        });

        res.status(201).json({
            status: 'success',
            message: "Carousel slide created successfully",
            data: newSlide
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all Carousel slides
 * @route   GET /api/v1/carousel/all
 */
export const getAllCarousel = async (req, res, next) => {
    try {
        const slides = await Carousel.find().sort({ createdAt: -1 });

        res.status(200).json({
            status: 'success',
            results: slides.length,
            data: slides
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get single slide by ID
 * @route   GET /api/v1/carousel/:id
 */
export const getCarouselById = async (req, res, next) => {
    try {
        const slide = await Carousel.findById(req.params.id);
        if (!slide) return next(createError.NotFound("Slide not found"));

        res.status(200).json({
            status: 'success',
            data: slide
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update Carousel slide
 * @route   PATCH /api/v1/carousel/:id
 */
export const updateCarousel = async (req, res, next) => {
    try {
        const { id } = req.params;
        const slide = await Carousel.findById(id);

        if (!slide) return next(createError.NotFound("Slide not found"));

        let updateData = { ...req.body };

        // Handle Image Replacement
        if (req.file) {
            // Delete old image from Cloudinary
            if (slide.imagePublicId) {
                await cloudinary.uploader.destroy(slide.imagePublicId);
            }
            updateData.image = req.file.path;
            updateData.imagePublicId = req.file.filename;
        }

        const updatedSlide = await Carousel.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            message: "Carousel updated successfully",
            data: updatedSlide
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete single slide
 * @route   DELETE /api/v1/carousel/:id
 */
export const deleteCarouselById = async (req, res, next) => {
    try {
        const slide = await Carousel.findById(req.params.id);
        if (!slide) return next(createError.NotFound("Slide not found"));

        // Clean up Cloudinary storage
        if (slide.imagePublicId) {
            await cloudinary.uploader.destroy(slide.imagePublicId);
        }

        await Carousel.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'success',
            message: "Slide deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete all slides (Admin only)
 * @route   DELETE /api/v1/carousel/delete-all
 */
export const deleteAllCarousel = async (req, res, next) => {
    try {
        // Note: In production, you should ideally loop and delete images from Cloudinary first
        await Carousel.deleteMany();
        res.status(200).json({
            status: 'success',
            message: "All slides deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
