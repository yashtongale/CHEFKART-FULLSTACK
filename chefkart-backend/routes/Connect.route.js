import express from 'express';
import {
    createConnect,
    getallConnect,
    getConnectById,
    updateConnect,
    deleteConnect
} from '../controllers/Connect.controller.js';
import { upload } from '../middleware/multer.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   POST /api/v1/connect/create
 * @desc    Create a new connect/social banner
 * @access  Private (Admin)
 */
router.post(
    '/create',
    verifyToken,
    upload.single('image'),
    createConnect
);

/**
 * @route   GET /api/v1/connect/all
 * @desc    Get all connect banners
 * @access  Public
 */
router.get('/all', getallConnect);

/**
 * @route   GET /api/v1/connect/:id
 * @desc    Get a specific connect item by ID
 * @access  Public
 */
router.get('/:id', getConnectById);

/**
 * @route   PATCH /api/v1/connect/:id
 * @desc    Update connect content or image
 * @access  Private (Admin)
 */
router.patch(
    '/:id',
    verifyToken,
    upload.single('image'),
    updateConnect
);

/**
 * @route   DELETE /api/v1/connect/:id
 * @desc    Delete connect item and clean Cloudinary
 * @access  Private (Admin)
 */
router.delete('/:id', verifyToken, deleteConnect);

export default router;