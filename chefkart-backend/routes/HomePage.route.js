import express from 'express';
import {
    createKitchen,
    getallHomeImage,
    getHomeById,
    updateHomePage,
    deletehomePage
} from '../controllers/HomePage.controller.js';
import { upload } from '../middleware/multer.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   POST /api/v1/home-page/create
 * @desc    Create a new homepage section with an image
 * @access  Private (Admin)
 */
router.post(
    '/create',
    verifyToken,
    upload.single('image'),
    createKitchen
);

/**
 * @route   GET /api/v1/home-page/all
 * @desc    Get all homepage sections
 * @access  Public
 */
router.get('/all', getallHomeImage);

/**
 * @route   GET /api/v1/home-page/:id
 * @desc    Get a specific section by ID
 * @access  Public
 */
router.get('/:id', getHomeById);

/**
 * @route   PATCH /api/v1/home-page/:id
 * @desc    Update homepage section content or image
 * @access  Private (Admin)
 */
router.patch(
    '/:id',
    verifyToken,
    upload.single('image'),
    updateHomePage
);

/**
 * @route   DELETE /api/v1/home-page/:id
 * @desc    Delete a section and clean Cloudinary storage
 * @access  Private (Admin)
 */
router.delete('/:id', verifyToken, deletehomePage);

export default router;