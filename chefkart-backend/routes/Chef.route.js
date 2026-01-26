import express from 'express';
import {
    createChef,
    getAllChef,
    getById,
    updateChef,
    deleteCheftById,
    DeleteAllChef
} from '../controllers/Chefs.controller.js';
import { upload } from '../middleware/multer.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   POST /api/v1/chefs/create
 * @desc    Register a new chef with a profile picture
 * @access  Private (Admin)
 */
router.post(
    '/create',
    verifyToken,
    upload.single('profilePic'),
    createChef
);

/**
 * @route   GET /api/v1/chefs/all
 * @desc    Get all chefs (supports filtering/sorting)
 * @access  Public
 */
router.get('/all', getAllChef);

/**
 * @route   GET /api/v1/chefs/:id
 * @desc    Get specific chef profile
 * @access  Public
 */
router.get('/:id', getById);

/**
 * @route   PATCH /api/v1/chefs/update/:id
 * @desc    Update chef details or profile picture
 * @access  Private (Admin/Chef)
 */
router.patch(
    '/update/:id',
    verifyToken,
    upload.single('profilePic'),
    updateChef
);

/**
 * @route   DELETE /api/v1/chefs/:id
 * @desc    Delete a chef and their Cloudinary assets
 * @access  Private (Admin)
 */
router.delete('/:id', verifyToken, deleteCheftById);

/**
 * @route   DELETE /api/v1/chefs/delete-all
 * @desc    Wipe all chef data (Caution!)
 * @access  Private (Admin)
 */
router.delete('/delete-all', verifyToken, DeleteAllChef);

export default router;