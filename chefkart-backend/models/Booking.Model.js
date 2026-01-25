import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required for a booking']
        },
        chef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chef',
            required: [true, 'Chef ID is required for a booking']
        },
        bookingDate: {
            type: Date,
            required: [true, 'Please provide a valid booking date']
        },
        status: {
            type: String,
            enum: {
                values: ['pending', 'confirmed', 'completed', 'cancelled'],
                message: '{VALUE} is not a valid booking status'
            },
            default: 'pending'
        },
        notes: {
            type: String,
            trim: true,
            maxlength: [500, 'Notes cannot exceed 500 characters']
        },
        totalAmount: {
            type: Number,
            default: 0
        }
    },
    {
        // Native Mongoose timestamps: Automatically manages 'createdAt' and 'updatedAt'
        timestamps: true
    }
);

// Optional: Indexing for faster lookups (Useful when a user wants to see 'their' bookings)
bookingSchema.index({ user: 1, bookingDate: -1 });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;