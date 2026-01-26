import express from 'express';
import {
    createFood,
    getallFood,
    deleteFood
} from '../controllers/FoodGallery.controller.js';
import { upload } from '../middleware/multer.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   POST /api/v1/food-gallery/create
 * @desc    Add a new dish photo to the gallery
 * @access  Private (Admin)
 */
router.post(
    '/create',
    verifyToken,
    upload.single('image'),
    createFood
);

/**
 * @route   GET /api/v1/food-gallery/all
 * @desc    Get all food gallery items
 * @access  Public
 */
router.get('/all', getallFood);

/**
 * @route   DELETE /api/v1/food-gallery/:id
 * @desc    Delete a dish photo and clean cloud storage
 * @access  Private (Admin)
 */
router.delete('/:id', verifyToken, deleteFood);

export default router;