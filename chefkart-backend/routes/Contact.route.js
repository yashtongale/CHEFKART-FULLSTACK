import express from 'express';
import {
    createContact,
    getallContact,
    // deleteContact // Assuming we add this to the controller
} from '../controllers/Contact.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   POST /api/v1/contacts/submit
 * @desc    Submit a new contact inquiry (Lead)
 * @access  Public
 */
router.post('/submit', createContact);

/**
 * @route   GET /api/v1/contacts/all
 * @desc    Get all contact inquiries
 * @access  Private (Admin)
 */
router.get('/all', verifyToken, getallContact);

/**
 * @route   DELETE /api/v1/contacts/:id
 * @desc    Remove an inquiry record
 * @access  Private (Admin)
 */
// router.delete('/:id', verifyToken, deleteContact);

export default router;
