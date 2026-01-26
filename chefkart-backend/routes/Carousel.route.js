import express from 'express';
import {
    createCarousel,
    getAllCarousel,
    getCarouselById,
    updateCarousel,
    deleteCarouselById,
    deleteAllCarousel
} from '../controllers/Carousel.controller.js';
import { upload } from '../config/cloudinary.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   POST /api/v1/carousel/create
 * @desc    Upload a new carousel slide
 * @access  Private (Admin)
 */
router.post(
    '/create',
    verifyToken,
    upload.single('image'),
    createCarousel
);

/**
 * @route   GET /api/v1/carousel/all
 * @desc    Get all carousel slides
 * @access  Public
 */
router.get('/all', getAllCarousel);

/**
 * @route   GET /api/v1/carousel/:id
 * @desc    Get a specific slide
 * @access  Public
 */
router.get('/:id', getCarouselById);

/**
 * @route   PATCH /api/v1/carousel/:id
 * @desc    Update slide content or image
 * @access  Private (Admin)
 */
router.patch(
    '/:id',
    verifyToken,
    upload.single('image'),
    updateCarousel
);

/**
 * @route   DELETE /api/v1/carousel/:id
 * @desc    Delete slide and clean Cloudinary
 * @access  Private (Admin)
 */
router.delete('/:id', verifyToken, deleteCarouselById);

/**
 * @route   DELETE /api/v1/carousel/delete-all
 * @desc    Clear entire carousel
 * @access  Private (Admin)
 */
router.delete('/delete-all', verifyToken, deleteAllCarousel);

export default router;
