import express from 'express';
import {
    createTestimonial,
    getAllTestimonial,
    getTestimonialByID,
    updateTestimonial,
    deleteTestomonial
} from '../controllers/Testimonial.controller.js';
import { upload } from '../config/cloudinary.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   POST /api/v1/testimonials/create
 * @desc    Add a new customer testimonial with a profile picture
 * @access  Private (Admin)
 */
router.post(
    '/create',
    verifyToken,
    upload.single('image'),
    createTestimonial
);

/**
 * @route   GET /api/v1/testimonials/all
 * @desc    Get all testimonials
 * @access  Public
 */
router.get('/all', getAllTestimonial);

/**
 * @route   GET /api/v1/testimonials/:id
 * @desc    Get a specific testimonial by ID
 * @access  Public
 */
router.get('/:id', getTestimonialByID);

/**
 * @route   PATCH /api/v1/testimonials/:id
 * @desc    Update testimonial content or profile picture
 * @access  Private (Admin)
 */
router.patch(
    '/:id',
    verifyToken,
    upload.single('image'),
    updateTestimonial
);

/**
 * @route   DELETE /api/v1/testimonials/:id
 * @desc    Delete testimonial and clean Cloudinary storage
 * @access  Private (Admin)
 */
router.delete('/:id', verifyToken, deleteTestomonial);

export default router;
