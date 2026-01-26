import mongoose from 'mongoose';

const connectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true
        },
        content: {
            type: String,
            required: [true, 'Content description is required'],
            trim: true
        },
        link: {
            type: String,
            trim: true,
            default: '#' // Useful for social media links or CTA buttons
        },
        image: {
            type: String,
            required: [true, 'An image URL is required for this section']
        },
        imagePublicId: {
            type: String,
            required: [true, 'Cloudinary Public ID is required for storage cleanup']
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        // Native Mongoose timestamps: Automatically manages 'createdAt' and 'updatedAt'
        timestamps: true
    }
);

const Connect = mongoose.model('Connect', connectSchema);

export default Connect;