import express from 'express';
import {
    createInvestor,
    getallInvestor,
    getInvestorById,
    updateInvestor,
    deleteInvestor
} from '../controllers/Investor.controller.js';
import { upload } from '../middleware/multer.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   POST /api/v1/investors/create
 * @desc    Add new investor relation content with an image
 * @access  Private (Admin)
 */
router.post(
    '/create',
    verifyToken,
    upload.single('image'),
    createInvestor
);

/**
 * @route   GET /api/v1/investors/all
 * @desc    Get all investor posts
 * @access  Public
 */
router.get('/all', getallInvestor);

/**
 * @route   GET /api/v1/investors/:id
 * @desc    Get a specific investor post
 * @access  Public
 */
router.get('/:id', getInvestorById);

/**
 * @route   PATCH /api/v1/investors/:id
 * @desc    Update investor content or image
 * @access  Private (Admin)
 */
router.patch(
    '/:id',
    verifyToken,
    upload.single('image'),
    updateInvestor
);

/**
 * @route   DELETE /api/v1/investors/:id
 * @desc    Delete investor post and clean Cloudinary
 * @access  Private (Admin)
 */
router.delete('/:id', verifyToken, deleteInvestor);

export default router;