import express from 'express';
import {
    createInvestContact,
    getallInvestorContact
} from '../controllers/InvestorContact.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   POST /api/v1/investor-contact/submit
 * @desc    Submit a new investor inquiry
 * @access  Public
 */
router.post('/submit', createInvestContact);

/**
 * @route   GET /api/v1/investor-contact/all
 * @desc    Get all investor inquiries
 * @access  Private (Admin)
 */
router.get('/all', verifyToken, getallInvestorContact);

/**
 * @route   DELETE /api/v1/investor-contact/:id
 * @desc    Remove an inquiry record
 * @access  Private (Admin)
 */
// router.delete('/:id', verifyToken, deleteInquiry);

export default router;
