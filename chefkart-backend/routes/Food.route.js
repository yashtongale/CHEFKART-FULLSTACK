import express from 'express';
import {
    createFood,
    getallFood,
    deleteFood
} from '../controllers/Food.controller.js';
import { upload } from '../middleware/multer.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   POST /api/v1/food/create
 * @desc    Add a new dish to the food gallery
 * @access  Private (Admin)
 */
router.post(
    '/create',
    verifyToken,
    upload.single('image'),
    createFood
);

/**
 * @route   GET /api/v1/food/all
 * @desc    Get all gallery food items
 * @access  Public
 */
router.get('/all', getallFood);

/**
 * @route   DELETE /api/v1/food/:id
 * @desc    Delete food item and clean Cloudinary
 * @access  Private (Admin)
 */
router.delete('/:id', verifyToken, deleteFood);

export default router;