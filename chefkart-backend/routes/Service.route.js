import express from 'express';
import {
    createServices,
    getAllServices,
    deleteServices
} from '../controllers/Service.controller.js';
import { upload } from '../config/cloudinary.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   POST /api/v1/services/create
 * @desc    Create a new service offering with an image
 * @access  Private (Admin)
 */
router.post(
    '/create',
    verifyToken,
    upload.single('image'),
    createServices
);

/**
 * @route   GET /api/v1/services/all
 * @desc    Get all active services
 * @access  Public
 */
router.get('/all', getAllServices);

/**
 * @route   DELETE /api/v1/services/:id
 * @desc    Delete a service and clean Cloudinary storage
 * @access  Private (Admin)
 */
router.delete('/:id', verifyToken, deleteServices);

export default router;
