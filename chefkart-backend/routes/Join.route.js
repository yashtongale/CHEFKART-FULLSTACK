import express from 'express';
import {
    createJoin,
    getallJoins,
    getJoinById,
    updateJoins,
    deleteJoin
} from '../controllers/Join.controller.js';
import { upload } from '../config/cloudinary.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   POST /api/v1/join/create
 * @desc    Create a new recruitment/careers post with an image
 * @access  Private (Admin)
 */
router.post(
    '/create',
    verifyToken,
    upload.single('image'),
    createJoin
);

/**
 * @route   GET /api/v1/join/all
 * @desc    Get all recruitment posts
 * @access  Public
 */
router.get('/all', getallJoins);

/**
 * @route   GET /api/v1/join/:id
 * @desc    Get a specific career post by ID
 * @access  Public
 */
router.get('/:id', getJoinById);

/**
 * @route   PATCH /api/v1/join/:id
 * @desc    Update career post content or image
 * @access  Private (Admin)
 */
router.patch(
    '/:id',
    verifyToken,
    upload.single('image'),
    updateJoins
);

/**
 * @route   DELETE /api/v1/join/:id
 * @desc    Delete recruitment post and clean storage
 * @access  Private (Admin)
 */
router.delete('/:id', verifyToken, deleteJoin);

export default router;
