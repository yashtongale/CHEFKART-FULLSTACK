import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
    {
        servicename: {
            type: String,
            required: [true, 'Service name is required'],
            trim: true,
            unique: true // Prevent duplicate service names
        },
        slug: {
            type: String,
            lowercase: true,
            trim: true
        },
        description: {
            type: String,
            required: [true, 'Service description is required'],
            trim: true
        },
        image: {
            type: String,
            required: [true, 'Service image URL is required']
        },
        imagePublicId: {
            type: String,
            required: [true, 'Cloudinary Public ID is required for storage management']
        },
        isActive: {
            type: Boolean,
            default: true
        },
        priceRange: {
            type: String, // e.g., "Starting at ₹2000"
            trim: true
        }
    },
    {
        // Native Mongoose timestamps: Automatically manages 'createdAt' and 'updatedAt'
        timestamps: true
    }
);

// Middleware to automatically generate a slug from the service name before saving
serviceSchema.pre('save', function (next) {
    if (this.isModified('servicename')) {
        this.slug = this.servicename
            .toLowerCase()
            .split(' ')
            .join('-');
    }
    next();
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;