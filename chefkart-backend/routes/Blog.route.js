import express from 'express';
import {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
} from '../controllers/Blog.controller.js';
import { upload } from '../config/cloudinary.js'; // Our Cloudinary storage engine
import { verifyToken } from '../middleware/auth.middleware.js'; // To protect admin routes

const router = express.Router();

/**
 * @route   POST /api/v1/blogs/create
 * @desc    Create a new blog with an image
 * @access  Private (Admin)
 */
router.post(
    '/create',
    verifyToken,
    upload.single('image'),
    createBlog
);

/**
 * @route   GET /api/v1/blogs/all
 * @desc    Get all blogs
 * @access  Public
 */
router.get('/all', getAllBlogs);

/**
 * @route   GET /api/v1/blogs/:id
 * @desc    Get a single blog by ID
 * @access  Public
 */
router.get('/:id', getBlogById);

/**
 * @route   PATCH /api/v1/blogs/update/:id
 * @desc    Update blog content or image
 * @access  Private (Admin)
 */
router.patch(
    '/update/:id',
    verifyToken,
    upload.single('image'),
    updateBlog
);

/**
 * @route   DELETE /api/v1/blogs/delete/:id
 * @desc    Delete blog and clean Cloudinary
 * @access  Private (Admin)
 */
router.delete(
    '/delete/:id',
    verifyToken,
    deleteBlog
);

export default router;
