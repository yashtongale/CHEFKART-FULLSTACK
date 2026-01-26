import express from 'express';
import {
    createBooking,
    getBookings,
    getBookingById,
    updateBooking,
    deleteBooking
} from '../controllers/Booking.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   POST /api/v1/bookings/create
 * @desc    Create a new chef booking
 * @access  Private (Authenticated User)
 */
router.post('/create', verifyToken, createBooking);

/**
 * @route   GET /api/v1/bookings/all
 * @desc    Get all bookings (Admin View)
 * @access  Private (Admin)
 */
router.get('/all', verifyToken, getBookings);

/**
 * @route   GET /api/v1/bookings/:id
 * @desc    Get a specific booking details
 * @access  Private
 */
router.get('/:id', verifyToken, getBookingById);

/**
 * @route   PATCH /api/v1/bookings/update/:id
 * @desc    Update booking status or notes
 * @access  Private
 */
router.patch('/update/:id', verifyToken, updateBooking);

/**
 * @route   DELETE /api/v1/bookings/delete/:id
 * @desc    Cancel/Delete a booking
 * @access  Private
 */
router.delete('/delete/:id', verifyToken, deleteBooking);

export default router;
