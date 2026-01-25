import Booking from '../models/Booking.Model.js';
import createError from 'http-errors';

/**
 * @desc    Create a new booking
 * @route   POST /api/v1/booking/create
 * @access  Private (Authenticated User)
 */
export const createBooking = async (req, res, next) => {
    try {
        // 1. Auth Check (Middlewares should handle this, but extra safety is good)
        if (!req.user || !req.user.id) {
            return next(createError.Unauthorized('You must be logged in to book a chef.'));
        }

        const { chef, bookingDate, notes } = req.body;

        // 2. Simple Validation
        if (!chef || !bookingDate) {
            return next(createError.BadRequest('Chef ID and Booking Date are required.'));
        }

        // 3. Create Booking
        const newBooking = await Booking.create({
            user: req.user.id, // ID from the decoded JWT token
            chef,
            bookingDate,
            notes,
            status: 'pending' // Default status for new bookings
        });

        res.status(201).json({
            status: 'success',
            message: "Booking created successfully",
            data: newBooking
        });

    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all bookings (Admin can see all, Users see theirs)
 * @route   GET /api/v1/booking/all
 * @access  Private
 */
export const getBookings = async (req, res, next) => {
    try {
        // If user is admin, fetch all. If not, fetch only their own bookings.
        const query = req.user.role === 'admin' ? {} : { user: req.user.id };

        const bookings = await Booking.find(query)
            .populate('chef', 'name profilepic area') // Get specific chef details
            .populate('user', 'name email')           // Get specific user details
            .sort({ createdAt: -1 });

        res.status(200).json({
            status: 'success',
            results: bookings.length,
            data: bookings
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get single booking by ID
 * @route   GET /api/v1/booking/:id
 */
export const getBookingById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findById(id)
            .populate('chef', 'name profilepic phone')
            .populate('user', 'name email phone');

        if (!booking) {
            return next(createError.NotFound('Booking not found.'));
        }

        // Security: Only the owner or an admin can view this specific booking
        if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return next(createError.Forbidden('You are not authorized to view this booking.'));
        }

        res.status(200).json({
            status: 'success',
            data: booking
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update booking status or details
 * @route   PATCH /api/v1/booking/:id
 */
export const updateBooking = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status, bookingDate, notes } = req.body;

        // We use findByIdAndUpdate with runValidators to ensure enum values (like status) are correct
        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            { status, bookingDate, notes },
            { new: true, runValidators: true }
        );

        if (!updatedBooking) {
            return next(createError.NotFound('Booking not found.'));
        }

        res.status(200).json({
            status: 'success',
            message: "Booking updated successfully",
            data: updatedBooking
        });

    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete a booking
 * @route   DELETE /api/v1/booking/:id
 */
export const deleteBooking = async (req, res, next) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findById(id);

        if (!booking) {
            return next(createError.NotFound('Booking not found.'));
        }

        // Security: Users can only delete their own pending bookings
        if (booking.status !== 'pending' && req.user.role !== 'admin') {
            return next(createError.BadRequest('Confirmed bookings cannot be deleted. Please contact support.'));
        }

        await Booking.findByIdAndDelete(id);

        res.status(200).json({
            status: 'success',
            message: "Booking deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};