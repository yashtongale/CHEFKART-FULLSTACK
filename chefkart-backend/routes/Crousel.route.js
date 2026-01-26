import express from 'express';
import {
    createCrousel,
    getAllCrousel,
    getCrouselById,
    updateCrousel,
    deleteCrouselById,
    deleteCrousel
} from '../controllers/Crousel.controller.js';
import { upload } from '../middleware/multer.js';
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
    createCrousel
);

/**
 * @route   GET /api/v1/carousel/all
 * @desc    Get all carousel slides
 * @access  Public
 */
router.get('/all', getAllCrousel);

/**
 * @route   GET /api/v1/carousel/:id
 * @desc    Get a specific slide
 * @access  Public
 */
router.get('/:id', getCrouselById);

/**
 * @route   PATCH /api/v1/carousel/:id
 * @desc    Update slide content or image
 * @access  Private (Admin)
 */
router.patch(
    '/:id',
    verifyToken,
    upload.single('image'),
    updateCrousel
);

/**
 * @route   DELETE /api/v1/carousel/:id
 * @desc    Delete slide and clean Cloudinary
 * @access  Private (Admin)
 */
router.delete('/:id', verifyToken, deleteCrouselById);

/**
 * @route   DELETE /api/v1/carousel/delete-all
 * @desc    Clear entire carousel
 * @access  Private (Admin)
 */
router.delete('/delete-all', verifyToken, deleteCrousel);

export default router;