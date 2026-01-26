import express from 'express';
import {
    UserSignup,
    UserLogin,
    // getMe // Suggest adding this to the controller
} from '../controllers/User.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   POST /api/v1/users/signup
 * @desc    Register a new user
 * @access  Public
 */
router.post('/signup', UserSignup);

/**
 * @route   POST /api/v1/users/login
 * @desc    Authenticate user & get token
 * @access  Public
 */
router.post('/login', UserLogin);

/**
 * @route   GET /api/v1/users/me
 * @desc    Get current logged-in user profile
 * @access  Private
 */
// router.get('/me', verifyToken, getMe);

export default router;
