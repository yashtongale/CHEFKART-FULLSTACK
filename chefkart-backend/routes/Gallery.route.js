import express from 'express';
import {
    createGallery,
    getAllGallery,
    deleteGalleryById, // Added for single gallery deletion
    deleteGallery
} from '../controllers/Gallery.controller.js';
import { upload } from '../middleware/multer.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   POST /api/v1/gallery/create
 * @desc    Create a new gallery with multiple images
 * @access  Private (Admin)
 */
router.post(
    '/create',
    verifyToken,
    upload.array('galleryImages', 10), // Handles up to 10 images at once
    createGallery
);

/**
 * @route   GET /api/v1/gallery/all
 * @desc    Get all galleries
 * @access  Public
 */
router.get('/all', getAllGallery);

/**
 * @route   DELETE /api/v1/gallery/:id
 * @desc    Delete a specific gallery and its images
 * @access  Private (Admin)
 */
router.delete('/:id', verifyToken, deleteGalleryById);

/**
 * @route   DELETE /api/v1/gallery/delete-all
 * @desc    Wipe all galleries (Caution!)
 * @access  Private (Admin)
 */
router.delete('/delete-all', verifyToken, deleteGallery);

export default router;